// app/api/audit/update/route.ts
import { NextResponse } from 'next/server';
import { pusher } from '@/lib/pusher';

export async function POST(request: Request) {
  const body = await request.json();
  const { auditId, change, type, section, username } = body;

  await pusher.trigger(`audit-${auditId}`, 'audit-updated', {
    change,
    type,
    section,
    user: username,
    cluster: "mt1"
  });

  return NextResponse.json({ success: true });
}