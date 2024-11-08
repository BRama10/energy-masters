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
  X,
  AlertTriangle,
  CheckCircle2
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
  };

  const handleDeleteNote = (itemId: string) => {
    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, notes: undefined } : item
    );
    onUpdate(updatedItems);
  };

  const getSeverityColor = (checked: boolean, severity?: string) => {
    switch (severity) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      default:
        return checked ? 'border-l-green-500' : 'border-l-blue-500';
    }
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
            ${getSeverityColor(item.checked || false, item.severity)}
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
                  <div className="flex items-start gap-2">
                    <p className={`
                      text-sm font-medium transition-all duration-200
                      ${item.checked ? 'text-gray-500 line-through' : 'text-gray-900'}
                    `}>
                      {item.label}
                    </p>
                    {item.warning && (
                      <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    )}
                  </div>
                  {item.category && (
                    <span className="text-xs text-muted-foreground mt-0.5">
                      {item.category}
                    </span>
                  )}
                </div>

                {((item.subchecks && item.subchecks?.length > 0) || (item.tasks && item.tasks?.length > 0) || item.notes || item.requiresNote) && (
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
                )}
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedItem === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-3 overflow-hidden"
                  >
                    {/* Subchecks */}
                    {item.subchecks && item.subchecks.length > 0 && (
                      <div className="bg-accent/50 rounded-lg p-3">
                        <ul className="space-y-2">
                          {item.subchecks.map((subcheck, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                              <span>{subcheck}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tasks (if separate from subchecks) */}
                    {item.tasks && item.tasks.length > 0 && (
                      <div className="bg-accent/50 rounded-lg p-3">
                        <ul className="space-y-2">
                          {item.tasks.map((task, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Repair Options */}
                    {item.repairOptions && item.repairOptions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.repairOptions.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* Existing Notes */}
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

                    {/* Note Input */}
                    <div className="flex gap-2">
                      <Textarea
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        placeholder={item.repairNote || "Add a note..."}
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