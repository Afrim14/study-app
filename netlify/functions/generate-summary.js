// netlify/functions/generate-summary.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

exports.handler = async (event) => {
  // 支持 CORS 预检
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    }, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  if (!OPENAI_API_KEY) {
    console.error('API key missing');
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error: API key missing' }) };
  }

  let content;
  try {
    ({ content } = JSON.parse(event.body));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }
  if (!content) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing content' }) };
  }


  content = content.slice(0, 2000);

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that summarizes text.' },
          { role: 'user', content: `Plase summarize the following text：\n\n${content}` },
        ],
        max_tokens: 300,
        temperature: 0.5,
      }),
    });
    if (!response.ok) {
      const err = await response.json();
      console.error('OpenAI error', err);
      throw new Error(`Status ${response.status}`);
    }
    const { choices } = await response.json();
    const summary = choices?.[0]?.message?.content?.trim() || '';
    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ summary }),
    };
  } catch (error) {
    console.error('Generation error', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
