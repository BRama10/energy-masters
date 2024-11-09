import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuditData, AuditStatus } from '@/types/audit';
import {
    ClipboardList,
    Battery,
    Droplet,
    Lightbulb,
    Power,
    AlertCircle,
    Home,
    Waves,
    Zap
} from 'lucide-react';

interface AuditDashboardProps {
    audits: AuditData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const AuditDashboard: React.FC<AuditDashboardProps> = ({ audits }) => {
    const stats = useMemo(() => {
        const total = audits.length;
        if (total === 0) return {
            total: 0,
            energyDataCandidates: 0,
            residentProfileCandidates: 0,
            avgInstallations: {
                sealedAreas: { lightSwitches: 0, outlets: 0, vents: 0, windows: 0, baseboards: 0 },
                faucetAerators: { bath: 0, kitchen: 0 },
                showerHead: 0,
                toiletTummy: 0,
                standardPowerStrip: 0,
                smartPowerStrip: 0
            },
            statusCount: {}
        };

        const energyDataCandidates = audits.filter(a => a.isEnergyDataCandidate).length;
        const residentProfileCandidates = audits.filter(a => a.isResidentProfileCandidate).length;

        const avgInstallations = {
            sealedAreas: {
                lightSwitches: 0,
                outlets: 0,
                vents: 0,
                windows: 0,
                baseboards: 0
            },
            faucetAerators: {
                bath: 0,
                kitchen: 0
            },
            showerHead: 0,
            toiletTummy: 0,
            standardPowerStrip: 0,
            smartPowerStrip: 0
        };

        audits.forEach(audit => {
            if (audit.sealedAreas) {
                Object.keys(audit.sealedAreas).forEach(key => {
                    //@ts-ignore
                    avgInstallations.sealedAreas[key] += audit.sealedAreas[key] || 0;
                });
            }
            if (audit.faucetAerators) {
                avgInstallations.faucetAerators.bath += audit.faucetAerators.bath || 0;
                avgInstallations.faucetAerators.kitchen += audit.faucetAerators.kitchen || 0;
            }
            avgInstallations.showerHead += audit.showerHead || 0;
            avgInstallations.toiletTummy += audit.toiletTummy || 0;
            avgInstallations.standardPowerStrip += audit.standardPowerStrip || 0;
            avgInstallations.smartPowerStrip += audit.smartPowerStrip || 0;
        });

        // Convert sums to averages
        // Object.keys(avgInstallations.sealedAreas).forEach(key => {
        //     //@ts-ignore
        //     avgInstallations.sealedAreas[key] = +(avgInstallations.sealedAreas[key] / total).toFixed(1);
        // });
        // avgInstallations.faucetAerators.bath = +(avgInstallations.faucetAerators.bath / total).toFixed(1);
        // avgInstallations.faucetAerators.kitchen = +(avgInstallations.faucetAerators.kitchen / total).toFixed(1);
        // avgInstallations.showerHead = +(avgInstallations.showerHead / total).toFixed(1);
        // avgInstallations.toiletTummy = +(avgInstallations.toiletTummy / total).toFixed(1);
        // avgInstallations.standardPowerStrip = +(avgInstallations.standardPowerStrip / total).toFixed(1);
        // avgInstallations.smartPowerStrip = +(avgInstallations.smartPowerStrip / total).toFixed(1);

        const statusCount = audits.reduce((acc, audit) => {
            const status = audit.status || 'draft';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {} as Record<AuditStatus, number>);

        return {
            total,
            energyDataCandidates,
            residentProfileCandidates,
            avgInstallations,
            statusCount
        };
    }, [audits]);

    const formatValue = (value: number) => {
        return isNaN(value) ? '0' : value.toFixed(1);
    };

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold">Audit Results Dashboard</h1>

            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Audits</CardTitle>
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Energy Data Candidates</CardTitle>
                        <Battery className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.energyDataCandidates}</div>
                        <Progress
                            value={(stats.energyDataCandidates / stats.total) * 100}
                            className="mt-2"
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Profile Candidates</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.residentProfileCandidates}</div>
                        <Progress
                            value={(stats.residentProfileCandidates / stats.total) * 100}
                            className="mt-2"
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Installation Metrics */}
            <Tabs defaultValue="sealed" className="space-y-4">
                <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full gap-4 h-auto p-1">
                    <TabsTrigger value="sealed" className="flex items-center gap-2 data-[state=active]:text-primary">
                        <Home className="h-4 w-4" />
                        <span className="hidden sm:inline">Sealed Areas</span>
                    </TabsTrigger>
                    <TabsTrigger value="water" className="flex items-center gap-2 data-[state=active]:text-primary">
                        <Waves className="h-4 w-4" />
                        <span className="hidden sm:inline">Water Fixtures</span>
                    </TabsTrigger>
                    <TabsTrigger value="power" className="flex items-center gap-2 data-[state=active]:text-primary">
                        <Zap className="h-4 w-4" />
                        <span className="hidden sm:inline">Power Management</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="sealed">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Home className="h-5 w-5" />
                                Sealed Areas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.entries(stats.avgInstallations.sealedAreas).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        <span className="text-xl font-bold">{formatValue(value)}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="water">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Waves className="h-5 w-5" />
                                Water Fixtures
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <span>Bath Aerators</span>
                                        <span className="text-xl font-bold">
                                            {formatValue(stats.avgInstallations.faucetAerators.bath)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <span>Kitchen Aerators</span>
                                        <span className="text-xl font-bold">
                                            {formatValue(stats.avgInstallations.faucetAerators.kitchen)}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <span>Shower Heads</span>
                                        <span className="text-xl font-bold">
                                            {formatValue(stats.avgInstallations.showerHead)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <span>Toilet Tummies</span>
                                        <span className="text-xl font-bold">
                                            {formatValue(stats.avgInstallations.toiletTummy)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="power">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5" />
                                Power Strip Installations
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Power className="h-5 w-5 text-muted-foreground" />
                                        <span>Standard Power Strips</span>
                                    </div>
                                    <span className="text-2xl font-bold">
                                        {formatValue(stats.avgInstallations.standardPowerStrip)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Lightbulb className="h-5 w-5 text-muted-foreground" />
                                        <span>Smart Power Strips</span>
                                    </div>
                                    <span className="text-2xl font-bold">
                                        {formatValue(stats.avgInstallations.smartPowerStrip)}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};