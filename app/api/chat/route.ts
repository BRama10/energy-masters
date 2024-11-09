import { CoreMessage, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { EM_ASSISTANT_PROMPT } from '@/lib/prompts';

export async function POST(req: Request) {
    const { messages }: { messages: CoreMessage[] } = await req.json();

    const result = await streamText({
        model: openai('gpt-4o-mini'),
        system: EM_ASSISTANT_PROMPT,
        messages,
        maxTokens: 200
    });

    return result.toDataStreamResponse();
}