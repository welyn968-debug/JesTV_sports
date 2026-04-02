import { createServerSupabaseClient } from '@/lib/supabase-server';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { articleId } = await request.json();

    if (!articleId) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // Get current user if authenticated
    const { data: { user } } = await supabase.auth.getUser();

    // Get client IP from headers
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const { data, error } = await supabase
      .from('article_views')
      .insert({
        article_id: articleId,
        user_id: user?.id || null,
        ip_address: ip,
      })
      .select()
      .single();

    if (error) {
      // Log the error but don't fail the request - view tracking is secondary
      console.error('View tracking error:', error);
    }

    return NextResponse.json(
      { message: 'View recorded' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Views API error:', error);
    // Don't fail the request - this is just analytics
    return NextResponse.json(
      { message: 'View recorded' },
      { status: 201 }
    );
  }
}
