import { createServerSupabaseClient } from '@/lib/supabase-server';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { articleId, content, guestName, guestEmail } = await request.json();

    if (!articleId || !content) {
      return NextResponse.json(
        { error: 'Article ID and content are required' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // Get current user if authenticated
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('comments')
      .insert({
        article_id: articleId,
        user_id: user?.id || null,
        guest_name: guestName || null,
        guest_email: guestEmail || null,
        content,
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
    const articleId = request.nextUrl.searchParams.get('articleId');

    if (!articleId) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('article_id', articleId)
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
