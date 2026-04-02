'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [siteName,  setSiteName]  = useState('JESTV SPORTS');
  const [siteDesc,  setSiteDesc]  = useState('Kenya\'s home for football journalism.');
  const [twitter,   setTwitter]   = useState('@jestvsports');
  const [instagram, setInstagram] = useState('@jestvsports');
  const [facebook,  setFacebook]  = useState('jestvsports');
  const [adsense,   setAdsense]   = useState('ca-pub-');
  const [saved,     setSaved]     = useState(false);

  const handleSave = async () => {
    setSaved(false);
    await new Promise(r => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Field = ({ label, value, onChange, placeholder = '', type = 'text' }: {
    label: string; value: string; onChange: (v: string) => void;
    placeholder?: string; type?: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
    </div>
  );

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure platform-wide settings</p>
        </div>
        <button onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-accent transition-colors text-sm">
          <Save size={15}/>{saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-8">
        {/* Site identity */}
        <section className="space-y-4">
          <h2 className="font-bold text-foreground border-b border-border pb-2">Site Identity</h2>
          <Field label="Site Name"        value={siteName} onChange={setSiteName} />
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Site Description</label>
            <textarea value={siteDesc} onChange={e => setSiteDesc(e.target.value)} rows={3}
              className="w-full px-4 py-2 border border-border rounded-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none" />
          </div>
        </section>

        {/* Social links */}
        <section className="space-y-4">
          <h2 className="font-bold text-foreground border-b border-border pb-2">Social Links</h2>
          <Field label="Twitter / X"  value={twitter}   onChange={setTwitter}   placeholder="@handle" />
          <Field label="Instagram"    value={instagram} onChange={setInstagram} placeholder="@handle" />
          <Field label="Facebook"     value={facebook}  onChange={setFacebook}  placeholder="page-name" />
        </section>

        {/* Monetization */}
        <section className="space-y-4">
          <h2 className="font-bold text-foreground border-b border-border pb-2">Monetization</h2>
          <Field label="Google AdSense Publisher ID" value={adsense} onChange={setAdsense} placeholder="ca-pub-XXXXXXXXXXXXXXXX" />
          <p className="text-xs text-muted-foreground">
            AdSense script is injected automatically once you save a valid Publisher ID.
          </p>
        </section>

        {/* Danger zone */}
        <section className="space-y-4">
          <h2 className="font-bold text-red-600 border-b border-red-200 pb-2">Danger Zone</h2>
          <div className="border border-red-200 rounded-sm p-4 flex items-center justify-between bg-red-50/40">
            <div>
              <p className="font-medium text-foreground text-sm">Clear all article view data</p>
              <p className="text-xs text-muted-foreground mt-0.5">This will permanently delete all analytics records.</p>
            </div>
            <button className="px-4 py-2 border border-red-300 text-red-700 rounded-sm text-sm font-medium hover:bg-red-100 transition-colors">
              Clear Data
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
