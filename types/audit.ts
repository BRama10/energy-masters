// types/audit.ts
export type AuditStatus = 'draft' | 'completed' | 'review';

export interface AuditBasicInfo {
    unitNumber?: string;
    teamNumber?: string;
    completedBy?: string;
    timeIn?: string;
    timeOut?: string;
    date?: string;
    isEnergyDataCandidate?: boolean;
    isResidentProfileCandidate?: boolean;
}

export interface ChecklistItem {
    id: string;
    label: string;
    checked: boolean;
    notes?: string;
    category?: string;
}

export interface SealedArea {
    outlets: boolean;
    vents: boolean;
    windows: boolean;
    baseboards: boolean;
}

export interface FaucetAerators {
    bath: boolean;
    kitchen: boolean;
}

export interface AuditData extends AuditBasicInfo {
    id?: string;
    status?: AuditStatus;
    sealedAreas?: SealedArea;
    faucetAerators?: FaucetAerators;
    showerHead?: boolean;
    toiletTummy?: boolean;
    standardPowerStrip?: boolean;
    smartPowerStrip?: boolean;
    livingAreaChecklist?: ChecklistItem[];
    bathroomChecklist?: ChecklistItem[];
    kitchenChecklist?: ChecklistItem[];
    safetyChecklist?: ChecklistItem[];
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
}