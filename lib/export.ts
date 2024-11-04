// lib/export.ts
import { AuditData } from '../types/audit';

export const generateAuditReport = (audit: AuditData) => {
    const sections = [
        { title: 'Living Areas', items: audit.livingAreaChecklist },
        { title: 'Bathroom', items: audit.bathroomChecklist },
        { title: 'Kitchen', items: audit.kitchenChecklist },
        { title: 'Safety', items: audit.safetyChecklist },
    ];

    let report = `Energy Masters Audit Report\n`;
    report += `Unit: ${audit.unitNumber}\n`;
    report += `Date: ${new Date(audit.date!).toLocaleDateString()}\n`;
    report += `Team: ${audit.teamNumber}\n`;
    report += `Completed By: ${audit.completedBy}\n\n`;

    sections.forEach(section => {
        report += `${section.title}:\n`;
        section.items!
            .filter(item => item.checked)
            .forEach(item => {
                report += `- ${item.label}\n`;
                if (item.notes) {
                    report += `  Notes: ${item.notes}\n`;
                }
            });
        report += '\n';
    });

    if (audit.notes) {
        report += `Additional Notes:\n${audit.notes}\n`;
    }

    return report;
};

export const downloadAuditReport = (audit: AuditData) => {
    const report = generateAuditReport(audit);
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `energy-audit-${audit.unitNumber}-${audit.date}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};