import { createServerSupabaseClient } from '@/lib/supabase-server';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { article_slug, category_slug, author_sanity_id } = await request.json();

    if (!article_slug) {
      return NextResponse.json(
        { error: 'Article slug is required' },
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
        article_slug,
        category_slug: category_slug || null,
        author_sanity_id: author_sanity_id || null,
        user_id: user?.id || null,
        ip_address: ip,
      })
      .select()
      .single();

    if (error) {
      // Log the error but don't fail the request - view tracking is secondary
      console.error('View tracking error:', error);
    }

    return NextResponse.json({ recorded: true }, { status: 201 });
  } catch (error) {
    console.error('Views API error:', error);
    // Don't fail the request - this is just analytics
    return NextResponse.json({ recorded: true }, { status: 201 });
  }
}
