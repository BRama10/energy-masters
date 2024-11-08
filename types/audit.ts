// types/audit.ts

export type AuditStatus = 'draft' | 'completed' | 'review';

export interface ChecklistItem {
  id: string;
  label: string;
  category?: string;
  checked?: boolean;
  notes?: string;
  tasks?: string[];
  subchecks?: string[];
  warning?: boolean;
  severity?: 'low' | 'medium' | 'high';
  repairOptions?: string[];
  repairNote?: string;
  requiresNote?: boolean;
}

export interface AuditBasicInfo {
  id?: string;
  unitNumber: string;
  teamNumber: string;
  completedBy: string;
  date: string;
  timeIn: string;
  timeOut: string;
  isEnergyDataCandidate: boolean;
  isResidentProfileCandidate: boolean;
  status?: AuditStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuditSummary {
  totalItems: number;
  completedItems: number;
  energyIssues: string[];
  recommendedActions: string[];
}

export interface AuditData extends AuditBasicInfo {
  // All checklist sections
  introductionChecklist: ChecklistItem[];
  safetyChecklist: ChecklistItem[];
  livingAreaChecklist: ChecklistItem[];
  bathroomChecklist: ChecklistItem[];
  kitchenChecklist: ChecklistItem[];
  
  // Optional fields
  summary?: AuditSummary;
  generalNotes?: string;
  sealedAreas?: {
    lightSwitches: number;
    outlets: number;
    vents: number;
    windows: number;
    baseboards: number;
  };
  faucetAerators?: {
    bath: number;
    kitchen: number;
  };
  showerHead?: number;
  toiletTummy?: number;
  standardPowerStrip?: number;
  smartPowerStrip?: number;
}