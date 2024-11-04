// app/audit/drafts/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from '@/components/StatusBadge';
import { getAuditsFromStorage } from '@/lib/storage';
import { AuditData } from '@/types/audit';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Edit2, FileText, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DraftsPage() {
    const router = useRouter();
    const [audits, setAudits] = useState<AuditData[]>([]);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        const loadedAudits = getAuditsFromStorage();
        setAudits(loadedAudits);
    }, []);

    const handleDelete = (id: string) => {
        const updatedAudits = audits.filter(audit => audit.id !== id);
        localStorage.setItem('energy-masters-audits', JSON.stringify(updatedAudits));
        setAudits(updatedAudits);
        setDeleteId(null);
    };

    if (audits.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Audits Found</h2>
                <p className="text-muted-foreground mb-6">
                    Start a new audit to begin tracking energy improvements
                </p>
                <Button onClick={() => router.push('/audit/new')}>
                    Start New Audit
                </Button>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Audit Drafts</h1>
                    <Button onClick={() => router.push('/audit/new')}>
                        New Audit
                    </Button>
                </div>

                <ScrollArea className="h-[calc(100vh-12rem)]">
                    <div className="space-y-4">
                        {audits.map((audit) => (
                            <Card key={audit.id} className="relative">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="flex items-center gap-2">
                                                Unit #{audit.unitNumber}
                                                <StatusBadge status={audit.status!} />
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(audit.date!).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => router.push(`/audit/${audit.id}`)}
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => setDeleteId(audit.id!)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Team</p>
                                            <p className="font-medium">{audit.teamNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Completed By</p>
                                            <p className="font-medium">{audit.completedBy}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            <ConfirmDialog
                open={!!deleteId}
                onOpenChange={() => setDeleteId(null)}
                title="Delete Audit"
                description="Are you sure you want to delete this audit? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={() => deleteId && handleDelete(deleteId)}
            />
        </>
    );
}