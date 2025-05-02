const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Helper to generate unique IDs (simple example)
const generateId = () => Math.random().toString(36).substring(2, 15);

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { 
        'Access-Control-Allow-Origin': '*', // Adjust in production
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
     }, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }
  if (!OPENAI_API_KEY) {
    console.error('OpenAI API key missing');
    return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error: API key missing.' }) };
  }

  let settings;
  try {
    settings = JSON.parse(event.body);
    if (!settings || typeof settings !== 'object') throw new Error('Invalid JSON');
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: `Invalid JSON in request body: ${e.message}` }) };
  }

  const { numQuestions = 5, level = 'intermediate', instructions = '', content = null } = settings;

  // *** ADD LOGGING HERE TO VERIFY content ***
  console.log('--- generate-quiz function invoked ---');
  console.log('Received settings:', settings); // Log the entire settings object
  console.log('Received content:', content ? `Content received (length: ${content.length})` : 'No content received');
  console.log('-------------------------------------');

  // --- Construct the Prompt ---
  let promptContent = `Generate ${numQuestions} quiz questions suitable for an ${level} level learner.`;
  if (content) {
    promptContent += ` The questions should be based on the following text content:\n\n---\n${content.slice(0, 3000)}\n---\n`; // Limit content length
  }
  if (instructions) {
    promptContent += ` Follow these specific instructions: ${instructions}.`;
  }

  promptContent += `\n\nIMPORTANT: Respond ONLY with a valid JSON array. Do not include any introductory text, explanations, or markdown formatting. Each object in the array must have EXACTLY the following structure: { \"id\": \"unique_string_id\", \"question\": \"The question text\", \"options\": [\"Option A text\", \"Option B text\", \"Option C text\", \"Option D text\"], \"correctAnswer\": \"The exact text of the correct option\" }. Ensure the 'correctAnswer' value perfectly matches one of the strings in the 'options' array. Generate a unique string for each 'id' field.`;
  // --- End Prompt Construction ---

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Or gpt-4o if preferred and available
        messages: [
          { role: "system", content: "You are an AI assistant that generates quizzes in a specific JSON format." },
          { role: "user", content: promptContent }
        ],
        // Adjust max_tokens based on expected output size (numQuestions * estimated tokens per question)
        max_tokens: numQuestions * 150, 
        temperature: 0.6, // Adjust creativity
        // response_format: { "type": "json_object" }, // Use if available on the model and needed for strict JSON
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`OpenAI API request failed with status ${response.status}: ${errorData?.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const rawResponseContent = data.choices?.[0]?.message?.content?.trim();

    if (!rawResponseContent) {
        console.error('No content in OpenAI response:', data);
        throw new Error('Failed to get content from OpenAI response.');
    }
    
    // --- Parse the response content as JSON --- 
    let questionsArray;
    try {
      // Attempt to parse the entire string as JSON
      questionsArray = JSON.parse(rawResponseContent);
      // Basic validation
      if (!Array.isArray(questionsArray) || questionsArray.some(q => !q.id || !q.question || !q.options || !q.correctAnswer)) {
        throw new Error('Parsed JSON does not match expected format.');
      }
    } catch (parseError) {
        console.error('Failed to parse OpenAI response as JSON:', parseError);
        console.error('Raw response content:', rawResponseContent); // Log the raw response for debugging
        throw new Error(`Failed to parse OpenAI response as valid JSON quiz data. ${parseError.message}`);
    }
    // --- End JSON Parsing ---

    // Return the successful response with the questions array
    return {
      statusCode: 200,
      headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Adjust in production
      },
      body: JSON.stringify({ questions: questionsArray }), // Send the parsed array back
    };

  } catch (error) {
    console.error('Error in generate-quiz function:', error);
    return {
      statusCode: 500,
      headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Adjust in production
       },
      body: JSON.stringify({ error: `Failed to generate quiz: ${error.message}` }),
    };
  }
}; 