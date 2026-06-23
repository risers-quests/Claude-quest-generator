export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { system, user } = await req.json();

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'prompt-caching-2024-07-31',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      system: [
        { type: 'text', text: system, cache_control: { type: 'ephemeral' } },
        { type: 'text', text: '\n\nRespond with ONLY valid JSON. No preamble, no markdown fences, no commentary.' },
      ],
      messages: [{ role: 'user', content: user }],
    }),
  });

  if (!upstream.ok) {
    const errText = await upstream.text().catch(() => '');
    return new Response(errText || 'Upstream error', { status: upstream.status });
  }

  const data = await upstream.json();
  const text = data.content.map(b => b.text || '').join('\n');
  return new Response(JSON.stringify({ text }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
