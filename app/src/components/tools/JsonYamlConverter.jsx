import React, { useState, useEffect } from 'react';
import * as yaml from 'js-yaml';
import ToolWrapper from '../ToolWrapper';
import { ArrowLeftRight, Check, AlertCircle, FileText, Copy, Download } from 'lucide-react';

const SAMPLE_JSON = `{
  "appName": "All You Want",
  "version": "1.0.0",
  "seoEnabled": true,
  "tools": [
    {
      "name": "JSON to YAML",
      "category": "Converters",
      "privacy": "100% Client-Side"
    },
    {
      "name": "JWT Debugger",
      "category": "Security"
    }
  ],
  "author": {
    "name": "Developer Hub",
    "github": "https://github.com"
  }
}`;

export default function JsonYamlConverter({ tool, onBack }) {
  const [direction, setDirection] = useState('json2yaml'); // 'json2yaml' | 'yaml2json'
  const [inputText, setInputText] = useState(SAMPLE_JSON);
  const [outputText, setOutputText] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [indent, setIndent] = useState(2);
  const [toastMsg, setToastMsg] = useState('');

  // Perform live conversion
  useEffect(() => {
    if (!inputText.trim()) {
      setOutputText('');
      setErrorMsg(null);
      return;
    }

    try {
      if (direction === 'json2yaml') {
        const parsed = JSON.parse(inputText);
        const yamlStr = yaml.dump(parsed, { indent });
        setOutputText(yamlStr);
        setErrorMsg(null);
      } else {
        const parsed = yaml.load(inputText);
        const jsonStr = JSON.stringify(parsed, null, indent);
        setOutputText(jsonStr);
        setErrorMsg(null);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Invalid syntax format');
      setOutputText('');
    }
  }, [inputText, direction, indent]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    showToast('Converted output copied to clipboard!');
  };

  const handleDownload = () => {
    if (!outputText) return;
    const ext = direction === 'json2yaml' ? 'yaml' : 'json';
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted-data.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded converted-data.${ext}`);
  };

  const handleSwap = () => {
    setDirection(prev => prev === 'json2yaml' ? 'yaml2json' : 'json2yaml');
    if (outputText) {
      setInputText(outputText);
    }
  };

  const handleLoadSample = () => {
    if (direction === 'json2yaml') {
      setInputText(SAMPLE_JSON);
    } else {
      try {
        const sampleYaml = yaml.dump(JSON.parse(SAMPLE_JSON));
        setInputText(sampleYaml);
      } catch (e) {
        setInputText(SAMPLE_JSON);
      }
    }
    showToast('Loaded sample data');
  };

  return (
    <ToolWrapper
      tool={tool}
      onBack={onBack}
      onCopy={outputText ? handleCopy : null}
      onDownload={outputText ? handleDownload : null}
      onClear={() => setInputText('')}
      onLoadSample={handleLoadSample}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" /> {toastMsg}
        </div>
      )}

      {/* Converter Control Bar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        
        {/* Direction Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDirection('json2yaml')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              direction === 'json2yaml'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            JSON ➔ YAML
          </button>
          <button
            onClick={handleSwap}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
            title="Swap direction & content"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDirection('yaml2json')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              direction === 'yaml2json'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            YAML ➔ JSON
          </button>
        </div>

        {/* Indent Control */}
        <div className="flex items-center gap-3 text-xs text-slate-300">
          <span className="font-mono text-slate-400">Indentation:</span>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
          >
            <option value={2}>2 Spaces</option>
            <option value={4}>4 Spaces</option>
          </select>
        </div>

      </div>

      {/* Main Dual Code Editor Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Input Editor */}
        <div className="glass-panel rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              Input {direction === 'json2yaml' ? 'JSON' : 'YAML'}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              {inputText.length} chars • {inputText.split('\n').length} lines
            </span>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Paste your ${direction === 'json2yaml' ? 'JSON' : 'YAML'} string here...`}
            className="w-full h-96 p-4 bg-slate-950/40 text-slate-100 font-mono text-xs focus:outline-none resize-none leading-relaxed placeholder-slate-600"
            spellCheck="false"
          />

          {errorMsg && (
            <div className="px-4 py-3 bg-rose-500/10 border-t border-rose-500/30 text-rose-400 text-xs font-mono flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="break-all">{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Right Output Panel */}
        <div className="glass-panel rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-300 font-mono flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              Converted {direction === 'json2yaml' ? 'YAML' : 'JSON'}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              {outputText.length} chars
            </span>
          </div>

          <textarea
            readOnly
            value={outputText}
            placeholder="Converted output will appear here in real time..."
            className="w-full h-96 p-4 bg-slate-950/70 text-indigo-200 font-mono text-xs focus:outline-none resize-none leading-relaxed placeholder-slate-600"
            spellCheck="false"
          />
        </div>

      </div>
    </ToolWrapper>
  );
}
