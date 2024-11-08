// app/api/pusher/auth/route.ts
import { NextResponse } from 'next/server';
import { pusher } from '@/lib/pusher';
import { headers } from 'next/headers';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const socket_id = formData.get('socket_id') as string;
        const channel_name = formData.get('channel_name') as string;

        if (!socket_id || !channel_name) {
            return NextResponse.json(
                { error: 'Required parameters missing' },
                { status: 400 }
            );
        }

        // Get the current user from your auth system
        // For this example, we'll use a random user ID
        const user_id = Math.random().toString(36).substring(7);

        // For presence channels
        if (channel_name.startsWith('presence-')) {
            const presenceData = {
                user_id,
                user_info: {
                    username: user_id,
                }
            };
            const auth = pusher.authorizeChannel(socket_id, channel_name, presenceData);
            return NextResponse.json(auth);
        }

        // For private channels
        const auth = pusher.authorizeChannel(socket_id, channel_name);
        return NextResponse.json(auth);
    } catch (error) {
        console.error('Pusher auth error:', error);
        return NextResponse.json(
            { error: 'Invalid auth request' },
            { status: 400 }
        );
    }
}