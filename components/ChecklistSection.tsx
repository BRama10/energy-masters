// components/ChecklistSection.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChecklistItem } from '../types/audit';

interface ChecklistSectionProps {
  items: ChecklistItem[];
  onUpdate: (items: ChecklistItem[]) => void;
}

export const ChecklistSection: React.FC<ChecklistSectionProps> = ({ items, onUpdate }) => {
  const handleCheckItem = (id: string, checked: boolean) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, checked } : item
    );
    onUpdate(updatedItems);
  };

  const handleNotesUpdate = (id: string, notes: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, notes } : item
    );
    onUpdate(updatedItems);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <div className="flex items-center gap-2 py-2">
            <Checkbox
              id={item.id}
              checked={item.checked}
              onCheckedChange={(checked) => handleCheckItem(item.id, checked as boolean)}
            />
            <Label htmlFor={item.id} className="flex-1">
              {item.label}
            </Label>
          </div>
          <AccordionContent>
            <Textarea
              placeholder="Add notes..."
              value={item.notes || ''}
              onChange={(e) => handleNotesUpdate(item.id, e.target.value)}
              className="mt-2"
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};