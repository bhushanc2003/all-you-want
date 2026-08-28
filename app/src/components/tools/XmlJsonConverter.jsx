import React, { useState, useEffect } from 'react';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import ToolWrapper from '../ToolWrapper';
import { ArrowLeftRight, Check, AlertCircle, FileCode2 } from 'lucide-react';

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <book id="bk101">
    <author>Gambardella, Matthew</author>
    <title>XML Developer's Guide</title>
    <genre>Computer</genre>
    <price>44.95</price>
    <publish_date>2000-10-01</publish_date>
    <description>An in-depth look at creating applications with XML.</description>
  </book>
  <book id="bk102">
    <author>Ralls, Kim</author>
    <title>Midnight Rain</title>
    <genre>Fantasy</genre>
    <price>5.95</price>
    <publish_date>2000-12-16</publish_date>
  </book>
</catalog>`;

export default function XmlJsonConverter({ tool, onBack }) {
  const [direction, setDirection] = useState('xml2json'); // 'xml2json' | 'json2xml'
  const [inputText, setInputText] = useState(SAMPLE_XML);
  const [outputText, setOutputText] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    if (!inputText.trim()) {
      setOutputText('');
      setErrorMsg(null);
      return;
    }

    try {
      if (direction === 'xml2json') {
        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: '@_'
        });
        const jsonObj = parser.parse(inputText);
        setOutputText(JSON.stringify(jsonObj, null, 2));
        setErrorMsg(null);
      } else {
        const jsonObj = JSON.parse(inputText);
        const builder = new XMLBuilder({
          ignoreAttributes: false,
          attributeNamePrefix: '@_',
          format: true,
          indentBy: '  '
        });
        const xmlStr = builder.build(jsonObj);
        setOutputText(xmlStr);
        setErrorMsg(null);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Error processing XML/JSON conversion');
      setOutputText('');
    }
  }, [inputText, direction]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    showToast('Output copied to clipboard!');
  };

  const handleDownload = () => {
    if (!outputText) return;
    const ext = direction === 'xml2json' ? 'json' : 'xml';
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded data.${ext}`);
  };

  const handleSwap = () => {
    setDirection(prev => prev === 'xml2json' ? 'json2xml' : 'xml2json');
    if (outputText) {
      setInputText(outputText);
    }
  };

  return (
    <ToolWrapper
      tool={tool}
      onBack={onBack}
      onCopy={outputText ? handleCopy : null}
      onDownload={outputText ? handleDownload : null}
      onClear={() => setInputText('')}
      onLoadSample={() => setInputText(SAMPLE_XML)}
    >
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" /> {toastMsg}
        </div>
      )}

      {/* Control Bar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDirection('xml2json')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              direction === 'xml2json'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            XML ➔ JSON
          </button>
          <button
            onClick={handleSwap}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDirection('json2xml')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              direction === 'json2xml'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            JSON ➔ XML
          </button>
        </div>
        <span className="text-xs text-slate-400 font-mono hidden sm:inline">
          High-Precision Parser
        </span>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Panel */}
        <div className="glass-panel rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-indigo-400" />
              Input {direction === 'xml2json' ? 'XML' : 'JSON'}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              {inputText.length} chars
            </span>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Paste your ${direction === 'xml2json' ? 'XML' : 'JSON'} markup here...`}
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

        {/* Output Panel */}
        <div className="glass-panel rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-300 font-mono flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-purple-400" />
              Converted {direction === 'xml2json' ? 'JSON' : 'XML'}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              {outputText.length} chars
            </span>
          </div>

          <textarea
            readOnly
            value={outputText}
            placeholder="Converted structure will render here..."
            className="w-full h-96 p-4 bg-slate-950/70 text-indigo-200 font-mono text-xs focus:outline-none resize-none leading-relaxed placeholder-slate-600"
            spellCheck="false"
          />
        </div>

      </div>
    </ToolWrapper>
  );
}
