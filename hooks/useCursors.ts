// hooks/useCursors.ts
import { useState, useEffect } from 'react';
import { pusherClient } from '@/lib/pusher';
import throttle from 'lodash/throttle';

export interface CursorPosition {
    x: number;
    y: number;
    username: string;
    color: string;
}

export const useCursors = (auditId: string, username: string) => {
    const [cursors, setCursors] = useState<{ [key: string]: CursorPosition }>({});

    useEffect(() => {
        if (!auditId || !username) return;

        const channelName = `presence-audit-${auditId}`;
        const channel = pusherClient.subscribe(channelName);

        // Throttle mouse movement updates
        const handleMouseMove = throttle((e: MouseEvent) => {
            const cursor = {
                x: e.clientX,
                y: e.clientY + window.scrollY,
                username,
                color: stringToColor(username),
            };

            // Use client events for cursor updates
            channel.trigger('client-cursor-move', cursor);
        }, 50);

        channel.bind('client-cursor-move', (cursor: CursorPosition) => {
            if (cursor.username !== username) {
                setCursors(prev => ({
                    ...prev,
                    [cursor.username]: cursor,
                }));

                // Remove cursor after inactivity
                setTimeout(() => {
                    setCursors(prev => {
                        const newCursors = { ...prev };
                        if (newCursors[cursor.username]?.x === cursor.x &&
                            newCursors[cursor.username]?.y === cursor.y) {
                            delete newCursors[cursor.username];
                        }
                        return newCursors;
                    });
                }, 10000);
            }
        });

        window.addEventListener('mousemove', handleMouseMove);

        // Handle user disconnect
        channel.bind('pusher:subscription_succeeded', () => {
            console.log('Successfully subscribed to presence channel');
        });

        channel.bind('pusher:member_removed', (member: any) => {
            setCursors(prev => {
                const newCursors = { ...prev };
                delete newCursors[member.info?.username || member.id];
                return newCursors;
            });
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [auditId, username]);

    return cursors;
};

// Helper function to generate consistent colors for users
function stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 60%)`;
}