import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai('gpt-3.5-turbo'), // Using GPT-3.5 as it's more cost-effective
    messages,
  })

  return result.toDataStreamResponse()
}
