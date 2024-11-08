// app/audit/[id]/page.tsx
'use client';

import { toast } from 'sonner';
import { useRouter, useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BasicInfoForm } from '@/components/BasicInfoForm';
import { EnhancedChecklist } from '@/components/ChecklistSection';
import { SummarySection } from '@/components/SummarySection';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CollaborationIndicator } from '@/components/CollaborationIndicator';
import { AuditData, ChecklistItem } from '@/types/audit';
import { useSharedAudit } from '@/hooks/useSharedAudit';
import { CollaborativeCursors } from '@/components/CollaborativeCursors';
import { useUser } from '@/hooks/useUser';


export default function EditAuditPage() {

    const id = useParams().id;
    const router = useRouter();
    const { audit, isLoading, updateAudit } = useSharedAudit(id as string);

    const { username } = useUser();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    console.log(audit)

    // if (!audit) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen">
    //             <div className="text-center">
    //                 <h2 className="text-xl font-semibold mb-2">Audit Not Found</h2>
    //                 <button
    //                     onClick={() => router.push('/audit/drafts')}
    //                     className="text-blue-500 hover:underline"
    //                 >
    //                     Return to Drafts
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // }

    const handleBasicInfoUpdate = async (info: Partial<AuditData>) => {
        try {
            await updateAudit(info, 'basicInfo');
        } catch (error) {
            toast.error('Failed to update basic information');
        }
    };

    const handleChecklistUpdate = async (
        section: string,
        items: ChecklistItem[]
    ) => {
        try {
            await updateAudit({
                [section]: items
            }, 'checklist');
        } catch (error) {
            toast.error('Failed to update checklist');
        }
    };

    return (
        <div className="relative min-h-screen pb-16">
            {/* Cursor tracking */}
            <CollaborativeCursors auditId={id as string} username={username!} />

            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 p-4 border-b">
                <h1 className="text-2xl font-bold">Audit Details</h1>
                <CollaborationIndicator auditId={id as string} />
            </div>

            <div className="px-4">
                <Tabs defaultValue="basic" className="space-y-6">
                    <ScrollArea className="w-full border-b">
                        <TabsList className="w-full justify-start">
                            <TabsTrigger value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger value="living">Living Areas</TabsTrigger>
                            <TabsTrigger value="bathroom">Bathroom</TabsTrigger>
                            <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
                            <TabsTrigger value="safety">Safety</TabsTrigger>
                            <TabsTrigger value="summary">Summary</TabsTrigger>
                        </TabsList>
                    </ScrollArea>

                    <div className="space-y-8">
                        <TabsContent value="basic">
                            <BasicInfoForm
                                data={audit}
                                onUpdate={handleBasicInfoUpdate}
                            />
                        </TabsContent>

                        {/* <TabsContent value="living">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Living Areas Checklist</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <EnhancedChecklist
                                        items={audit.livingAreaChecklist || []}
                                        onUpdate={(items) => handleChecklistUpdate('livingAreaChecklist', items)}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent> */}
                        <TabsContent value="basic">
                            <BasicInfoForm
                                data={audit!}
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
                                        items={audit?.livingAreaChecklist || []}
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
                                        items={audit?.bathroomChecklist || []}
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
                                        items={audit?.kitchenChecklist || []}
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
                                        items={audit?.safetyChecklist || []}
                                        onUpdate={(items) => handleChecklistUpdate('safetyChecklist', items)}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="summary">
                            <SummarySection data={audit!} />
                        </TabsContent>

                        {/* Other tab contents remain the same */}
                    </div>
                </Tabs>
            </div>

            <Footer
                onSaveDraft={() => toast.success('Draft saved')}
                onComplete={() => {
                    toast.success('Audit completed');
                    router.push('/audit/drafts');
                }}
            // className="fixed bottom-0 left-0 right-0 bg-white border-t"
            />
        </div>
    );
}