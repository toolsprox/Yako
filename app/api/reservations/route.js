import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.date || !data.time || !data.guests || !data.name || !data.phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data: result, error } = await supabase
      .from('reservations')
      .insert([
        {
          date: data.date,
          time: data.time,
          guests: parseInt(data.guests.replace('+', '')), // Handle "9+" gracefully
          customer_name: data.name,
          customer_phone: data.phone,
          status: 'pending'
        }
      ]);

    if (error) {
      console.error('Supabase Insert Error:', error);
      return NextResponse.json(
        { error: 'Failed to submit reservation' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
