import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, Zap, Lock, Code2, Cpu, 
  FileJson, FileCode2, Binary, KeyRound, CheckCircle2, ChevronDown, ChevronUp, Search, Layers, Flame,
  FileText, Image, QrCode, Database, Maximize2, Shield, Bell, Check
} from 'lucide-react';
import { TOOLS_LIST, CATEGORIES } from '../data/toolsData';

export default function HomepageHero({ onSelectTool }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [requestText, setRequestText] = useState('');
  const [requestSuccess, setRequestSuccess] = useState(false);

  const filteredTools = TOOLS_LIST.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeToolsCount = TOOLS_LIST.filter(t => t.status === 'active').length;

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!requestText.trim()) return;
    setRequestSuccess(true);
    setRequestText('');
    setTimeout(() => setRequestSuccess(false), 4000);
  };

  const popularKeywords = [
    { name: 'JSON to YAML', target: 'json-yaml', badge: 'Active' },
    { name: 'XML to JSON', target: 'xml-json', badge: 'Active' },
    { name: 'Base64 Encoder', target: 'base64', badge: 'Active' },
    { name: 'JWT Debugger', target: 'jwt', badge: 'Active' },
    { name: 'CSS Glassmorphism', target: 'glassmorphism', badge: 'Active' },
    { name: 'PDF to Word', target: 'pdf-to-word', badge: 'Popular Search' },
    { name: 'Merge PDF', target: 'pdf-merge-split', badge: 'Popular Search' },
    { name: 'WebP to PNG', target: 'webp-to-png', badge: 'Popular Search' },
    { name: 'SHA256 Hash', target: 'hash-generator', badge: 'Popular Search' },
    { name: 'QR Code Maker', target: 'qr-code-generator', badge: 'Popular Search' },
    { name: 'CSV to JSON', target: 'csv-to-json', badge: 'Popular Search' }
  ];

  const faqs = [
    {
      q: 'What is All You Want?',
      a: 'All You Want is a comprehensive, privacy-first web utility hub providing fast browser tools like PDF to Word, JSON to YAML, XML to JSON, Base64 converter, JWT token inspector, and CSS Glassmorphism generator.'
    },
    {
      q: 'Why are these tools better than other online converters?',
      a: 'Unlike traditional websites that upload your files to server databases or spam you with popup ads, All You Want processes everything 100% inside your browser using Web APIs. Zero latency and zero server data retention.'
    },
    {
      q: 'Which tools are live right now?',
      a: 'Currently, JSON ⇆ YAML, XML ⇆ JSON, Base64 Encoder/Decoder, JWT Debugger, and CSS Glassmorphism & Gradient Generator are fully functional. PDF to Word, WebP to PNG, QR Code Generator, and Hash utilities are added in upcoming builds.'
    },
    {
      q: 'Are all utilities completely free?',
      a: 'Yes, 100% free with no sign-ups, no subscriptions, and unlimited daily usage.'
    }
  ];

  return (
    <div className="space-y-20 pb-12">
      
      {/* HERO BANNER SECTION */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        {/* Neon Ambient Light Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 sm:w-[650px] h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-32 left-1/4 w-72 h-72 bg-cyan-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto text-center px-4 space-y-8">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-sm animate-float">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>All You Want — Free Web & Developer Utilities Directory</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Main H1 Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Every Tool You Need. <br className="hidden sm:block" />
            <span className="text-gradient">PDF to Word, JSON, JWT & UI Tools.</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-4xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            All You Want is your all-in-one web utility directory. Convert <strong className="text-white">PDF to Word</strong>, <strong className="text-white">JSON to YAML</strong>, <strong className="text-white">XML to JSON</strong>, decode <strong className="text-white">JWT Tokens</strong>, encode <strong className="text-white">Base64</strong>, and generate <strong className="text-white">CSS Glassmorphism UI</strong> in seconds—100% free with zero server uploads.
          </p>

          {/* Popular Keywords Matrix Bar */}
          <div className="pt-4 max-w-4xl mx-auto">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono mb-3">
              🔥 Popular Developer Tools & Utilities Matrix:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {popularKeywords.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    const tool = TOOLS_LIST.find(t => t.id === item.target);
                    if (tool && tool.status === 'active') {
                      onSelectTool(item.target);
                    } else {
                      setSearchQuery(item.name);
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                    item.badge === 'Active'
                      ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/20'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                    item.badge === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {item.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-medium text-slate-400">
            <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 shadow-inner">
              <Flame className="w-4 h-4 text-indigo-400" />
              <span><strong>{activeToolsCount} Active Live Tools</strong> + 15 Directory Tools</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 shadow-inner">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% In-Browser Privacy</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 shadow-inner">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Zero Latency Processing</span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="pt-6 max-w-3xl mx-auto space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools catalog by keyword (e.g. pdf to word, json, xml, base64, jwt, webp, css)..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-xl"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FULL TOOLS CATALOGUE GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 font-mono">
              <Layers className="w-5 h-5 text-indigo-400" />
              Web Utilities Directory ({filteredTools.length})
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Browse our complete list of client-side web utility converters, document tools, and UI builders.
            </p>
          </div>
          <span className="text-xs text-indigo-400 font-semibold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Phase 1 Active Launch
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const isActive = tool.status === 'active';

            return (
              <div 
                key={tool.id}
                onClick={() => isActive && onSelectTool(tool.id)}
                className={`relative group rounded-2xl glass-panel p-6 flex flex-col justify-between transition-all duration-300 border ${
                  isActive 
                    ? 'border-slate-800 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-950/40 cursor-pointer hover:-translate-y-1' 
                    : 'border-slate-900/80 opacity-75 bg-slate-950/40'
                }`}
              >
                {/* Card Glow Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl border transition-transform group-hover:scale-110 ${
                      isActive 
                        ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20 text-indigo-400' 
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}>
                      <Sparkles className="w-5 h-5" />
                    </div>
                    {tool.badge && (
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                      }`}>
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {tool.name}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  {/* Keywords pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {tool.keywords.slice(0, 3).map((kw, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500 font-mono">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {tool.category}
                  </span>

                  {isActive ? (
                    <button className="flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                      <span>Launch Tool</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <span className="text-[11px] text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      Planned Next
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE TOOL REQUEST BOX */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Bell className="w-4 h-4" /> Request a Web Utility Tool
            </span>
            <h3 className="text-xl font-bold text-white">Can't find the converter or tool you need?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We add new client-side utilities every week! Submit your request and our developer engine will prioritize it.
            </p>
          </div>

          <form onSubmit={handleRequestSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="text"
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              placeholder="e.g. PDF to Excel, EPUB to PDF..."
              className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-full sm:w-64"
            />
            <button 
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30 whitespace-nowrap"
            >
              Submit Request
            </button>
          </form>
        </div>

        {requestSuccess && (
          <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs text-center flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> Thank you! Your requested tool has been added to our development queue.
          </div>
        )}
      </section>

      {/* HIGH SEO INFORMATION ARTICLE & FAQS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Knowledge Base Header */}
        <div className="glass-panel rounded-2xl p-8 space-y-6 border border-slate-800">
          <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Layers className="w-4 h-4" /> Developer Knowledge Base
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Why All You Want is the Ultimate Web Utility Hub
          </h2>
          <div className="text-sm text-slate-300 leading-relaxed space-y-4 font-normal">
            <p>
              Users searching for essential utilities like <strong className="text-white">PDF to Word</strong>, <strong className="text-white">JSON to YAML</strong>, <strong className="text-white">XML to JSON</strong>, <strong className="text-white">JWT Decoders</strong>, and <strong className="text-white">Base64 converters</strong> deserve a platform that guarantees absolute data privacy, instantaneous response, and zero intrusive ads.
            </p>
            <p>
              <strong className="text-indigo-400">All You Want</strong> brings together every essential developer, document, and designer tool into one unified client-side application:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% In-Browser Privacy & Zero Data Retention</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant High-Fidelity Converters & Parsers</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Command Palette Search (⌘K / Ctrl+K)</span>
              </li>
              <li className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fast React 19 + Tailwind CSS Architecture</span>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white font-mono">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400">Everything you need to know about All You Want web utilities.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="glass-panel rounded-xl border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors"
                  >
                    <span className="text-sm font-semibold text-white">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </section>

    </div>
  );
}
