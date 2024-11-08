// components/CollaborativeCursors.tsx
import React from 'react';
import { Cursor } from './Cursor';
import { useCursors } from '@/hooks/useCursors';

interface CollaborativeCursorsProps {
    auditId: string;
    username: string;
}

export const CollaborativeCursors: React.FC<CollaborativeCursorsProps> = ({
    auditId,
    username,
}) => {
    const cursors = useCursors(auditId, username);

    return (
        <>
            {Object.values(cursors).map((cursor) => (
                <Cursor key={cursor.username} position={cursor} />
            ))}
        </>
    );
};