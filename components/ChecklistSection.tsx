import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChevronDown, 
  ChevronRight, 
  ClipboardCheck, 
  MessageCircle, 
  X 
} from 'lucide-react';
import { ChecklistItem } from '@/types/audit';

interface EnhancedChecklistProps {
  items: ChecklistItem[];
  onUpdate: (items: ChecklistItem[]) => void;
}

export const EnhancedChecklist: React.FC<EnhancedChecklistProps> = ({ items, onUpdate }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState<string>('');

  const handleCheck = (id: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    onUpdate(updatedItems);
  };

  const handleAddNote = (id: string) => {
    if (!noteInput.trim()) return;
    
    const updatedItems = items.map(item =>
      item.id === id ? { 
        ...item, 
        notes: item.notes 
          ? `${item.notes}\n${noteInput}` 
          : noteInput 
      } : item
    );
    onUpdate(updatedItems);
    setNoteInput('');
    setExpandedItem(null);
  };

  const handleDeleteNote = (itemId: string) => {
    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, notes: undefined } : item
    );
    onUpdate(updatedItems);
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <Card className={`
            border-l-4 
            ${item.checked ? 'border-l-green-500' : 'border-l-blue-500'} 
            transition-all duration-200 hover:shadow-md
          `}>
            <div className="p-4">
              {/* Main Item Row */}
              <div className="flex items-center gap-3">
                <div 
                  onClick={() => handleCheck(item.id)}
                  className={`
                    flex items-center justify-center w-6 h-6 rounded-lg 
                    border-2 cursor-pointer transition-all duration-200
                    ${item.checked 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-300 hover:border-blue-500'
                    }
                  `}
                >
                  {item.checked && (
                    <ClipboardCheck className="w-4 h-4 text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  <p className={`
                    text-sm font-medium transition-all duration-200
                    ${item.checked ? 'text-gray-500 line-through' : 'text-gray-900'}
                  `}>
                    {item.label}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                  className="ml-2"
                >
                  {expandedItem === item.id ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Notes Section */}
              <AnimatePresence>
                {expandedItem === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-3"
                  >
                    {item.notes && (
                      <div className="bg-gray-50 rounded-lg p-3 relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteNote(item.id)}
                          className="absolute top-2 right-2 h-6 w-6"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <p className="text-sm text-gray-600 whitespace-pre-line pr-8">
                          {item.notes}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Textarea
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        placeholder="Add a note..."
                        className="text-sm min-h-[80px]"
                      />
                      <Button
                        onClick={() => handleAddNote(item.id)}
                        size="icon"
                        className="h-10 w-10 shrink-0"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};