// store/audit.ts
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { AuditData, ChecklistItem } from '@/types/audit';
import { CHECKLIST_ITEMS } from '@/constants/checklist-items';

interface AuditStore {
  currentAudit: AuditData | null;
  initializeAudit: (data?: Partial<AuditData>) => void;
  updateBasicInfo: (data: Partial<AuditData>) => void;
  updateChecklist: (section: keyof typeof CHECKLIST_ITEMS, items: ChecklistItem[]) => void;
  updateNotes: (notes: string) => void;
  completeAudit: () => void;
  resetAudit: () => void;
}

export const useAuditStore = create<AuditStore>((set) => ({
  currentAudit: null,
  
  initializeAudit: (data) => set({
    currentAudit: {
      id: uuidv4(),
      unitNumber: '',
      teamNumber: '',
      completedBy: '',
      date: new Date().toISOString().split('T')[0],
      timeIn: '',
      timeOut: '',
      isEnergyDataCandidate: false,
      isResidentProfileCandidate: false,
      status: 'draft',
      
      // Initialize all checklist sections with spread operator to create new arrays
      introductionChecklist: [...CHECKLIST_ITEMS.introduction],
      safetyChecklist: [...CHECKLIST_ITEMS.safety],
      livingAreaChecklist: [...CHECKLIST_ITEMS.livingArea],
      bathroomChecklist: [...CHECKLIST_ITEMS.bathroom],
      kitchenChecklist: [...CHECKLIST_ITEMS.kitchen],
      sealedAreas: {
        lightSwitches: 0,
        outlets: 0,
        vents: 0,
        windows: 0,
        baseboards: 0,
      },
      faucetAerators: {
        bath: 0,
        kitchen: 0,
      },
      showerHead: 0,
      toiletTummy: 0,
      standardPowerStrip: 0,
      smartPowerStrip: 0,

      ...data
    }
  }),
  
  updateBasicInfo: (data) => 
    set((state) => ({
      currentAudit: state.currentAudit 
        ? { ...state.currentAudit, ...data }
        : null
    })),
  
  updateChecklist: (section, items) =>
    set((state) => ({
      currentAudit: state.currentAudit
        ? {
            ...state.currentAudit,
            [`${section}Checklist`]: [...items] // Create new array
          }
        : null
    })),
    
  updateNotes: (notes) =>
    set((state) => ({
      currentAudit: state.currentAudit
        ? { ...state.currentAudit, notes }
        : null
    })),
    
  completeAudit: () =>
    set((state) => ({
      currentAudit: state.currentAudit
        ? { ...state.currentAudit, status: 'completed' }
        : null
    })),
    
  resetAudit: () => set({ currentAudit: null })
}));