import React from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, Check, Copy, Download, RefreshCw, HelpCircle, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ToolWrapper({ 
  tool, 
  onBack, 
  children,
  onCopy,
  onDownload,
  onClear,
  onLoadSample
}) {
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#818cf8', '#c084fc', '#38bdf8']
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleCopy = () => {
    if (onCopy) {
      onCopy();
      triggerConfetti();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fadeIn">
      
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button 
            onClick={onBack}
            className="flex items-center gap-1 hover:text-indigo-400 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Tools</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-500">{tool.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-white font-semibold">{tool.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Browser Local
          </span>
        </div>
      </div>

      {/* Tool Hero Info Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
              {tool.name}
            </h1>
            {tool.badge && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {tool.badge}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {tool.seoDescription}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2 shrink-0">
          {onLoadSample && (
            <button
              onClick={onLoadSample}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Load Sample</span>
            </button>
          )}

          {onClear && (
            <button
              onClick={onClear}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}

          {onCopy && (
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Output</span>
            </button>
          )}

          {onDownload && (
            <button
              onClick={onDownload}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          )}
        </div>
      </div>

      {/* Tool Main Interactive Area */}
      <div className="space-y-6">
        {children}
      </div>

      {/* SEO How-To & FAQ Section for Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8 border-t border-slate-800/80">
        
        {/* Step-by-Step Guide */}
        {tool.howTo && (
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" /> How to use {tool.name}
            </h3>
            <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
              {tool.howTo.map((step, idx) => (
                <li key={idx} className="pl-1">
                  <span className="font-medium text-slate-200">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Tool Specific FAQs */}
        {tool.faq && (
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-400" /> Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {tool.faq.map((item, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <h4 className="font-semibold text-indigo-300">Q: {item.q}</h4>
                  <p className="text-slate-400 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
