// components/CollaborationIndicator.tsx
import { useState, useEffect } from 'react';
import { pusherClient } from '@/lib/pusher';
import { Users } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';

interface CollaborationIndicatorProps {
    auditId: string;
}

export const CollaborationIndicator: React.FC<CollaborationIndicatorProps> = ({ auditId }) => {
    const [activeUsers, setActiveUsers] = useState<string[]>([]);

    useEffect(() => {
        const channel = pusherClient.subscribe(`audit-${auditId}`);

        channel.bind('user-joined', (data: { user: string }) => {
            setActiveUsers(prev =>
                prev.includes(data.user) ? prev : [...prev, data.user]
            );
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [auditId]);

    if (activeUsers.length <= 1) return null;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Badge variant="secondary" className="gap-1 cursor-pointer">
                        <Users className="w-4 h-4" />
                        {activeUsers.length}
                    </Badge>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="p-2">
                        <p className="font-semibold mb-1">Active Collaborators:</p>
                        <ul className="space-y-1">
                            {activeUsers.map(user => (
                                <li key={user}>{user}</li>
                            ))}
                        </ul>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};