// app/api/audits/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Get all drafts
export async function GET() {
    const audits = await prisma.audit.findMany({
        orderBy: {
            updatedAt: 'desc'
        }
    });

    return NextResponse.json(audits);
}

export async function POST(request: Request) {
    const body = await request.json();
    
    try {
      // Extract only the fields we want to save
      const auditData = {
        unitNumber: body.unitNumber,
        teamNumber: body.teamNumber,
        completedBy: body.completedBy,
        timeIn: body.timeIn,
        timeOut: body.timeOut,
        date: body.date,
        status: 'draft',
        notes: body.notes || '',
        livingAreaChecklist: body.livingAreaChecklist,
        bathroomChecklist: body.bathroomChecklist,
        kitchenChecklist: body.kitchenChecklist,
        safetyChecklist: body.safetyChecklist,
        sealedAreas: body.sealedAreas,
        faucetAerators: body.faucetAerators,
        showerHead: body.showerHead || false,
        toiletTummy: body.toiletTummy || false,
        standardPowerStrip: body.standardPowerStrip || false,
        smartPowerStrip: body.smartPowerStrip || false,
        collaborators: [body.username]
      };
  
      const audit = await prisma.audit.create({
        data: auditData
      });
      
      return NextResponse.json(audit);
    } catch (error) {
      console.error('Error creating audit:', error);
      return NextResponse.json(
        { error: 'Failed to create audit' },
        { status: 500 }
      );
    }
  }