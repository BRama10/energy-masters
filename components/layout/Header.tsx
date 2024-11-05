'use client'
// components/layout/Header.tsx

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lightbulb, Bot } from 'lucide-react';
import { AIChatInterface } from '@/components/ai-chat/AIChatInterface';

export const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isAIChatOpen, setIsAIChatOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-40 bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {pathname !== '/' && (
                                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            )}
                            <div className="flex items-center gap-2">
                                <Lightbulb className="h-6 w-6 text-primary" />
                                <h1 className="text-xl font-bold">Energy Masters</h1>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsAIChatOpen(true)}
                            className="relative"
                        >
                            <Bot className="h-5 w-5" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full" />
                        </Button>
                    </div>
                </div>
            </header>

            <AIChatInterface
                isOpen={isAIChatOpen}
                onClose={() => setIsAIChatOpen(false)}
            />
        </>
    );
};