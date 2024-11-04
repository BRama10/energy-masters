// components/layout/Footer.tsx
import React from 'react';
import { Button } from "@/components/ui/button";

interface FooterProps {
    onSaveDraft?: () => void;
    onComplete?: () => void;
    showActions?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
    onSaveDraft,
    onComplete,
    showActions = true
}) => {
    if (!showActions) return null;

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={onSaveDraft}>
                        Save Draft
                    </Button>
                    <Button onClick={onComplete}>
                        Complete Audit
                    </Button>
                </div>
            </div>
        </footer>
    );
};