// app/audit/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
import { useAuditCollaboration } from '@/hooks/useAuditCollaboration';
import { CollaborationIndicator } from '@/components/CollaborationIndicator';
import { AuditData, ChecklistItem } from '@/types/audit';


export default function EditAuditPage() {
    const id = useParams().id;
    const router = useRouter();
    const {
        currentAudit,
        initializeAudit,
        updateBasicInfo,
        updateChecklist,
        updateNotes,
        completeAudit
    } = useAuditStore();

    const { broadcastChange } = useAuditCollaboration(id! as string);

    // Handle updates with broadcasting
    const handleBasicInfoUpdate = async (info: Partial<AuditData>) => {
        updateBasicInfo(info);
        await broadcastChange(info, 'basicInfo');
    };

    useEffect(() => {
        const audit = getAuditFromStorage(id! as string);

        if (audit) {
            initializeAudit(audit);
        } else {
            router.push('/audit/drafts');
        }

    }, [])

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

    const handleChecklistUpdate = async (
        section: 'livingAreaChecklist' | 'bathroomChecklist' | 'kitchenChecklist' | 'safetyChecklist',
        items: ChecklistItem[]
    ) => {
        updateChecklist(section, items);
        await broadcastChange(items, 'checklist', section);
    };

    if (!currentAudit) return null;

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Audit Details</h1>
                <CollaborationIndicator auditId={id! as string} />
            </div>
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
                        onUpdate={handleBasicInfoUpdate}
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
                                onUpdate={(items) => handleChecklistUpdate('livingAreaChecklist', items)}
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
                                onUpdate={(items) => handleChecklistUpdate('bathroomChecklist', items)}
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
                                onUpdate={(items) => handleChecklistUpdate('kitchenChecklist', items)}
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
                                onUpdate={(items) => handleChecklistUpdate('safetyChecklist', items)}
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