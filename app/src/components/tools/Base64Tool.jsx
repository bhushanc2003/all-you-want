import React, { useState, useEffect } from 'react';
import ToolWrapper from '../ToolWrapper';
import { Binary, Check, Upload, FileText, Lock, AlertCircle, RefreshCw } from 'lucide-react';

export default function Base64Tool({ tool, onBack }) {
  const [activeTab, setActiveTab] = useState('text'); // 'text' | 'file'
  const [mode, setMode] = useState('encode'); // 'encode' | 'decode'
  const [urlSafe, setUrlSafe] = useState(false);
  const [inputText, setInputText] = useState('Hello World! Welcome to All You Want web utilities.');
  const [outputText, setOutputText] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const [fileDetails, setFileDetails] = useState(null);

  // Live conversion for Text mode
  useEffect(() => {
    if (activeTab === 'file') return;
    if (!inputText.trim()) {
      setOutputText('');
      setErrorMsg(null);
      return;
    }

    try {
      if (mode === 'encode') {
        let encoded = btoa(unescape(encodeURIComponent(inputText)));
        if (urlSafe) {
          encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }
        setOutputText(encoded);
        setErrorMsg(null);
      } else {
        let str = inputText.trim();
        if (urlSafe) {
          str = str.replace(/-/g, '+').replace(/_/g, '/');
          while (str.length % 4) {
            str += '=';
          }
        }
        const decoded = decodeURIComponent(escape(atob(str)));
        setOutputText(decoded);
        setErrorMsg(null);
      }
    } catch (err) {
      setErrorMsg('Invalid Base64 string for decoding');
      setOutputText('');
    }
  }, [inputText, mode, urlSafe, activeTab]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileDetails({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      type: file.type || 'Binary file'
    });

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setOutputText(result);
        showToast(`Encoded ${file.name} to Base64`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    showToast('Base64 string copied!');
  };

  const handleDownload = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'encode' ? 'encoded-base64.txt' : 'decoded-output.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded text output');
  };

  return (
    <ToolWrapper
      tool={tool}
      onBack={onBack}
      onCopy={outputText ? handleCopy : null}
      onDownload={outputText ? handleDownload : null}
      onClear={() => {
        setInputText('');
        setOutputText('');
        setFileDetails(null);
      }}
      onLoadSample={() => {
        setInputText('Hello World! Welcome to All You Want web utilities.');
        setActiveTab('text');
      }}
    >
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" /> {toastMsg}
        </div>
      )}

      {/* Control Tabs */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        
        {/* Mode Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setActiveTab('text'); setMode('encode'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'text' && mode === 'encode'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Encode Text
          </button>

          <button
            onClick={() => { setActiveTab('text'); setMode('decode'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'text' && mode === 'decode'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Decode Base64
          </button>

          <button
            onClick={() => setActiveTab('file')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'file'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            File to Base64
          </button>
        </div>

        {/* Options */}
        {activeTab === 'text' && (
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
            />
            <span>URL-Safe Base64 (- and _ instead of + and /)</span>
          </label>
        )}

      </div>

      {/* Main Panel */}
      {activeTab === 'text' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="glass-panel rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
            <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 font-mono">
                Input Text ({mode === 'encode' ? 'Raw String' : 'Base64 String'})
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {inputText.length} characters
              </span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Enter text to ${mode}...`}
              className="w-full h-80 p-4 bg-slate-950/40 text-slate-100 font-mono text-xs focus:outline-none resize-none leading-relaxed placeholder-slate-600"
            />

            {errorMsg && (
              <div className="px-4 py-3 bg-rose-500/10 border-t border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {errorMsg}
              </div>
            )}
          </div>

          {/* Output Panel */}
          <div className="glass-panel rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
            <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 font-mono">
                {mode === 'encode' ? 'Encoded Base64 Output' : 'Decoded Text Output'}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {outputText.length} characters
              </span>
            </div>

            <textarea
              readOnly
              value={outputText}
              placeholder="Base64 result will appear here..."
              className="w-full h-80 p-4 bg-slate-950/70 text-indigo-200 font-mono text-xs focus:outline-none resize-none leading-relaxed placeholder-slate-600 break-all"
            />
          </div>
        </div>
      ) : (
        /* File Upload Panel */
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center space-y-6">
          <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500/50 rounded-2xl p-12 transition-all cursor-pointer bg-slate-950/40 relative">
            <input
              type="file"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="space-y-3 pointer-events-none">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Click or drag a file to convert to Base64</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Upload images (PNG, JPG, SVG), documents, or binaries to generate a Base64 Data URL string locally.
              </p>
            </div>
          </div>

          {fileDetails && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span className="font-bold text-white">{fileDetails.name}</span>
                <span className="text-indigo-400 font-mono">{fileDetails.size}</span>
              </div>
              <p className="text-slate-500 text-[11px]">Type: {fileDetails.type}</p>
            </div>
          )}

          {outputText && (
            <div className="space-y-2 text-left">
              <span className="text-xs font-bold text-indigo-300 font-mono">Generated Base64 Data URL:</span>
              <textarea
                readOnly
                value={outputText}
                className="w-full h-40 p-4 bg-slate-950/80 text-indigo-200 font-mono text-xs rounded-xl border border-slate-800 focus:outline-none resize-none"
              />
            </div>
          )}
        </div>
      )}

    </ToolWrapper>
  );
}
