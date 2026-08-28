import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, ArrowRight, Shield, Zap, FileJson, FileCode2, Binary, KeyRound } from 'lucide-react';
import { TOOLS_LIST } from '../data/toolsData';

export default function SearchModal({ isOpen, onClose, onSelectTool }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredTools = TOOLS_LIST.filter(tool => {
    const q = query.toLowerCase();
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.keywords.some(k => k.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools (e.g. JSON to YAML, JWT, Base64, Glassmorphism)..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-500 hover:text-slate-300 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-400 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-2 divide-y divide-slate-800/40">
          {filteredTools.length === 0 ? (
            <div className="text-center py-10 text-slate-400 space-y-2">
              <p className="text-sm">No tools found matching "{query}"</p>
              <p className="text-xs text-slate-400">Try searching "JSON", "JWT", "XML", or "Base64"</p>
            </div>
          ) : (
            filteredTools.map((tool) => (
              <div 
                key={tool.id}
                onClick={() => {
                  if (tool.status === 'active') {
                    onSelectTool(tool.id);
                    onClose();
                  }
                }}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  tool.status === 'active' 
                    ? 'hover:bg-slate-800/80 cursor-pointer group' 
                    : 'opacity-50 cursor-not-allowed bg-slate-950/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-105 transition-transform mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {tool.name}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {tool.category}
                      </span>
                      {tool.badge && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                          tool.status === 'active' 
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                            : 'bg-slate-800 text-slate-500'
                        }`}>
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {tool.description}
                    </p>
                  </div>
                </div>

                {tool.status === 'active' ? (
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                ) : (
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Soon</span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Quick Footer */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Tip: Navigate with keyboard shortcuts</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <Shield className="w-3 h-3" /> 100% Client Side
          </span>
        </div>

      </div>
    </div>
  );
}
