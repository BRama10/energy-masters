// components/BasicInfoForm.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AuditBasicInfo } from '../types/audit';

interface BasicInfoFormProps {
  data: Partial<AuditBasicInfo>;
  onUpdate: (data: Partial<AuditBasicInfo>) => void;
}

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
          <div className="space-y-2">
            <Label htmlFor="timeIn">Time In</Label>
            <Input
              id="timeIn"
              type="time"
              value={data.timeIn || ''}
              onChange={(e) => onUpdate({ timeIn: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeOut">Time Out</Label>
            <Input
              id="timeOut"
              type="time"
              value={data.timeOut || ''}
              onChange={(e) => onUpdate({ timeOut: e.target.value })}
            />
          </div>
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
