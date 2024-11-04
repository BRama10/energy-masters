// components/SummarySection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuditData } from '../types/audit';

interface SummarySectionProps {
    data: AuditData;
}

export const SummarySection: React.FC<SummarySectionProps> = ({ data }) => {
    const completedItems = [
        ...data.livingAreaChecklist!,
        ...data.bathroomChecklist!,
        ...data.kitchenChecklist!,
        ...data.safetyChecklist!,
    ].filter(item => item.checked).length;

    const totalItems = [
        ...data.livingAreaChecklist!,
        ...data.bathroomChecklist!,
        ...data.kitchenChecklist!,
        ...data.safetyChecklist!,
    ].length;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Audit Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Unit Number</p>
                            <p className="font-medium">{data.unitNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Team Number</p>
                            <p className="font-medium">{data.teamNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Completed By</p>
                            <p className="font-medium">{data.completedBy}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Date</p>
                            <p className="font-medium">{new Date(data.date!).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Progress</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-primary h-2.5 rounded-full"
                                style={{ width: `${(completedItems / totalItems) * 100}%` }}
                            />
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            {completedItems} of {totalItems} items completed
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};