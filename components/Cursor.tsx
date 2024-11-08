// components/Cursor.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface CursorProps {
    position: {
        x: number;
        y: number;
        username: string;
        color: string;
    };
}

export const Cursor: React.FC<CursorProps> = ({ position }) => {
    return (
        <motion.div
            className="pointer-events-none fixed top-0 left-0 z-50"
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", damping: 25, stiffness: 100 }}
        >
            <div className="relative">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill={position.color}
                    style={{ transform: 'rotate(-45deg)' }}
                >
                    <path d="M0 0 L20 0 L10 10 Z" />
                </svg>
                <div
                    className="absolute left-4 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
                    style={{ backgroundColor: position.color }}
                >
                    {position.username}
                </div>
            </div>
        </motion.div>
    );
};