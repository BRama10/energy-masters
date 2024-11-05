// app/audit/[id]/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BasicInfoForm } from '@/components/BasicInfoForm';
import { EnhancedChecklist } from '@/components/ChecklistSection';
import { SummarySection } from '@/components/SummarySection';
import { NotesSection } from '@/components/NotesSection';
import { Footer } from '@/components/layout/Footer';
import { useAuditStore } from '@/store/audit';
import { toast } from 'sonner';
import { getAuditFromStorage } from '@/lib/storage';
import { validateAuditCompletion } from '@/lib/validation';
import { downloadAuditReport } from '@/lib/export';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EditAuditPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const {
        currentAudit,
        initializeAudit,
        updateBasicInfo,
        updateChecklist,
        updateNotes,
        completeAudit
    } = useAuditStore();

    useEffect(() => {
        const audit = getAuditFromStorage(params.id);
        if (audit) {
            initializeAudit(audit);
        } else {
            router.push('/audit/drafts');
        }
    }, [params.id, initializeAudit, router]);

    const handleComplete = () => {
        if (!currentAudit) return;

        const validation = validateAuditCompletion(currentAudit);
        if (!validation.isValid) {
            toast.error(validation.message);
            return;
        }

        completeAudit();
        downloadAuditReport(currentAudit);
        toast.success('Audit completed successfully');
        router.push('/audit/drafts');
    };

    const handleSaveDraft = () => {
        if (!currentAudit) return;
        localStorage.setItem(
            'energy-masters-audits',
            JSON.stringify([currentAudit])
        );
        toast.success('Draft saved successfully');
    };

    if (!currentAudit) return null;

    return (
        <>
            <Tabs defaultValue="basic" className="space-y-6">
                <ScrollArea className="w-full">
                    <TabsList className="w-full justify-start">
                        <TabsTrigger value="basic">Basic Info</TabsTrigger>
                        <TabsTrigger value="living">Living Areas</TabsTrigger>
                        <TabsTrigger value="bathroom">Bathroom</TabsTrigger>
                        <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
                        <TabsTrigger value="safety">Safety</TabsTrigger>
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                    </TabsList>
                </ScrollArea>

                <TabsContent value="basic">
                    <BasicInfoForm
                        data={currentAudit}
                        onUpdate={updateBasicInfo}
                    />
                </TabsContent>

                <TabsContent value="living">
                    <Card>
                        <CardHeader>
                            <CardTitle>Living Areas Checklist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <EnhancedChecklist
                                items={currentAudit?.livingAreaChecklist || []}
                                onUpdate={(items) => updateChecklist('livingAreaChecklist', items)}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="bathroom">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bathroom Checklist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <EnhancedChecklist
                                items={currentAudit?.bathroomChecklist || []}
                                onUpdate={(items) => updateChecklist('bathroomChecklist', items)}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="kitchen">
                    <Card>
                        <CardHeader>
                            <CardTitle>Kitchen Checklist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <EnhancedChecklist
                                items={currentAudit?.kitchenChecklist || []}
                                onUpdate={(items) => updateChecklist('kitchenChecklist', items)}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="safety">
                    <Card>
                        <CardHeader>
                            <CardTitle>Safety Checklist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <EnhancedChecklist
                                items={currentAudit?.safetyChecklist || []}
                                onUpdate={(items) => updateChecklist('safetyChecklist', items)}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="summary">
                    <SummarySection data={currentAudit!} />
                </TabsContent>
            </Tabs>

            <Footer
                onSaveDraft={handleSaveDraft}
                onComplete={handleComplete}
            />
        </>
    );
}