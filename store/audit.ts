// store/audit-store.ts
import { create } from 'zustand';
import { AuditData, ChecklistItem } from '../types/audit';

interface AuditStore {
    currentAudit: AuditData | null;
    initializeAudit: (basicInfo: Partial<AuditData>) => void;
    updateBasicInfo: (info: Partial<AuditData>) => void;
    updateChecklist: (
        section: 'livingAreaChecklist' | 'bathroomChecklist' | 'kitchenChecklist' | 'safetyChecklist',
        items: ChecklistItem[]
    ) => void;
    updateNotes: (notes: string) => void;
    completeAudit: () => void;
}

const DEFAULT_CHECKLIST_ITEMS = {
    livingAreaChecklist: [
        { id: 'trim-gaps', label: 'Check for gaps around window and door trim', checked: false, notes: '' },
        { id: 'outlet-covers', label: 'Remove switch and outlet covers', checked: false, notes: '' },
        { id: 'outlet-gaps', label: 'Inspect for gaps between electrical box and drywall', checked: false, notes: '' },
        // Add more items as needed
    ],
    bathroomChecklist: [
        { id: 'toilet-leak', label: 'Conduct dye test and check for leaks', checked: false, notes: '' },
        { id: 'shower-leak', label: 'Check for leaks from showerhead and bath spout', checked: false, notes: '' },
        { id: 'plumbing-gaps', label: 'Inspect for gaps between drywall and piping', checked: false, notes: '' },
        // Add more items
    ],
    // Add other sections
};

export const useAuditStore = create<AuditStore>((set) => ({
    currentAudit: null,

    initializeAudit: (basicInfo) => set({
        currentAudit: {
            id: Date.now().toString(),
            status: 'draft',
            ...DEFAULT_CHECKLIST_ITEMS,
            ...basicInfo,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            sealedAreas: {
                outlets: false,
                vents: false,
                windows: false,
                baseboards: false,
            },
            faucetAerators: {
                bath: false,
                kitchen: false,
            },
            showerHead: false,
            toiletTummy: false,
            standardPowerStrip: false,
            smartPowerStrip: false,
            notes: '',
        },
    }),

    updateBasicInfo: (info) => set((state) => ({
        currentAudit: state.currentAudit ? {
            ...state.currentAudit,
            ...info,
            updatedAt: new Date().toISOString(),
        } : null,
    })),

    updateChecklist: (section, items) => set((state) => ({
        currentAudit: state.currentAudit ? {
            ...state.currentAudit,
            [section]: items,
            updatedAt: new Date().toISOString(),
        } : null,
    })),

    updateNotes: (notes) => set((state) => ({
        currentAudit: state.currentAudit ? {
            ...state.currentAudit,
            notes,
            updatedAt: new Date().toISOString(),
        } : null,
    })),

    completeAudit: () => set((state) => ({
        currentAudit: state.currentAudit ? {
            ...state.currentAudit,
            status: 'completed',
            updatedAt: new Date().toISOString(),
        } : null,
    })),
}));