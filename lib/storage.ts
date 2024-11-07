// lib/storage.ts
import { AuditData } from '../types/audit';

const STORAGE_KEY = 'energy-masters-audits';

export const saveAuditToStorage = (audit: AuditData) => {
    try {
        // Get existing audits
        const existingData = localStorage.getItem(STORAGE_KEY);
        const audits: AuditData[] = existingData ? JSON.parse(existingData) : [];

        // Find if this audit already exists
        const existingIndex = audits.findIndex(a => a.id === audit.id);

        if (existingIndex >= 0) {
            // Update existing audit
            audits[existingIndex] = {
                ...audit,
                updatedAt: new Date().toISOString()
            };
        } else {
            // Add new audit
            audits.push({
                ...audit,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }

        // Save back to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(audits));

        return true;
    } catch (error) {
        console.error('Error saving audit:', error);
        throw new Error('Failed to save audit');
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

export const deleteAuditFromStorage = (id: string) => {
    try {
        const audits = getAuditsFromStorage();
        const filteredAudits = audits.filter((audit: AuditData) => audit.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredAudits));
        return true;
    } catch (error) {
        console.error('Error deleting audit:', error);
        throw new Error('Failed to delete audit');
    }
};