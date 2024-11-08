// constants/checklist-items.ts

const BASE_ITEMS = {
    introduction: [
        {
            id: 'intro-team',
            label: 'Introduce yourself and the team (see tip sheet)',
            category: 'Introduction',
            subchecks: [
                'Explain what the team will be doing and how long you\'ll be there',
                'Provide Energy Saver Guide to and share tips with the residents'
            ]
        },
        {
            id: 'tenant-education',
            label: 'Tenant Education Status',
            category: 'Education',
            subchecks: [
                'No tenant education completed',
                'Some tenant education completed'
            ],
            requiresNote: true
        }
    ],
    safety: [
        {
            id: 'bedbugs',
            label: 'Check for signs of bed bugs - If present, exit the unit and report back to the work team staging area',
            category: 'Safety',
            severity: 'high'
        },
        {
            id: 'mold',
            label: 'Check for signs of mold - If found, use your judgment about remaining and performing the work. Leave if uncomfortable',
            category: 'Safety',
            severity: 'high'
        },
        {
            id: 'peeling-paint',
            label: 'Check for peeling paint around window and door trim - If found, do not perform sealing activities in those areas',
            category: 'Safety',
            severity: 'medium'
        },
        {
            id: 'illness',
            label: 'Check if residents show signs of illness - If present, use your judgment about remaining and performing the work',
            category: 'Safety',
            severity: 'high'
        }
    ],
    livingArea: [
        {
            id: 'trim-gaps',
            label: 'Check for gaps or cracks around window and door trim',
            category: 'Trim',
            subchecks: [
                'Inspect thoroughly around all windows and doors',
                'Apply caulk where necessary'
            ]
        },
        {
            id: 'outlet-inspection',
            label: 'Electrical outlet inspection and sealing',
            category: 'Electrical',
            subchecks: [
                'Remove switch and outlet covers',
                'Inspect for gaps between electrical box and drywall',
                'Install backer rod and/or apply caulk or spray foam as necessary',
                'Wait 10 minutes for drying, then install foam inserts',
                'Replace covers and screws',
                'Install safety outlet covers on rarely used outlets (according to tenants)'
            ]
        },
        {
            id: 'vent-grills',
            label: 'Vent grill inspection and sealing',
            category: 'Ventilation',
            subchecks: [
                'Remove grill cover',
                'Inspect for gaps between drywall and vent',
                'Install backer rod and/or apply caulk or spray foam as necessary',
                'Clean and then replace grill cover'
            ]
        },
        {
            id: 'electrical-panels',
            label: 'Electrical panel inspection - DO NOT REMOVE PANEL',
            category: 'Electrical',
            subchecks: [
                'Caulk seam where the panel meets the drywall as necessary'
            ],
            warning: true
        },
        {
            id: 'exterior-doors',
            label: 'Exterior door inspection',
            category: 'Doors',
            subchecks: [
                'Inspect weather stripping around and sweeps at bottom of doors',
                'Include sliding glass doors in inspection',
                'Note if either has gaps or leaks that need to be repaired'
            ],
            requiresNote: true,
            repairOptions: ['Weather stripping', 'Door Sweep']
        },
        {
            id: 'baseboards',
            label: 'Baseboard sealing',
            category: 'Insulation',
            subchecks: [
                'Peel back carpet to seal off baseboard',
                'Use backer rod and caulk as necessary'
            ]
        },
        {
            id: 'lighting',
            label: 'Lighting efficiency and sealing',
            category: 'Lighting',
            subchecks: [
                'Replace incandescent light bulbs with LEDs in most commonly used lights',
                'Check for gaps in ceilings around the light fixtures',
                'Apply caulk as necessary'
            ]
        }
    ],
    bathroom: [
        {
            id: 'bathroom-lighting',
            label: 'Bathroom lighting upgrade',
            category: 'Lighting',
            subchecks: [
                'Replace incandescent and CFL light bulbs with LED lights (40W CFL globes)',
                'Check for gaps in ceilings around the light fixtures',
                'Apply caulk as necessary'
            ]
        },
        {
            id: 'bath-vent',
            label: 'Bathroom ventilation inspection',
            category: 'Ventilation',
            subchecks: [
                'Remove grills and/or fan covers',
                'Inspect for gaps between drywall and vent or fan',
                'Install backer rod and/or apply caulk or spray foam as necessary',
                'Clean and then replace grills and/or fan covers'
            ]
        },
        {
            id: 'medicine-cabinet',
            label: 'Medicine cabinet inspection',
            category: 'Fixtures',
            subchecks: [
                'Inspect for gaps between drywall and cabinet',
                'Apply caulk or spray foam as necessary'
            ]
        },
        {
            id: 'bath-plumbing',
            label: 'Bathroom plumbing inspection',
            category: 'Plumbing',
            subchecks: [
                'Inspect inside cabinets under sinks for gaps between drywall and pipes',
                'Install backer rod and/or apply caulk or spray foam as necessary',
                'Do not seal over the main plumbing trap'
            ]
        },
        {
            id: 'toilet-check',
            label: 'Toilet inspection and upgrade',
            category: 'Plumbing',
            subchecks: [
                'Conduct dye test and check for leaks',
                'Install tummy into the tank as necessary (not for newer water efficient toilets)',
                'Do not install in low-flow toilets (1.6 gallons or less)',
                'Ensure proper flushing after tummy installation'
            ],
            requiresNote: true,
            repairNote: 'Toilet Leak Repair Location'
        },
        {
            id: 'shower-check',
            label: 'Shower inspection and upgrade',
            category: 'Plumbing',
            subchecks: [
                'Check for leaks from showerhead and bath spout',
                'Inspect for gaps between drywall and piping',
                'Apply caulk as necessary',
                'Replace 2.0+ gpm showerhead(s) with low flow model',
                'Wrap plumbing tape around joint 4 times clockwise before new showerhead',
                'Test new showerhead for leaks'
            ],
            requiresNote: true,
            repairNote: 'Bath or Shower Leak Repair Location'
        },
        {
            id: 'plumbing-panel',
            label: 'Plumbing panel inspection (if applicable)',
            category: 'Plumbing',
            subchecks: [
                'Inspect for gaps around panel opening',
                'Add weather stripping around inside opening',
                'Apply caulk to seal between panel and drywall as needed'
            ]
        }
    ],
    kitchen: [
        {
            id: 'kitchen-lighting',
            label: 'Kitchen lighting upgrade',
            category: 'Lighting',
            subchecks: [
                'Replace incandescent and CFL light bulbs with LED lights (60W LED bulbs)',
                'Check for gaps in ceilings around the light fixtures',
                'Apply caulk as necessary'
            ]
        },
        {
            id: 'kitchen-faucet',
            label: 'Kitchen faucet inspection',
            category: 'Plumbing',
            subchecks: [
                'Check for leaks',
                'Install aerators',
                'Have resident test and approve water flow'
            ],
            requiresNote: true,
            repairNote: 'Faucet Leak Repair Location'
        },
        {
            id: 'kitchen-plumbing',
            label: 'Kitchen plumbing inspection',
            category: 'Plumbing',
            subchecks: [
                'Inspect inside cabinets under sinks for gaps',
                'Install backer rod and/or apply caulk or spray foam as necessary',
                'Do not seal over the main plumbing trap'
            ]
        },
        {
            id: 'refrigerator',
            label: 'Refrigerator maintenance',
            category: 'Appliances',
            subchecks: [
                'Clean coils beneath the refrigerator with the brush in your kit'
            ]
        },
        {
            id: 'kitchen-vent',
            label: 'Kitchen ventilation inspection',
            category: 'Ventilation',
            subchecks: [
                'Remove grills and/or fan covers',
                'Inspect for gaps between drywall and vent or fan',
                'Install backer rod and/or apply caulk or spray foam as necessary',
                'Clean and then replace grills and/or fan covers'
            ]
        }
    ]
} as const;

// Create a function to convert readonly arrays to mutable ones
function createChecklistItems<T extends typeof BASE_ITEMS>(items: T) {
    const mutableItems: { [K in keyof T]: Array<{
        id: string;
        label: string;
        category?: string;
        severity?: 'low' | 'medium' | 'high';
        subchecks?: string[];
        tasks?: string[];
        warning?: boolean;
        repairOptions?: string[];
        repairNote?: string;
        requiresNote?: boolean;
        checked?: boolean;
        notes?: string;
    }> } = {} as any;

    for (const [key, value] of Object.entries(items)) {
        //@ts-ignore
        mutableItems[key as keyof T] = [...value];
    }

    return mutableItems;
}

// Export the mutable version
export const CHECKLIST_ITEMS = createChecklistItems(BASE_ITEMS);