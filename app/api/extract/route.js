import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = '';

    if (fileName.endsWith('.pdf')) {
      const pdfParse = (await import('pdf-parse')).default;
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text;
    } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      const mammoth = await import('mammoth');
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } else if (fileName.endsWith('.txt')) {
      extractedText = buffer.toString('utf-8');
    } else {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload PDF, DOCX, or TXT files.' },
        { status: 400 }
      );
    }

    // Trim to a reasonable length for the AI prompt
    const maxChars = 15000;
    const trimmedText = extractedText.length > maxChars
      ? extractedText.substring(0, maxChars) + '\n\n[...content truncated for analysis]'
      : extractedText;

    return NextResponse.json({
      text: trimmedText,
      fileName: file.name,
      fileSize: file.size,
      charCount: extractedText.length,
      truncated: extractedText.length > maxChars,
    });
  } catch (error) {
    console.error('File extraction error:', error);
    return NextResponse.json(
      { error: 'Failed to extract text from file: ' + error.message },
      { status: 500 }
    );
  }
}
