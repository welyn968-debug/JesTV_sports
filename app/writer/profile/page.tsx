'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export default function WriterProfilePage() {
  const [name,      setName]      = useState('James Ochieng');
  const [bio,       setBio]       = useState('Sports journalist covering KPL and international football.');
  const [twitter,   setTwitter]   = useState('@jamesochieng');
  const [instagram, setInstagram] = useState('@jamesochieng_sports');
  const [saved,     setSaved]     = useState(false);

  const handleSave = async () => {
    setSaved(false);
    await new Promise(r => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-1">Update your public author profile</p>
        </div>
        <button onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-accent transition-colors text-sm">
          <Save size={15} />{saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl">
            JO
          </div>
          <div>
            <button className="px-4 py-2 border border-border rounded-sm text-sm font-medium text-foreground hover:bg-muted transition-colors">
              Upload Photo
            </button>
            <p className="text-xs text-muted-foreground mt-1">JPG or PNG, max 2MB</p>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
          <input value={name} onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
          <textarea value={bio} onChange={e => setBio(e.target.value)} rows={4}
            className="w-full px-4 py-2 border border-border rounded-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          <p className="text-xs text-muted-foreground mt-1">{bio.length}/300 characters</p>
        </div>

        {/* Social links */}
        <div className="border border-border rounded-sm p-6 space-y-4 bg-muted/20">
          <h3 className="font-semibold text-foreground">Social Links</h3>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Twitter / X</label>
            <input value={twitter} onChange={e => setTwitter(e.target.value)}
              placeholder="@handle"
              className="w-full px-4 py-2 border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Instagram</label>
            <input value={instagram} onChange={e => setInstagram(e.target.value)}
              placeholder="@handle"
              className="w-full px-4 py-2 border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
