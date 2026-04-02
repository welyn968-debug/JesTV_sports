import { createServerSupabaseClient } from '@/lib/supabase-server';
import { NextResponse, NextRequest } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();
    const confirmationToken = crypto.randomBytes(32).toString('hex');

    const { data, error } = await supabase
      .from('subscribers')
      .insert({
        email,
        confirmation_token: confirmationToken,
        is_confirmed: false,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { message: 'Email already subscribed' },
          { status: 200 }
        );
      }
      throw error;
    }

    // TODO: Send confirmation email via Resend
    console.log(`[TODO] Send confirmation email to ${email} with token: ${confirmationToken}`);

    return NextResponse.json(
      { message: 'Subscription created. Check your email to confirm.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
