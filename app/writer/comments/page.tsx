'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const initComments = [
  { id: 1, author: 'Peter Kamau',  body: 'Great match analysis! Gor Mahia was absolutely dominant.', article: 'Gor Mahia Clinch Title…', time: '1h ago',  hidden: false },
  { id: 2, author: 'Sarah Njoki',  body: 'The Wanyama return is huge for Kenyan football.',           article: 'AFC Leopards Press…',    time: '3h ago',  hidden: false },
  { id: 3, author: 'Denis Otieno', body: 'I think the midfield contribution was underrated here.',    article: 'Gor Mahia Clinch Title…', time: '5h ago',  hidden: false },
  { id: 4, author: 'Mark Too',     body: 'Disagree entirely — tactics were poor in the second half.', article: 'Gor Mahia Clinch Title…', time: '8h ago',  hidden: true  },
];

export default function WriterCommentsPage() {
  const [comments, setComments] = useState(initComments);

  const toggle = (id: number) =>
    setComments(prev => prev.map(c => c.id === id ? { ...c, hidden: !c.hidden } : c));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Comments</h1>
        <p className="text-muted-foreground mt-1">Moderate comments on your articles</p>
      </div>

      <div className="space-y-3">
        {comments.map(c => (
          <div key={c.id}
            className={`bg-card border rounded-sm p-5 flex gap-4 transition-all ${c.hidden ? 'opacity-50 border-dashed' : ''} border-border`}>
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-sm flex-shrink-0">
              {c.author[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <span className="font-semibold text-foreground text-sm">{c.author}</span>
                <span className="text-xs text-muted-foreground">on <span className="text-primary">{c.article}</span></span>
                <span className="text-xs text-muted-foreground ml-auto">{c.time}</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{c.body}</p>
              {c.hidden && <span className="text-xs font-medium text-red-600 mt-1 block">Hidden from public</span>}
            </div>
            <button onClick={() => toggle(c.id)} title={c.hidden ? 'Show comment' : 'Hide comment'}
              className={`p-2 rounded-sm flex-shrink-0 transition-colors self-start ${c.hidden ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}>
              {c.hidden ? <Eye size={14}/> : <EyeOff size={14}/>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
