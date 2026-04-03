import { createServerSupabaseClient } from '@/lib/supabase-server';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { article_slug, body, guest_name, guest_email, parent_id } = await request.json();

    if (!article_slug || !body) {
      return NextResponse.json(
        { error: 'Article slug and body are required' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // Get current user if authenticated
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('comments')
      .insert({
        article_slug,
        parent_id: parent_id || null,
        user_id: user?.id || null,
        guest_name: guest_name || null,
        guest_email: guest_email || null,
        body,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Comment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const articleSlug = request.nextUrl.searchParams.get('article_slug');

    if (!articleSlug) {
      return NextResponse.json(
        { error: 'Article slug is required' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('article_slug', articleSlug)
      .eq('is_hidden', false)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Comment fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}
