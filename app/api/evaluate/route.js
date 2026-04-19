import { evaluateStartup } from '@/services/openai';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json();
    
    if (!data.idea) {
      return NextResponse.json({ error: 'Idea is required' }, { status: 400 });
    }

    const evaluation = await evaluateStartup(data);
    
    return NextResponse.json(evaluation);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
