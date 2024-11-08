// app/api/audit/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { pusher } from '@/lib/pusher';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { changes, username, type, timestamp } = body;

    // Validate input
    if (!changes || typeof changes !== 'object') {
      return NextResponse.json(
        { error: 'Invalid changes object' },
        { status: 400 }
      );
    }

    // Get existing audit
    const existingAudit = await prisma.audit.findUnique({
      where: { id },
      select: { collaborators: true }
    });

    if (!existingAudit) {
      return NextResponse.json(
        { error: 'Audit not found' },
        { status: 404 }
      );
    }

    // Prepare collaborators array
    let collaborators = Array.isArray(existingAudit.collaborators) 
      ? existingAudit.collaborators 
      : [];
    
    if (username && !collaborators.includes(username)) {
      collaborators.push(username);
    }

    // Update the audit
    const audit = await prisma.audit.update({
      where: { id },
      data: {
        ...changes,
        lastUpdate: timestamp,
        collaborators
      },
    });

    if (!audit) {
      throw new Error('Failed to update audit');
    }

    // Broadcast the changes
    await pusher.trigger(`audit-${id}`, 'audit-updated', {
      changes,
      type,
      user: username,
      timestamp,
    });

    return NextResponse.json(audit);
  } catch (error) {
    console.error('Error updating audit:', error);
    return NextResponse.json(
      { error: 'Failed to update audit' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const audit = await prisma.audit.findUnique({
      where: { id },
    });

    if (!audit) {
      return NextResponse.json(
        { error: 'Audit not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(audit);
  } catch (error) {
    console.error('Error fetching audit:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit' },
      { status: 500 }
    );
  }
}