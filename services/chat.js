import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getConsultantReply = async (message, context) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a Senior Startup Consultant. You are discussing a specific startup evaluation with a founder.
          
          CONTEXT OF EVALUATION:
          ${JSON.stringify(context || {})}
          
          Your goal is to provide deep, actionable advice based on this context. Be professional, direct, and helpful.`
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Chat API Error:', error);
    if (!process.env.OPENAI_API_KEY) {
      return "I'm in Demo Mode, but if I were connected to OpenAI, I would give you tailored advice about your startup idea!";
    }
    throw new Error('Consultant is currently unavailable.');
  }
};
