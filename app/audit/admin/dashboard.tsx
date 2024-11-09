'use client'

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AuditData, AuditStatus } from '@/types/audit';
import {
    ClipboardList,
    Clock,
    Battery,
    Droplet,
    Lightbulb,
    Power,
    AlertCircle,
    CheckCircle2,
    Clock3
} from 'lucide-react';

interface AuditDashboardProps {
    audits: AuditData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const STATUS_COLORS = {
    draft: '#FFBB28',
    completed: '#00C49F',
    review: '#0088FE'
};

export const AuditDashboard: React.FC<AuditDashboardProps> = ({ audits }) => {
    const stats = useMemo(() => {
        const total = audits.length;
        const energyDataCandidates = audits.filter(a => a.isEnergyDataCandidate).length;
        const residentProfileCandidates = audits.filter(a => a.isResidentProfileCandidate).length;

        // Calculate average installations
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
                    avgInstallations.sealedAreas[key] += audit.sealedAreas[key];
                });
            }
            if (audit.faucetAerators) {
                avgInstallations.faucetAerators.bath += audit.faucetAerators.bath;
                avgInstallations.faucetAerators.kitchen += audit.faucetAerators.kitchen;
            }
            avgInstallations.showerHead += audit.showerHead || 0;
            avgInstallations.toiletTummy += audit.toiletTummy || 0;
            avgInstallations.standardPowerStrip += audit.standardPowerStrip || 0;
            avgInstallations.smartPowerStrip += audit.smartPowerStrip || 0;
        });

        // Convert sums to averages
        Object.keys(avgInstallations.sealedAreas).forEach(key => {
            //@ts-ignore
            avgInstallations.sealedAreas[key] = +(avgInstallations.sealedAreas[key] / total).toFixed(1);
        });
        avgInstallations.faucetAerators.bath = +(avgInstallations.faucetAerators.bath / total).toFixed(1);
        avgInstallations.faucetAerators.kitchen = +(avgInstallations.faucetAerators.kitchen / total).toFixed(1);
        avgInstallations.showerHead = +(avgInstallations.showerHead / total).toFixed(1);
        avgInstallations.toiletTummy = +(avgInstallations.toiletTummy / total).toFixed(1);
        avgInstallations.standardPowerStrip = +(avgInstallations.standardPowerStrip / total).toFixed(1);
        avgInstallations.smartPowerStrip = +(avgInstallations.smartPowerStrip / total).toFixed(1);

        // Status distribution
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

    const statusChartData = Object.entries(stats.statusCount).map(([status, count]) => ({
        name: status.charAt(0).toUpperCase() + status.slice(1),
        value: count
    }));

    const installationsBarData = [
        { name: 'Light Switches', value: stats.avgInstallations.sealedAreas.lightSwitches },
        { name: 'Outlets', value: stats.avgInstallations.sealedAreas.outlets },
        { name: 'Vents', value: stats.avgInstallations.sealedAreas.vents },
        { name: 'Windows', value: stats.avgInstallations.sealedAreas.windows },
        { name: 'Baseboards', value: stats.avgInstallations.sealedAreas.baseboards },
    ];

    const waterInstallationsData = [
        { name: 'Bath Aerators', value: stats.avgInstallations.faucetAerators.bath },
        { name: 'Kitchen Aerators', value: stats.avgInstallations.faucetAerators.kitchen },
        { name: 'Shower Heads', value: stats.avgInstallations.showerHead },
        { name: 'Toilet Tummies', value: stats.avgInstallations.toiletTummy },
    ];

    return (
        <div className="container mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold mb-6">Audit Results Dashboard</h1>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            {/* Status Distribution */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Audit Status Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={statusChartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label
                            >
                                {statusChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Installation Metrics */}
            <Tabs defaultValue="sealed" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="sealed">Sealed Areas</TabsTrigger>
                    <TabsTrigger value="water">Water Fixtures</TabsTrigger>
                    <TabsTrigger value="power">Power Management</TabsTrigger>
                </TabsList>

                <TabsContent value="sealed">
                    <Card>
                        <CardHeader>
                            <CardTitle>Average Sealed Areas per Audit</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={installationsBarData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="water">
                    <Card>
                        <CardHeader>
                            <CardTitle>Water Conservation Installations</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={waterInstallationsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#00C49F" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="power">
                    <Card>
                        <CardHeader>
                            <CardTitle>Power Strip Installations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center justify-between p-4 border rounded">
                                    <div className="flex items-center gap-2">
                                        <Power className="h-5 w-5 text-muted-foreground" />
                                        <span>Standard Power Strips</span>
                                    </div>
                                    <span className="text-2xl font-bold">
                                        {stats.avgInstallations.standardPowerStrip}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 border rounded">
                                    <div className="flex items-center gap-2">
                                        <Lightbulb className="h-5 w-5 text-muted-foreground" />
                                        <span>Smart Power Strips</span>
                                    </div>
                                    <span className="text-2xl font-bold">
                                        {stats.avgInstallations.smartPowerStrip}
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