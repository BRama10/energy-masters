// components/layout/Header.tsx
'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lightbulb, Bot, BookOpen } from 'lucide-react';
import { AIChatInterface } from '@/components/ai-chat/AIChatInterface';
import { GuidelinesOverlay } from '@/components/guidelines/GuidelinesOverlay';
import { useUser } from '@/hooks/useUser';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
    const { username, logout } = useUser();
    const router = useRouter();
    const pathname = usePathname();
    const [isAIChatOpen, setIsAIChatOpen] = useState(false);
    const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);

    return (
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
                    
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsAIChatOpen(true)}
                        >
                            <Bot className="h-5 w-5" />
                        </Button>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-2">
                                    {username}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setIsGuidelinesOpen(true)}>
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    Guidelines
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={logout}>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
    
            <AIChatInterface 
                isOpen={isAIChatOpen}
                onClose={() => setIsAIChatOpen(false)}
            />

            <GuidelinesOverlay
                isOpen={isGuidelinesOpen}
                onClose={() => setIsGuidelinesOpen(false)}
            />
        </header>
    );
};