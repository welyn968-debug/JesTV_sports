'use client';

import { useState } from 'react';
import { Eye, EyeOff, Trash2 } from 'lucide-react';

const initialComments = [
  { id: 1, author: 'Peter Kamau',  email: 'peter@gmail.com',  body: 'Great match analysis! Gor Mahia was absolutely dominant.',                article: 'Gor Mahia Clinch Title…',   time: '1h ago',  hidden: false },
  { id: 2, author: 'Sarah Njoki',  email: 'sarah@gmail.com',  body: 'The Wanyama return is huge for Kenyan football. Well written!',          article: 'Victor Wanyama Returns…',   time: '3h ago',  hidden: false },
  { id: 3, author: 'Denis Otieno', email: 'denis@gmail.com',  body: 'I agree with most points but think the midfield was underrated here.',   article: 'Gor Mahia Clinch Title…',   time: '5h ago',  hidden: false },
  { id: 4, author: 'Anonymous',    email: 'anon@mail.com',    body: 'This is completely wrong and misleading journalism.',                    article: 'Why Kenya Will Qualify…',   time: '6h ago',  hidden: true  },
  { id: 5, author: 'Mary Wangari', email: 'mary@gmail.com',   body: 'Excellent breakdown of the pressing tactics. Really informative!',       article: 'PL GW29: Full Results…',    time: '1d ago',  hidden: false },
];

export default function AdminCommentsPage() {
  const [comments, setComments] = useState(initialComments);
  const [filter, setFilter]     = useState<'all'|'visible'|'hidden'>('all');

  const toggleHide = (id: number) =>
    setComments(prev => prev.map(c => c.id === id ? { ...c, hidden: !c.hidden } : c));

  const remove = (id: number) =>
    setComments(prev => prev.filter(c => c.id !== id));

  const shown = comments.filter(c =>
    filter === 'all' ? true : filter === 'hidden' ? c.hidden : !c.hidden
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Comments</h1>
        <p className="text-muted-foreground mt-1">Moderate all platform comments</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {(['all', 'visible', 'hidden'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-5 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${filter === f ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
            {f} ({f === 'all' ? comments.length : f === 'hidden' ? comments.filter(c => c.hidden).length : comments.filter(c => !c.hidden).length})
          </button>
        ))}
      </div>

      {/* Comments */}
      <div className="space-y-3">
        {shown.map(c => (
          <div key={c.id} className={`bg-card border rounded-sm p-5 flex gap-4 transition-all ${c.hidden ? 'opacity-50 border-dashed border-border' : 'border-border'}`}>
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-sm flex-shrink-0">
              {c.author[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <span className="font-semibold text-foreground text-sm">{c.author}</span>
                <span className="text-xs text-muted-foreground">{c.email}</span>
                <span className="text-xs text-muted-foreground">on <span className="text-primary">{c.article}</span></span>
                <span className="text-xs text-muted-foreground ml-auto">{c.time}</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{c.body}</p>
              {c.hidden && <span className="text-xs font-medium text-red-600 mt-1 block">⚠ Hidden from public</span>}
            </div>
            <div className="flex items-start gap-2 flex-shrink-0">
              <button onClick={() => toggleHide(c.id)} title={c.hidden ? 'Show' : 'Hide'}
                className={`p-2 rounded-sm transition-colors ${c.hidden ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}>
                {c.hidden ? <Eye size={14}/> : <EyeOff size={14}/>}
              </button>
              <button onClick={() => remove(c.id)} title="Delete"
                className="p-2 rounded-sm bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
                <Trash2 size={14}/>
              </button>
            </div>
          </div>
        ))}
        {shown.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No {filter} comments found.</div>
        )}
      </div>
    </div>
  );
}
