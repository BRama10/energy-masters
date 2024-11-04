// app/audit/new/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BasicInfoForm } from '@/components/BasicInfoForm';
import { ChecklistSection } from '@/components/ChecklistSection';
import { SummarySection } from '@/components/SummarySection';
import { Footer } from '@/components/layout/Footer';
import { useAuditStore } from '@/store/audit';
import { toast } from 'sonner';

export default function NewAuditPage() {
    const router = useRouter();
    const { currentAudit, initializeAudit, updateBasicInfo, updateChecklist, completeAudit } = useAuditStore();

    useEffect(() => {
        if (!currentAudit) {
            initializeAudit({
                date: new Date().toISOString().split('T')[0],
            });
        }
    }, [currentAudit, initializeAudit]);

    const handleComplete = () => {
        if (!currentAudit?.unitNumber || !currentAudit?.teamNumber) {
            toast.error('Please fill in required basic information');
            return;
        }

        completeAudit();
        toast.success('Audit completed successfully');
        router.push('/');
    };

    const handleSaveDraft = () => {
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
                    <ChecklistSection
                        items={currentAudit.livingAreaChecklist!}
                        onUpdate={(items) => updateChecklist('livingAreaChecklist', items)}
                    />
                </TabsContent>

                <TabsContent value="bathroom">
                    <ChecklistSection
                        items={currentAudit.bathroomChecklist!}
                        onUpdate={(items) => updateChecklist('bathroomChecklist', items)}
                    />
                </TabsContent>

                <TabsContent value="kitchen">
                    <ChecklistSection
                        items={currentAudit.kitchenChecklist!}
                        onUpdate={(items) => updateChecklist('kitchenChecklist', items)}
                    />
                </TabsContent>

                <TabsContent value="safety">
                    <ChecklistSection
                        items={currentAudit.safetyChecklist!}
                        onUpdate={(items) => updateChecklist('safetyChecklist', items)}
                    />
                </TabsContent>

                <TabsContent value="summary">
                    <SummarySection data={currentAudit} />
                </TabsContent>
            </Tabs>

            <Footer
                onSaveDraft={handleSaveDraft}
                onComplete={handleComplete}
            />
        </>
    );
}