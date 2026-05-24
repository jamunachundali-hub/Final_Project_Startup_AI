import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build-purposes',
});

export const getConsultantReply = async (message, context, persona = 'advisor') => {
  const personaPrompts = {
    advisor: "You are a Senior VC Advisor. Focus on business scalability, market size, and investment risk.",
    architect: "You are a Tech Lead & Architect. Focus on technical feasibility, stack choices, and product roadmap.",
    hacker: "You are a Growth Hacker. Focus on viral loops, user acquisition, and low-cost marketing strategies."
  };

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `${personaPrompts[persona] || personaPrompts.advisor} You are discussing a specific startup evaluation with a founder.
          
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
