// components/layout/Header.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lightbulb } from 'lucide-react';

export const Header = () => {
    const router = useRouter();

    return (
        <header className="sticky top-0 z-50 bg-white border-b">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {router.pathname !== '/' && (
                            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        )}
                        <div className="flex items-center gap-2">
                            <Lightbulb className="h-6 w-6 text-primary" />
                            <h1 className="text-xl font-bold">Energy Masters</h1>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};