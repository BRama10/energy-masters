// app/api/audit/join/route.ts
import { NextResponse } from 'next/server';
import { pusher } from '@/lib/pusher';

export async function POST(request: Request) {
    const body = await request.json();
    const { auditId, username } = body;

    await pusher.trigger(`audit-${auditId}`, 'user-joined', {
        user: username,
        cluster: "mt1"
    });

    return NextResponse.json({ success: true });
}