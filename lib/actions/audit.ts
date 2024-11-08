// lib/actions/audit.ts
'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { AuditData } from '@/types/audit';

import {
    transformAuditDataToPrisma,
    transformPrismaAuditToAuditData
} from '@/lib/transformers/audit';

export async function saveAudit(userId: string, auditData: Omit<AuditData, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
        if (!userId) throw new Error('Unauthorized');

        const prismaData = transformAuditDataToPrisma(auditData);
        prismaData.userId = userId;

        const savedAudit = await prisma.audit.create({
            data: prismaData,
        });

        revalidatePath('/audit/drafts');
        return { success: true, data: transformPrismaAuditToAuditData(savedAudit) };
    } catch (error) {
        console.error('Error saving audit:', error);
        return { success: false, error: 'Failed to save audit' };
    }
}

export async function updateAudit(userId: string, id: string, auditData: Partial<AuditData>) {
    try {
        if (!userId) throw new Error('Unauthorized');

        const prismaData = transformAuditDataToPrisma({
            ...auditData,
            id
        });

        const updatedAudit = await prisma.audit.update({
            where: { id },
            data: prismaData,
        });

        revalidatePath('/audit/drafts');
        revalidatePath(`/audit/${id}`);
        return { success: true, data: transformPrismaAuditToAuditData(updatedAudit) };
    } catch (error) {
        console.error('Error updating audit:', error);
        return { success: false, error: 'Failed to update audit' };
    }
}

export async function getAudit(userId: string, id: string) {
    try {
        if (!userId) throw new Error('Unauthorized');

        const audit = await prisma.audit.findUnique({
            where: { id },
        });

        if (!audit) return { success: false, error: 'Audit not found' };
        return { success: true, data: transformPrismaAuditToAuditData(audit) };
    } catch (error) {
        console.error('Error getting audit:', error);
        return { success: false, error: 'Failed to get audit' };
    }
}

export async function getAudits(userId: string,) {
    try {
        if (!userId) throw new Error('Unauthorized');

        const audits = await prisma.audit.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
        });

        return {
            success: true,
            data: audits.map(transformPrismaAuditToAuditData)
        };
    } catch (error) {
        console.error('Error getting audits:', error);
        return { success: false, error: 'Failed to get audits' };
    }
}

export async function deleteAudit(userId: string, id: string) {
    try {
        if (!userId) throw new Error('Unauthorized');

        await prisma.audit.delete({
            where: { id },
        });

        revalidatePath('/audit/drafts');
        return { success: true };
    } catch (error) {
        console.error('Error deleting audit:', error);
        return { success: false, error: 'Failed to delete audit' };
    }
}