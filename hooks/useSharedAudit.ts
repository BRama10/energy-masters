// hooks/useSharedAudit.ts
import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { pusherClient } from '@/lib/pusher';
import debounce from 'lodash/debounce';
import { toast } from 'sonner';

export const useSharedAudit = (auditId: string) => {
  const [audit, setAudit] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { username } = useUser();

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const response = await fetch(`/api/audit/${auditId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch audit');
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setAudit(data);
      } catch (error) {
        console.error('Error fetching audit:', error);
        toast.error('Failed to fetch audit');
      } finally {
        setIsLoading(false);
      }
    };

    if (auditId) {
      fetchAudit();
    }
  }, [auditId]);

  useEffect(() => {
    if (!auditId || !username) return;

    const channel = pusherClient.subscribe(`audit-${auditId}`);

    channel.bind('audit-updated', (data: {
      changes: any;
      type: string;
      user: string;
      timestamp: number;
    }) => {
      if (data.user !== username) {
        setAudit((prev: any) => {
          if (!prev?.lastUpdate || data.timestamp > prev.lastUpdate) {
            return {
              ...prev,
              ...data.changes,
              lastUpdate: data.timestamp,
            };
          }
          return prev;
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [auditId, username]);

  const debouncedUpdate = debounce(async (changes: any, type: string) => {
    if (!changes || typeof changes !== 'object') {
      console.error('Invalid changes object:', changes);
      return;
    }

    try {
      const timestamp = Date.now();
      const response = await fetch(`/api/audit/${auditId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          changes,
          username,
          type,
          timestamp,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update audit');
      }

      const updatedAudit = await response.json();
      if (updatedAudit.error) {
        throw new Error(updatedAudit.error);
      }

      setAudit(updatedAudit);
    } catch (error) {
      console.error('Error updating audit:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update audit');
      // Revert optimistic update
      setAudit((prev: any) => prev);
    }
  }, 500);

  const updateAudit = (changes: any, type: string) => {
    // Validate changes
    if (!changes || typeof changes !== 'object') {
      console.error('Invalid changes object:', changes);
      return;
    }

    // Optimistically update local state
    setAudit((prev: any) => ({
      ...prev,
      ...changes,
      lastUpdate: Date.now(),
    }));

    // Send update to server
    debouncedUpdate(changes, type);
  };

  return {
    audit,
    isLoading,
    updateAudit,
  };
};