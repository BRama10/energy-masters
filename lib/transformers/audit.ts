// lib/transformers/audit.ts
//@ts-nocheck
import { Prisma, Audit } from '@prisma/client';
import { AuditData, ChecklistItem } from '@/types/audit';

export function transformPrismaAuditToAuditData(prismaAudit: Audit): AuditData {
  return {
    id: prismaAudit.id,
    unitNumber: prismaAudit.unitNumber,
    teamNumber: prismaAudit.teamNumber,
    completedBy: prismaAudit.completedBy,
    date: prismaAudit.date.toISOString().split('T')[0],
    timeIn: prismaAudit.timeIn,
    timeOut: prismaAudit.timeOut,
    isEnergyDataCandidate: prismaAudit.isEnergyDataCandidate,
    isResidentProfileCandidate: prismaAudit.isResidentProfileCandidate,
    status: prismaAudit.status,
    createdAt: prismaAudit.createdAt.toISOString(),
    updatedAt: prismaAudit.updatedAt.toISOString(),
    
    // Transform JSON fields back to proper types
    introductionChecklist: prismaAudit.introductionChecklist as ChecklistItem[] || [],
    safetyChecklist: prismaAudit.safetyChecklist as ChecklistItem[] || [],
    livingAreaChecklist: prismaAudit.livingAreaChecklist as ChecklistItem[] || [],
    bathroomChecklist: prismaAudit.bathroomChecklist as ChecklistItem[] || [],
    kitchenChecklist: prismaAudit.kitchenChecklist as ChecklistItem[] || [],
    
    // Transform stats fields
    sealedAreas: prismaAudit.sealedAreas as AuditData['sealedAreas'] || {
      lightSwitches: 0,
      outlets: 0,
      vents: 0,
      windows: 0,
      baseboards: 0,
    },
    faucetAerators: prismaAudit.faucetAerators as AuditData['faucetAerators'] || {
      bath: 0,
      kitchen: 0,
    },
    showerHead: prismaAudit.showerHead || 0,
    toiletTummy: prismaAudit.toiletTummy || 0,
    standardPowerStrip: prismaAudit.standardPowerStrip || 0,
    smartPowerStrip: prismaAudit.smartPowerStrip || 0,
    
    generalNotes: prismaAudit.generalNotes || undefined,
  };
}

export function transformAuditDataToPrisma(auditData: Partial<AuditData>) {
  const prismaData: Prisma.AuditUncheckedCreateInput = {
    id: auditData.id,
    unitNumber: auditData.unitNumber!,
    teamNumber: auditData.teamNumber!,
    completedBy: auditData.completedBy!,
    date: auditData.date ? new Date(auditData.date) : new Date(),
    timeIn: auditData.timeIn!,
    timeOut: auditData.timeOut!,
    isEnergyDataCandidate: auditData.isEnergyDataCandidate ?? false,
    isResidentProfileCandidate: auditData.isResidentProfileCandidate ?? false,
    status: auditData.status || 'draft',
    userId: 'placeholder', // This will be set in the action
    
    // Transform arrays/objects to JSON
    introductionChecklist: auditData.introductionChecklist as Prisma.JsonValue,
    safetyChecklist: auditData.safetyChecklist as Prisma.JsonValue,
    livingAreaChecklist: auditData.livingAreaChecklist as Prisma.JsonValue,
    bathroomChecklist: auditData.bathroomChecklist as Prisma.JsonValue,
    kitchenChecklist: auditData.kitchenChecklist as Prisma.JsonValue,
    
    // Transform stats fields to JSON/values
    sealedAreas: auditData.sealedAreas as Prisma.JsonValue,
    faucetAerators: auditData.faucetAerators as Prisma.JsonValue,
    showerHead: auditData.showerHead || 0,
    toiletTummy: auditData.toiletTummy || 0,
    standardPowerStrip: auditData.standardPowerStrip || 0,
    smartPowerStrip: auditData.smartPowerStrip || 0,
    
    generalNotes: auditData.generalNotes,
  };

  return prismaData;
}