// constants/checklist-items.ts
export const CHECKLIST_ITEMS = {
    livingArea: [
        {
            id: 'trim-gaps',
            label: 'Check for gaps or cracks around window and door trim',
            category: 'Trim',
        },
        {
            id: 'outlet-covers',
            label: 'Remove switch and outlet covers',
            category: 'Electrical',
        },
        {
            id: 'outlet-gaps',
            label: 'Inspect for gaps between electrical box and drywall',
            category: 'Electrical',
        },
        {
            id: 'outlet-seal',
            label: 'Install backer rod and/or apply caulk or spray foam as necessary',
            category: 'Electrical',
        },
        {
            id: 'baseboards',
            label: 'Peel back carpet to seal off baseboard',
            category: 'Baseboards',
        },
        {
            id: 'lighting-replace',
            label: 'Replace incandescent light bulbs with LEDs',
            category: 'Lighting',
        },
        {
            id: 'lighting-gaps',
            label: 'Check for gaps in ceilings around light fixtures',
            category: 'Lighting',
        },
    ],
    bathroom: [
        {
            id: 'toilet-leak',
            label: 'Conduct dye test and check for leaks',
            category: 'Toilet',
        },
        {
            id: 'shower-leak',
            label: 'Check for leaks from showerhead and bath spout',
            category: 'Shower',
        },
        {
            id: 'plumbing-gaps',
            label: 'Inspect for gaps between drywall and piping',
            category: 'Plumbing',
        },
        {
            id: 'showerhead-replace',
            label: 'Replace 2.0+ gpm showerhead with low flow model',
            category: 'Shower',
        },
    ],
    kitchen: [
        {
            id: 'faucet-aerator',
            label: 'Install faucet aerator',
            category: 'Faucets',
        },
        {
            id: 'under-sink',
            label: 'Inspect inside cabinets under sinks for gaps',
            category: 'Plumbing',
        },
        {
            id: 'refrigerator-coils',
            label: 'Clean refrigerator coils',
            category: 'Appliances',
        },
    ],
    safety: [
        {
            id: 'bed-bugs',
            label: 'Check for signs of bed bugs',
            category: 'Inspection',
        },
        {
            id: 'mold',
            label: 'Check for signs of mold',
            category: 'Inspection',
        },
        {
            id: 'illness',
            label: 'Check if residents show signs of illness',
            category: 'Health',
        },
    ],
} as const;