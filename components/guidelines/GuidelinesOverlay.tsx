// components/guidelines/GuidelinesOverlay.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    BookOpen,
    X,
    ShieldAlert,
    Users,
    Wrench,
    Power,
    Droplets,
    HelpCircle,
    ClipboardList,
    School,
    AlertTriangle
} from 'lucide-react';

import {
    introContent,
    safetyContent,
    workTipsContent,
    powerStripContent,
    waterEfficiencyContent,
    qualityControlContent,
    miscContent,
    educationContent
} from './content';

interface GuidelinesOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export const GuidelinesOverlay: React.FC<GuidelinesOverlayProps> = ({
    isOpen,
    onClose
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="fixed inset-0 bg-background z-50 md:right-0 md:left-auto md:w-[600px] shadow-xl"
                >
                    {/* Header */}
                    <div className="border-b h-16 flex items-center justify-between px-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h2 className="font-semibold">Guidelines & Documentation</h2>
                                <p className="text-xs text-muted-foreground">Energy Masters Work Instructions</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Content Area */}
                    <ScrollArea className="h-[calc(100vh-4rem)]">
                        <div className="p-4">
                            <Tabs defaultValue="intro" className="w-full">
                                <TabsList className="w-full h-auto flex-wrap gap-2 p-2">
                                    <TabsTrigger value="intro" className="flex gap-2 items-center">
                                        <Users className="w-4 h-4" />
                                        Introduction
                                    </TabsTrigger>
                                    <TabsTrigger value="safety" className="flex gap-2 items-center">
                                        <ShieldAlert className="w-4 h-4" />
                                        Safety
                                    </TabsTrigger>
                                    <TabsTrigger value="work" className="flex gap-2 items-center">
                                        <Wrench className="w-4 h-4" />
                                        Work Tips
                                    </TabsTrigger>
                                    <TabsTrigger value="power" className="flex gap-2 items-center">
                                        <Power className="w-4 h-4" />
                                        Power Strips
                                    </TabsTrigger>
                                    <TabsTrigger value="water" className="flex gap-2 items-center">
                                        <Droplets className="w-4 h-4" />
                                        Water
                                    </TabsTrigger>
                                    <TabsTrigger value="qc" className="flex gap-2 items-center">
                                        <ClipboardList className="w-4 h-4" />
                                        Quality Control
                                    </TabsTrigger>
                                    <TabsTrigger value="misc" className="flex gap-2 items-center">
                                        <HelpCircle className="w-4 h-4" />
                                        Misc
                                    </TabsTrigger>
                                    <TabsTrigger value="education" className="flex gap-2 items-center">
                                        <School className="w-4 h-4" />
                                        Education
                                    </TabsTrigger>
                                </TabsList>

                                <div className="mt-4 space-y-4">
                                    {/* Introduction Tab */}
                                    <TabsContent value="intro">
                                        <Card>
                                            <CardContent className="space-y-6 pt-6">
                                                {introContent.mainPoints.map((point, index) => (
                                                    <div key={index} className="space-y-2">
                                                        <h3 className="font-semibold text-lg">{point.heading}</h3>
                                                        <p>{point.text}</p>
                                                        {point.details && (
                                                            <ul className="list-disc pl-6 space-y-2">
                                                                {point.details.map((detail, idx) => (
                                                                    <li key={idx}>{detail}</li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                        {point.activities && (
                                                            <ul className="list-disc pl-6 space-y-2">
                                                                {point.activities.map((activity, idx) => (
                                                                    <li key={idx}>{activity}</li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                        {point.impacts && (
                                                            <ul className="list-disc pl-6 space-y-2">
                                                                {point.impacts.map((impact, idx) => (
                                                                    <li key={idx}>{impact}</li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                        {point.steps && (
                                                            <ul className="list-disc pl-6 space-y-2">
                                                                {point.steps.map((step, idx) => (
                                                                    <li key={idx}>{step}</li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    {/* Safety Tab */}
                                    <TabsContent value="safety">
                                        <Card>
                                            <CardContent className="space-y-6 pt-6">
                                                {safetyContent.sections.map((section, index) => (
                                                    <div key={index} className="space-y-4">
                                                        <h3 className="font-semibold text-lg">{section.heading}</h3>
                                                        <ul className="space-y-3">
                                                            {section.points.map((point, idx) => (
                                                                <li key={idx} className="flex gap-2">
                                                                    <ShieldAlert className="w-5 h-5 text-yellow-500 shrink-0 mt-1" />
                                                                    <span>{point}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                                <Alert variant="destructive">
                                                    <AlertTriangle className="h-4 w-4" />
                                                    <AlertDescription>
                                                        {safetyContent.warning}
                                                    </AlertDescription>
                                                </Alert>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    {/* Work Tips Tab */}
                                    <TabsContent value="work">
                                        <Card>
                                            <CardContent className="space-y-6 pt-6">
                                                {workTipsContent.sections.map((section, index) => (
                                                    <div key={index} className="space-y-4">
                                                        <h3 className="font-semibold text-lg">{section.heading}</h3>
                                                        <ul className="space-y-3">
                                                            {section.points.map((point, idx) => (
                                                                <li key={idx} className="flex gap-2">
                                                                    <Wrench className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                                                                    <span>{point}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    {/* Power Strip Tab */}
                                    <TabsContent value="power">
                                        <Card>
                                            <CardContent className="space-y-6 pt-6">
                                                <div className="space-y-4">
                                                    <h3 className="font-semibold text-lg">{powerStripContent.title}</h3>
                                                    <ul className="space-y-3">
                                                        {powerStripContent.points.map((point, idx) => (
                                                            <li key={idx} className="flex gap-2">
                                                                <Power className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                                                                <span>{point}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    {/* Water Tab */}
                                    <TabsContent value="water">
                                        <Card>
                                            <CardContent className="space-y-6 pt-6">
                                                <div className="space-y-4">
                                                    <h3 className="font-semibold text-lg">{waterEfficiencyContent.title}</h3>
                                                    <ul className="space-y-3">
                                                        {waterEfficiencyContent.points.map((point, idx) => (
                                                            <li key={idx} className="flex gap-2">
                                                                <Droplets className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                                                                <span>{point}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    {/* Quality Control Tab */}
                                    <TabsContent value="qc">
                                        <Card>
                                            <CardContent className="space-y-6 pt-6">
                                                {qualityControlContent.sections.map((section, index) => (
                                                    <div key={index} className="space-y-4">
                                                        <h3 className="font-semibold text-lg">{section.heading}</h3>
                                                        <ul className="space-y-3">
                                                            {section.points.map((point, idx) => (
                                                                <li key={idx} className="flex gap-2">
                                                                    <ClipboardList className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                                                                    <span>{point}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    {/* Misc Tab */}
                                    <TabsContent value="misc">
                                        <Card>
                                            <CardContent className="space-y-6 pt-6">
                                                <div className="space-y-4">
                                                    <h3 className="font-semibold text-lg">{miscContent.title}</h3>
                                                    <ul className="space-y-3">
                                                        {miscContent.points.map((point, idx) => (
                                                            <li key={idx} className="flex gap-2">
                                                                <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                                                                <span>{point}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    {/* Education Tab */}
                                    <TabsContent value="education">
                                        <Card>
                                            <CardContent className="space-y-6 pt-6">
                                                {educationContent.sections.map((section, index) => (
                                                    <div key={index} className="space-y-4">
                                                        <h3 className="font-semibold text-lg">{section.heading}</h3>
                                                        <p>{section.text}</p>
                                                        {section.points && (
                                                            <ul className="space-y-3">
                                                                {section.points.map((point, idx) => (
                                                                    <li key={idx} className="flex gap-2">
                                                                        <School className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                                                                        <span>{point}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>
                    </ScrollArea>
                </motion.div>
            )}
        </AnimatePresence>
    );
};