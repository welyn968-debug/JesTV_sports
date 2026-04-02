'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const initialCategories = [
  { id: 1, name: 'Match Reports', slug: 'match-reports', color: '#E8000D', articles: 12 },
  { id: 2, name: 'Transfers',     slug: 'transfers',     color: '#FF6B00', articles: 8  },
  { id: 3, name: 'Opinion',       slug: 'opinion',       color: '#7B2FBE', articles: 6  },
  { id: 4, name: 'Interviews',    slug: 'interviews',    color: '#0066CC', articles: 5  },
  { id: 5, name: 'Fixtures',      slug: 'fixtures',      color: '#00875A', articles: 3  },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [newName, setNewName]       = useState('');
  const [newColor, setNewColor]     = useState('#334155');
  const [adding, setAdding]         = useState(false);

  const add = () => {
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().replace(/\s+/g, '-');
    setCategories(prev => [...prev, { id: Date.now(), name: newName.trim(), slug, color: newColor, articles: 0 }]);
    setNewName(''); setNewColor('#334155'); setAdding(false);
  };

  const remove = (id: number) => setCategories(prev => prev.filter(c => c.id !== id));

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-1">Manage editorial categories</p>
        </div>
        <button onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-accent transition-colors text-sm">
          <Plus size={15} /> New Category
        </button>
      </div>

      {/* New category form */}
      {adding && (
        <div className="bg-card border border-border rounded-sm p-5 mb-6 space-y-3">
          <h3 className="font-semibold text-foreground text-sm">Add Category</h3>
          <div className="flex gap-3">
            <input value={newName} onChange={e => setNewName(e.target.value)}
              placeholder="Category name" autoFocus
              className="flex-1 px-4 py-2 border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
            <input type="color" value={newColor} onChange={e => setNewColor(e.target.value)}
              title="Badge colour"
              className="w-10 h-9 border border-border rounded-sm cursor-pointer bg-background" />
          </div>
          <div className="flex gap-2">
            <button onClick={add}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-sm text-sm font-medium hover:bg-accent transition-colors">
              Add
            </button>
            <button onClick={() => setAdding(false)}
              className="px-4 py-2 border border-border rounded-sm text-sm font-medium text-foreground hover:bg-muted transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-card border border-border rounded-sm overflow-hidden">
        {categories.map((c, i) => (
          <div key={c.id} className={`flex items-center gap-4 px-5 py-4 ${i < categories.length - 1 ? 'border-b border-border' : ''}`}>
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: c.color }} />
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm">{c.name}</p>
              <p className="text-xs text-muted-foreground">/{c.slug} · {c.articles} articles</p>
            </div>
            <span className="text-xs font-bold text-white px-2 py-0.5 rounded" style={{ background: c.color }}>{c.name}</span>
            <div className="flex gap-1.5">
              <button className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded transition-colors"><Edit2 size={12}/></button>
              <button onClick={() => remove(c.id)} className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors"><Trash2 size={12}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
