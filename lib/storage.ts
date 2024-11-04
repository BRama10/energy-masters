// lib/storage.ts
import { AuditData } from '../types/audit';

const STORAGE_KEY = 'energy-masters-audits';

export const saveAuditToStorage = (audit: AuditData) => {
    try {
        const existingData = localStorage.getItem(STORAGE_KEY);
        const audits = existingData ? JSON.parse(existingData) : [];

        const existingIndex = audits.findIndex((a: AuditData) => a.id === audit.id);
        if (existingIndex >= 0) {
            audits[existingIndex] = audit;
        } else {
            audits.push(audit);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(audits));
    } catch (error) {
        console.error('Error saving audit:', error);
    }
};

export const getAuditsFromStorage = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error getting audits:', error);
        return [];
    }
};

export const getAuditFromStorage = (id: string) => {
    try {
        const audits = getAuditsFromStorage();
        return audits.find((audit: AuditData) => audit.id === id) || null;
    } catch (error) {
        console.error('Error getting audit:', error);
        return null;
    }
};