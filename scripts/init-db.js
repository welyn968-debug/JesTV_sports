import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function initDatabase() {
  try {
    console.log('Creating profiles table...');
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          email TEXT UNIQUE NOT NULL,
          username TEXT UNIQUE,
          role TEXT CHECK (role IN ('reader', 'writer', 'admin')) DEFAULT 'reader',
          full_name TEXT,
          bio TEXT,
          avatar_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });
    if (profilesError) console.error('Profiles error:', profilesError);
    else console.log('✓ Profiles table created');

    console.log('Creating articles table...');
    const { error: articlesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS articles (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
          title TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          excerpt TEXT,
          content JSONB NOT NULL,
          status TEXT CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
          featured_image_url TEXT,
          category TEXT,
          published_at TIMESTAMP WITH TIME ZONE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });
    if (articlesError) console.error('Articles error:', articlesError);
    else console.log('✓ Articles table created');

    console.log('Creating comments table...');
    const { error: commentsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS comments (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
          user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
          content TEXT NOT NULL,
          status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });
    if (commentsError) console.error('Comments error:', commentsError);
    else console.log('✓ Comments table created');

    console.log('Creating article_views table...');
    const { error: viewsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS article_views (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
          user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
          viewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });
    if (viewsError) console.error('Views error:', viewsError);
    else console.log('✓ Article views table created');

    console.log('Creating subscribers table...');
    const { error: subscribersError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS subscribers (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT UNIQUE NOT NULL,
          user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
          subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });
    if (subscribersError) console.error('Subscribers error:', subscribersError);
    else console.log('✓ Subscribers table created');

    console.log('Creating writer_invites table...');
    const { error: invitesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS writer_invites (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT NOT NULL,
          inviter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
          status TEXT CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });
    if (invitesError) console.error('Invites error:', invitesError);
    else console.log('✓ Writer invites table created');

    console.log('\n✓ Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();
