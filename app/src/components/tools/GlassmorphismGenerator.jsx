import React, { useState } from 'react';
import ToolWrapper from '../ToolWrapper';
import { Sparkles, Check, Copy, Sliders, Palette, Layout, RefreshCw } from 'lucide-react';

export default function GlassmorphismGenerator({ tool, onBack }) {
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(40);
  const [borderOpacity, setBorderOpacity] = useState(20);
  const [borderRadius, setBorderRadius] = useState(24);
  const [shadowDepth, setShadowDepth] = useState(25);
  const [bgPreset, setBgPreset] = useState('gradient1');
  const [toastMsg, setToastMsg] = useState('');

  // Background presets for testing glassmorphism transparency
  const bgPresets = {
    gradient1: 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600',
    gradient2: 'bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-900',
    gradient3: 'bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-700',
    mesh: 'bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'
  };

  const cssSnippet = `/* Glassmorphism Card Style */
background: rgba(255, 255, 255, ${(opacity / 100).toFixed(2)});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border-radius: ${borderRadius}px;
border: 1px solid rgba(255, 255, 255, ${(borderOpacity / 100).toFixed(2)});
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, ${(shadowDepth / 100).toFixed(2)});`;

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleCopyCss = () => {
    navigator.clipboard.writeText(cssSnippet);
    showToast('CSS Glassmorphism snippet copied!');
  };

  const handleReset = () => {
    setBlur(16);
    setOpacity(40);
    setBorderOpacity(20);
    setBorderRadius(24);
    setShadowDepth(25);
    showToast('Reset controls to default');
  };

  return (
    <ToolWrapper
      tool={tool}
      onBack={onBack}
      onCopy={handleCopyCss}
      onClear={handleReset}
    >
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" /> {toastMsg}
        </div>
      )}

      {/* Main Grid: Left Controls, Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sliders & Controls */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" /> UI Controls
            </h3>
            <button 
              onClick={handleReset} 
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Backdrop Blur */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Backdrop Blur</span>
              <span className="font-mono text-indigo-400">{blur}px</span>
            </div>
            <input 
              type="range" min="0" max="40" value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Background Opacity */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Background Opacity</span>
              <span className="font-mono text-indigo-400">{opacity}%</span>
            </div>
            <input 
              type="range" min="0" max="100" value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Border Opacity */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Border Opacity</span>
              <span className="font-mono text-indigo-400">{borderOpacity}%</span>
            </div>
            <input 
              type="range" min="0" max="100" value={borderOpacity}
              onChange={(e) => setBorderOpacity(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Border Radius */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Border Radius</span>
              <span className="font-mono text-indigo-400">{borderRadius}px</span>
            </div>
            <input 
              type="range" min="0" max="40" value={borderRadius}
              onChange={(e) => setBorderRadius(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Shadow Depth */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Shadow Depth</span>
              <span className="font-mono text-indigo-400">{shadowDepth}%</span>
            </div>
            <input 
              type="range" min="0" max="60" value={shadowDepth}
              onChange={(e) => setShadowDepth(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Backdrop Test Presets */}
          <div className="pt-2 space-y-2 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-400 block">Preview Backdrop Canvas:</span>
            <div className="grid grid-cols-4 gap-2">
              <button 
                onClick={() => setBgPreset('gradient1')}
                className={`h-8 rounded-lg ${bgPresets.gradient1} border ${bgPreset === 'gradient1' ? 'border-white ring-2 ring-indigo-500' : 'border-transparent'}`}
              />
              <button 
                onClick={() => setBgPreset('gradient2')}
                className={`h-8 rounded-lg ${bgPresets.gradient2} border ${bgPreset === 'gradient2' ? 'border-white ring-2 ring-indigo-500' : 'border-transparent'}`}
              />
              <button 
                onClick={() => setBgPreset('gradient3')}
                className={`h-8 rounded-lg ${bgPresets.gradient3} border ${bgPreset === 'gradient3' ? 'border-white ring-2 ring-indigo-500' : 'border-transparent'}`}
              />
              <button 
                onClick={() => setBgPreset('mesh')}
                className={`h-8 rounded-lg ${bgPresets.mesh} border ${bgPreset === 'mesh' ? 'border-white ring-2 ring-indigo-500' : 'border-transparent'}`}
              />
            </div>
          </div>

        </div>

        {/* Live Canvas Preview & CSS Output */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Interactive Canvas Preview */}
          <div className={`w-full h-80 rounded-2xl ${bgPresets[bgPreset]} p-8 flex items-center justify-center relative overflow-hidden shadow-2xl transition-all duration-500`}>
            
            {/* Animated Floating Accents inside canvas */}
            <div className="absolute top-4 left-6 w-20 h-20 bg-pink-500/40 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-4 right-6 w-28 h-28 bg-yellow-400/40 rounded-full blur-xl animate-float" />

            {/* The Glass Card */}
            <div 
              style={{
                background: `rgba(255, 255, 255, ${opacity / 100})`,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                borderRadius: `${borderRadius}px`,
                border: `1px solid rgba(255, 255, 255, ${borderOpacity / 100})`,
                boxShadow: `0 8px 32px 0 rgba(0, 0, 0, ${shadowDepth / 100})`
              }}
              className="w-full max-w-sm p-6 space-y-4 text-white relative z-10 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-white/90">
                  Frosted Glass Card
                </span>
                <Sparkles className="w-5 h-5 text-white/80" />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-white">All You Want Glass UI</h4>
                <p className="text-xs text-white/80 mt-1 leading-relaxed">
                  Real-time glassmorphism rendering directly inside your web browser.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-white/70">
                <span className="px-2 py-0.5 rounded bg-white/20">Blur: {blur}px</span>
                <span className="px-2 py-0.5 rounded bg-white/20">Opacity: {opacity}%</span>
              </div>
            </div>

          </div>

          {/* Generated CSS Box */}
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
            <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 font-mono flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-400" />
                Generated Production CSS Code
              </span>
              <button 
                onClick={handleCopyCss}
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
              >
                <Copy className="w-3 h-3" /> Copy CSS
              </button>
            </div>

            <pre className="p-4 bg-slate-950/90 text-indigo-200 font-mono text-xs overflow-x-auto leading-relaxed">
              {cssSnippet}
            </pre>
          </div>

        </div>

      </div>
    </ToolWrapper>
  );
}
