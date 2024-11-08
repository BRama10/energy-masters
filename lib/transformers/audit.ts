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
    
    summary: prismaAudit.summary as AuditData['summary'],
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
    
    summary: auditData.summary as Prisma.JsonValue,
    generalNotes: auditData.generalNotes,
  };

  return prismaData;
}