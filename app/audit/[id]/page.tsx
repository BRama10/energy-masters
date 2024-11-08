'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInfoForm } from '@/components/BasicInfoForm';
import { EnhancedChecklist } from '@/components/ChecklistSection';
import { SummarySection } from '@/components/SummarySection';
import { Footer } from '@/components/layout/Footer';
import { useAuditStore } from '@/store/audit';
import { toast } from 'sonner';
import { validateAuditCompletion } from '@/lib/validation';
import { downloadAuditReport } from '@/lib/export';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAuditFromStorage } from '@/lib/storage';
import { CHECKLIST_ITEMS } from '@/constants/checklist-items';
import { AuditStatsSection } from '@/components/AuditStatsSection';
import { getAudit, updateAudit } from '@/lib/actions/audit';
import { useUser } from '@/hooks/useUser';

export default function EditAuditPage() {
    const { username } = useUser();
    const id = useParams().id;
    const router = useRouter();
    const {
        currentAudit,
        initializeAudit,
        updateBasicInfo,
        updateChecklist,
        completeAudit
    } = useAuditStore();

    useEffect(() => {
        const _ = async () => {
            const result = await getAudit(username!, id as string);
            if (result.success) {
                initializeAudit(result.data!);
            } else {
                toast.error(result.error);
                router.push('/audit/drafts');
            }

        }

        _();

    }, []);

    const handleComplete = async () => {
        if (!currentAudit) return;

        const validation = validateAuditCompletion(currentAudit);
        if (!validation.isValid) {
            toast.error(validation.message);
            return;
        }

        const result = await updateAudit(username!, currentAudit.id!, {
            ...currentAudit,
            status: 'completed'
        });

        if (result.success) {
            completeAudit();
            downloadAuditReport(currentAudit);
            toast.success('Audit completed successfully');
            router.push('/audit/drafts');
        } else {
            toast.error(result.error);
        }
    };

    const handleSaveDraft = async () => {
        if (!currentAudit) return;

        const result = await updateAudit(username!, currentAudit.id!, {
            ...currentAudit,
            status: 'draft'
        });

        if (result.success) {
            toast.success('Draft saved successfully');
        } else {
            toast.error(result.error);
        }
    };


    if (!currentAudit) return null;

    return (
        <>
            <Tabs defaultValue="basic" className="space-y-6">
                <div className="w-full">
                    <TabsList className="w-full h-auto flex-wrap gap-2 p-2">
                        <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 w-full">
                            {/* First Row - Primary Tabs */}
                            <div className="col-span-2 flex gap-2 w-full sm:w-auto">
                                <TabsTrigger
                                    value="basic"
                                    className="flex-1 sm:flex-initial"
                                >
                                    Basic Info
                                </TabsTrigger>
                                <TabsTrigger
                                    value="stats"
                                    className="flex-1 sm:flex-initial"
                                >
                                    Stats
                                </TabsTrigger>
                            </div>

                            {/* Second Row - Area Tabs */}
                            <div className="col-span-2 flex flex-wrap gap-2 w-full">
                                <TabsTrigger
                                    value="intro"
                                    className="flex-1 sm:flex-initial"
                                >
                                    Introduction
                                </TabsTrigger>
                                <TabsTrigger
                                    value="safety"
                                    className="flex-1 sm:flex-initial"
                                >
                                    Safety Checks
                                </TabsTrigger>
                                <TabsTrigger
                                    value="living"
                                    className="flex-1 sm:flex-initial"
                                >
                                    Living Areas
                                </TabsTrigger>
                                <TabsTrigger
                                    value="bathroom"
                                    className="flex-1 sm:flex-initial"
                                >
                                    Bathroom
                                </TabsTrigger>
                                <TabsTrigger
                                    value="kitchen"
                                    className="flex-1 sm:flex-initial"
                                >
                                    Kitchen
                                </TabsTrigger>
                            </div>
                        </div>
                    </TabsList>
                </div>

                <TabsContent value="basic">
                    <BasicInfoForm
                        data={currentAudit}
                        onUpdate={updateBasicInfo}
                    />
                </TabsContent>

                <TabsContent value="stats">
                    <AuditStatsSection
                        data={currentAudit}
                        onUpdate={updateBasicInfo}
                    />
                </TabsContent>

                <TabsContent value="intro">
                    <Card>
                        <CardHeader>
                            <CardTitle>Introduction Checklist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <EnhancedChecklist
                                items={currentAudit?.introductionChecklist || CHECKLIST_ITEMS.introduction}
                                onUpdate={(items) => updateChecklist('introduction', items)}
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
                                items={currentAudit?.safetyChecklist || CHECKLIST_ITEMS.safety}
                                onUpdate={(items) => updateChecklist('safety', items)}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="living">
                    <Card>
                        <CardHeader>
                            <CardTitle>Living Areas Checklist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <EnhancedChecklist
                                items={currentAudit?.livingAreaChecklist || CHECKLIST_ITEMS.livingArea}
                                onUpdate={(items) => updateChecklist('livingArea', items)}
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
                                items={currentAudit?.bathroomChecklist || CHECKLIST_ITEMS.bathroom}
                                onUpdate={(items) => updateChecklist('bathroom', items)}
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
                                items={currentAudit?.kitchenChecklist || CHECKLIST_ITEMS.kitchen}
                                onUpdate={(items) => updateChecklist('kitchen', items)}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Footer
                onSaveDraft={handleSaveDraft}
                onComplete={handleComplete}
            />
        </>
    );
}