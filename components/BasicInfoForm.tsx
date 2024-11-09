import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Clock, Check } from "lucide-react";
import { AuditBasicInfo } from '../types/audit';
import { cn, getCurrentTime } from "@/lib/utils";

interface BasicInfoFormProps {
  data: Partial<AuditBasicInfo>;
  onUpdate: (data: Partial<AuditBasicInfo>) => void;
}

const TimePickerInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
}> = ({ value, onChange, label, id }) => {
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));

  const [selectedHour, selectedMinute] = value ? value.split(':') : ['', ''];

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {value || "Select time"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="space-y-1">
                <Label>Hours</Label>
                <div className="h-48 overflow-y-auto">
                  {hours.map((hour) => (
                    <Button
                      key={hour}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        hour === selectedHour && "bg-accent"
                      )}
                      onClick={() => {
                        const newTime = `${hour}:${selectedMinute || '00'}`;
                        onChange(newTime);
                      }}
                    >
                      {hour}
                      {hour === selectedHour && (
                        <Check className="ml-auto h-4 w-4" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <Label>Minutes</Label>
                <div className="h-48 overflow-y-auto">
                  {minutes.map((minute) => (
                    <Button
                      key={minute}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        minute === selectedMinute && "bg-accent"
                      )}
                      onClick={() => {
                        const newTime = `${selectedHour || '00'}:${minute}`;
                        onChange(newTime);
                      }}
                    >
                      {minute}
                      {minute === selectedMinute && (
                        <Check className="ml-auto h-4 w-4" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => onChange(getCurrentTime())}
            >
              Set Current Time
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ data, onUpdate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="unitNumber">Unit Number</Label>
            <Input
              id="unitNumber"
              value={data.unitNumber || ''}
              onChange={(e) => onUpdate({ unitNumber: e.target.value })}
              placeholder="Enter unit number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="teamNumber">Team Number</Label>
            <Input
              id="teamNumber"
              value={data.teamNumber || ''}
              onChange={(e) => onUpdate({ teamNumber: e.target.value })}
              placeholder="Enter team number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="completedBy">Completed By</Label>
            <Input
              id="completedBy"
              value={data.completedBy || ''}
              onChange={(e) => onUpdate({ completedBy: e.target.value })}
              placeholder="Enter your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={data.date || ''}
              onChange={(e) => onUpdate({ date: e.target.value })}
            />
          </div>

          <TimePickerInput
            id="timeIn"
            label="Time In"
            value={data.timeIn || ''}
            onChange={(value) => onUpdate({ timeIn: value })}
          />

          <TimePickerInput
            id="timeOut"
            label="Time Out"
            value={data.timeOut || ''}
            onChange={(value) => onUpdate({ timeOut: value })}
          />
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="energyData">Energy Data Usage Candidate</Label>
            <Switch
              id="energyData"
              checked={data.isEnergyDataCandidate || false}
              onCheckedChange={(checked) => onUpdate({ isEnergyDataCandidate: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="residentProfile">Resident Profile Candidate</Label>
            <Switch
              id="residentProfile"
              checked={data.isResidentProfileCandidate || false}
              onCheckedChange={(checked) => onUpdate({ isResidentProfileCandidate: checked })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};