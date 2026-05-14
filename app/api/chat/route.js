import { getConsultantReply } from '@/services/chat';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { message, context, persona } = await req.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const reply = await getConsultantReply(message, context, persona);
    
    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
