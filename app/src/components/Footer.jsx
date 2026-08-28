import React from 'react';
import { Sparkles, ShieldCheck, Heart, Code2, Cpu, Zap, Lock } from 'lucide-react';
import { TOOLS_LIST } from '../data/toolsData';

export default function Footer({ onSelectTool }) {
  const activeTools = TOOLS_LIST.filter(t => t.status === 'active');

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950 text-slate-400 py-16 relative overflow-hidden">
      {/* Background Accent Light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-600/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onSelectTool(null)}>
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span className="font-extrabold text-lg text-white font-mono tracking-tight">
                ALL YOU <span className="text-gradient">WANT</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Browser-based web utility hub. Privacy-first, zero server uploads, 100% free developer tools.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 w-fit font-medium">
              <Lock className="w-3.5 h-3.5" /> Client-Side Processing Only
            </div>
          </div>

          {/* Quick Active Tools Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              Active Utility Tools
            </h4>
            <ul className="space-y-2 text-xs">
              {activeTools.map((tool) => (
                <li key={tool.id}>
                  <button 
                    onClick={() => onSelectTool(tool.id)}
                    className="hover:text-indigo-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>{tool.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Targeted Utility Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              Popular Utility Tools
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">JSON to YAML</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">YAML to JSON</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">XML to JSON</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">JWT Decoder</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">Base64 Encoder</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">Glassmorphism</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">CSS Gradient</span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">Online Utility</span>
            </div>
          </div>

          {/* Architecture & Performance Guarantee */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              Performance & Privacy
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every operation runs locally inside Web Workers and standard JavaScript standard APIs. No backend database logging or third-party data tracking.
            </p>
            <div className="flex items-center gap-3 text-slate-400 text-xs pt-1">
              <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-indigo-400" /> React 19</span>
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-yellow-400" /> Vite 6</span>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} All You Want. Built for developers, designers, & creators.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">100% Client-Side SPA</span>
            <span>•</span>
            <span className="text-slate-400">Zero Analytics Logging</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
