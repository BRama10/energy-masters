// components/AuditStatsSection.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuditData } from '@/types/audit';
import { cn } from '@/lib/utils';

interface AuditStatsSectionProps {
    data: AuditData;
    onUpdate?: (updates: Partial<AuditData>) => void;
}

export const AuditStatsSection: React.FC<AuditStatsSectionProps> = ({ data, onUpdate }) => {
    const statsCategories = [
        {
            title: 'Sealed/Caulked',
            items: [
                { key: 'lightSwitches', label: 'Light Switches', value: data.sealedAreas?.lightSwitches || 0 },
                { key: 'outlets', label: 'Outlets', value: data.sealedAreas?.outlets || 0 },
                { key: 'vents', label: 'Vents', value: data.sealedAreas?.vents || 0 },
                { key: 'windows', label: 'Windows', value: data.sealedAreas?.windows || 0 },
                { key: 'baseboards', label: 'Baseboards', value: data.sealedAreas?.baseboards || 0 },
            ]
        },
        {
            title: 'Faucet Aerators',
            items: [
                { key: 'bath', label: 'Bath', value: data.faucetAerators?.bath || 0 },
                { key: 'kitchen', label: 'Kitchen', value: data.faucetAerators?.kitchen || 0 },
            ]
        },
        {
            title: 'Other Items',
            items: [
                { key: 'showerHead', label: 'Shower Head', value: data.showerHead || 0 },
                { key: 'toiletTummy', label: 'Toilet Tummy', value: data.toiletTummy || 0 },
                { key: 'standardPowerStrip', label: 'Standard Power Strip', value: data.standardPowerStrip || 0 },
                { key: 'smartPowerStrip', label: 'Smart Power Strip', value: data.smartPowerStrip || 0 },
            ]
        }
    ];

    const handleIncrement = (category: string, key: string) => {
        if (!onUpdate) return;

        const updates: any = { ...data };
        if (category === 'Sealed/Caulked') {
            updates.sealedAreas = { ...updates.sealedAreas, [key]: (updates.sealedAreas?.[key] || 0) + 1 };
        } else if (category === 'Faucet Aerators') {
            updates.faucetAerators = { ...updates.faucetAerators, [key]: (updates.faucetAerators?.[key] || 0) + 1 };
        } else {
            updates[key] = (updates[key] || 0) + 1;
        }
        onUpdate(updates);
    };

    const handleDecrement = (category: string, key: string) => {
        if (!onUpdate) return;

        const updates: any = { ...data };
        if (category === 'Sealed/Caulked') {
            const currentValue = updates.sealedAreas?.[key] || 0;
            if (currentValue > 0) {
                updates.sealedAreas = { ...updates.sealedAreas, [key]: currentValue - 1 };
            }
        } else if (category === 'Faucet Aerators') {
            const currentValue = updates.faucetAerators?.[key] || 0;
            if (currentValue > 0) {
                updates.faucetAerators = { ...updates.faucetAerators, [key]: currentValue - 1 };
            }
        } else {
            if (updates[key] > 0) {
                updates[key] = (updates[key] || 0) - 1;
            }
        }
        onUpdate(updates);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Installation Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {statsCategories.map((category) => (
                        <div key={category.title} className="space-y-3">
                            <h3 className="font-medium text-sm text-muted-foreground">
                                {category.title}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {category.items.map((item) => (
                                    <div
                                        key={item.key}
                                        className="bg-muted/50 rounded-lg p-3 space-y-2"
                                    >
                                        <div className="text-sm font-medium">{item.label}</div>
                                        <div className="flex items-center gap-2">
                                            {onUpdate ? (
                                                <>
                                                    <button
                                                        onClick={() => handleDecrement(category.title, item.key)}
                                                        className={cn(
                                                            "w-8 h-8 flex items-center justify-center rounded-md",
                                                            "bg-background hover:bg-muted transition-colors",
                                                            "text-muted-foreground hover:text-foreground"
                                                        )}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-8 text-center font-medium">
                                                        {item.value}
                                                    </span>
                                                    <button
                                                        onClick={() => handleIncrement(category.title, item.key)}
                                                        className={cn(
                                                            "w-8 h-8 flex items-center justify-center rounded-md",
                                                            "bg-background hover:bg-muted transition-colors",
                                                            "text-muted-foreground hover:text-foreground"
                                                        )}
                                                    >
                                                        +
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="font-medium">{item.value}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};