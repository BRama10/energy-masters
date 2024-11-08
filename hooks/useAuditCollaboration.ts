// hooks/useAuditCollaboration.ts
import { useEffect } from 'react';
import { pusherClient } from '@/lib/pusher';
import { useUser } from '@/hooks/useUser';
import { useAuditStore } from '@/store/audit';
import { toast } from 'sonner';

export const useAuditCollaboration = (auditId: string) => {
    const { username } = useUser();
    const { currentAudit, updateBasicInfo, updateChecklist } = useAuditStore();

    useEffect(() => {
        if (!auditId || !username) return;

        const channel = pusherClient.subscribe(`audit-${auditId}`);

        // Listen for changes from other users
        channel.bind('audit-updated', (data: {
            change: any;
            type: 'basicInfo' | 'checklist';
            user: string;
            section?: string;
        }) => {
            if (data.user !== username) {
                if (data.type === 'basicInfo') {
                    updateBasicInfo(data.change);
                    toast.info(`${data.user} updated basic information`);
                } else if (data.type === 'checklist') {
                    updateChecklist(data.section! as ("livingAreaChecklist" | "bathroomChecklist" | "kitchenChecklist" | "safetyChecklist"), data.change);
                    toast.info(`${data.user} updated ${data.section} checklist`);
                }
            }
        });

        // Listen for new collaborators
        channel.bind('user-joined', (data: { user: string }) => {
            if (data.user !== username) {
                toast.info(`${data.user} joined the audit`);
            }
        });

        // Announce this user's presence
        fetch('/api/audit/join', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ auditId, username }),
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [auditId, username]);

    // Function to broadcast changes
    const broadcastChange = async (change: any, type: 'basicInfo' | 'checklist', section?: string) => {
        await fetch('/api/audit/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                auditId,
                change,
                type,
                section,
                username,
            }),
        });
    };

    return { broadcastChange };
};