import {
  GoogleGenAI,
} from '@google/genai';


async function main(parameters) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const tools = [   
    {
      googleSearch: {
      }
    },
  ];
  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    tools,
  };
  const para = JSON.stringify(parameters);
  const model = 'gemini-2.0-flash-001';
  console.log(parameters);

  
  const prompt =`Generate a multiple-choice quiz based on the specifications in the following JSON object:
${para}

Your output must be a single, raw JSON object. Do not include any surrounding text, explanations, or markdown formatting like .

The JSON object must strictly adhere to the following structure:
{
  "questions": [
    {
      "text": "The full text of the question.",
      "options": [
        { "id": 1, "text": "Text for the first option." },
        { "id": 2, "text": "Text for the second option." },
        { "id": 3, "text": "Text for the third option." },
        { "id": 4, "text": "Text for the fourth option." }
      ],
      "correct_option_id": 3
    }
  ]
}

Ensure the 'correct_option_id' for each question correctly corresponds to the 'id' of one of its options.  `;


  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const responseStream = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  // accumulate streamed chunks
  let resultText = '';
  for await (const chunk of responseStream) {
    if (chunk?.text) {
      resultText += chunk.text;
      console.log(chunk.text);
    }
  }

  try {
    return JSON.parse(resultText);
  } catch {
    return resultText;
  }
}

export default main;
