// lib/validation.ts
import { AuditData } from '../types/audit';

export const validateAuditCompletion = (audit: AuditData) => {
    const requiredFields = {
        unitNumber: 'Unit Number',
        teamNumber: 'Team Number',
        completedBy: 'Completed By',
        date: 'Date',
        timeIn: 'Time In',
        timeOut: 'Time Out',
    };

    const missingFields = Object.entries(requiredFields)
        .filter(([key]) => !audit[key as keyof AuditData])
        .map(([_, label]) => label);

    if (missingFields.length > 0) {
        return {
            isValid: false,
            message: `Please fill in the following required fields: ${missingFields.join(', ')}`,
        };
    }

    // Check if at least some items are checked in each checklist
    const checklistSections = [
        'livingAreaChecklist',
        'bathroomChecklist',
        'kitchenChecklist',
        'safetyChecklist',
    ];

    const incompleteSections = checklistSections.filter(
        //@ts-ignore
        section => !audit[section as keyof AuditData]!.some((item: any) => item.checked)
    );

    if (incompleteSections.length > 0) {
        return {
            isValid: false,
            message: 'Please complete at least one item in each section of the checklist',
        };
    }

    return {
        isValid: true,
        message: '',
    };
};
