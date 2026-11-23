import { NextRequest, NextResponse } from 'next/server';

const WHATSAPP_NUMBER = '916290969079';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { number, numberTitle, name, phone, circle } = body;

    const circleStr = circle ? ` Circle: ${circle}.` : '';
    const text = encodeURIComponent(
      `Hello VIP Numbers, my name is ${name || 'VIP Client'}. I am enquiring about VIP Mobile Number: ${number} (${numberTitle || 'VIP'}).${circleStr} Phone: ${phone || ''}. Please share the booking details.`
    );
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    return NextResponse.json({
      success: true,
      message: 'Enquiry received! VIP Director will connect within 15 minutes.',
      whatsappUrl,
      enquiry: {
        number,
        name,
        phone,
        circle,
        createdAt: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid enquiry payload' },
      { status: 400 }
    );
  }
}
