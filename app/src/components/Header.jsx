import React, { useState, useEffect } from 'react';
import { Sparkles, Search, ShieldCheck, Globe, Menu, X, ArrowRight, Zap, Code2 } from 'lucide-react';

export default function Header({ activeToolId, onSelectTool, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Cmd/Ctrl + K to open search modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-indigo-950/20 py-3' 
        : 'bg-transparent py-5 border-b border-slate-800/40'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onSelectTool(null)}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 group-hover:text-purple-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-mono">
                  ALL YOU <span className="text-gradient">WANT</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" /> 100% Private
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden md:block">
                Free Web & Developer Utilities
              </p>
            </div>
          </div>

          {/* Quick Search Bar */}
          <button 
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 text-slate-400 hover:text-slate-200 transition-all text-xs font-medium w-64 lg:w-80 shadow-inner group"
          >
            <Search className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="flex-1 text-left">Search 5+ tools & utilities...</span>
            <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-400 font-mono">⌘K</kbd>
          </button>

          {/* Navigation Items */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => onSelectTool(null)}
              className={`text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${
                activeToolId === null 
                  ? 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/20' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              Home Hub
            </button>

            <button 
              onClick={() => onSelectTool('json-yaml')}
              className={`text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${
                activeToolId === 'json-yaml' 
                  ? 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/20' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              JSON ⇆ YAML
            </button>

            <button 
              onClick={() => onSelectTool('jwt')}
              className={`text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${
                activeToolId === 'jwt' 
                  ? 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/20' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              JWT Decoder
            </button>

            <button 
              onClick={() => onSelectTool('glassmorphism')}
              className={`text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${
                activeToolId === 'glassmorphism' 
                  ? 'text-purple-400 bg-purple-500/10 border border-purple-500/20' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              CSS Glass Tool
            </button>

            <div className="h-4 w-px bg-slate-800 my-auto" />

            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
              title="View Source"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button 
              onClick={onOpenSearch}
              className="p-2 text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:text-white"
            >
              <Search className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-slate-800 flex flex-col gap-2 pb-2">
            <button 
              onClick={() => { onSelectTool(null); setMobileMenuOpen(false); }}
              className="text-left text-sm font-medium text-slate-200 p-2 rounded-lg hover:bg-slate-900"
            >
              All Tools & Homepage
            </button>
            <button 
              onClick={() => { onSelectTool('json-yaml'); setMobileMenuOpen(false); }}
              className="text-left text-sm font-medium text-indigo-400 p-2 rounded-lg hover:bg-slate-900"
            >
              JSON ⇆ YAML Converter
            </button>
            <button 
              onClick={() => { onSelectTool('xml-json'); setMobileMenuOpen(false); }}
              className="text-left text-sm font-medium text-indigo-400 p-2 rounded-lg hover:bg-slate-900"
            >
              XML ⇆ JSON Converter
            </button>
            <button 
              onClick={() => { onSelectTool('base64'); setMobileMenuOpen(false); }}
              className="text-left text-sm font-medium text-indigo-400 p-2 rounded-lg hover:bg-slate-900"
            >
              Base64 Encoder & Decoder
            </button>
            <button 
              onClick={() => { onSelectTool('jwt'); setMobileMenuOpen(false); }}
              className="text-left text-sm font-medium text-purple-400 p-2 rounded-lg hover:bg-slate-900"
            >
              JWT Debugger & Inspector
            </button>
            <button 
              onClick={() => { onSelectTool('glassmorphism'); setMobileMenuOpen(false); }}
              className="text-left text-sm font-medium text-pink-400 p-2 rounded-lg hover:bg-slate-900"
            >
              CSS Glassmorphism & Gradient Generator
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
