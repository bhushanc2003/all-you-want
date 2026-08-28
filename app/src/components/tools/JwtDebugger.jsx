import React, { useState, useEffect } from 'react';
import ToolWrapper from '../ToolWrapper';
import { KeyRound, Check, AlertCircle, ShieldCheck, Clock, CheckCircle2, XCircle } from 'lucide-react';

const SAMPLE_JWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsbCBZb3UgV2FudCBEZXZlbG9wZXIiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTkwMDAwMDAwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;

export default function JwtDebugger({ tool, onBack }) {
  const [token, setToken] = useState(SAMPLE_JWT);
  const [headerJson, setHeaderJson] = useState(null);
  const [payloadJson, setPayloadJson] = useState(null);
  const [signatureRaw, setSignatureRaw] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const [tokenStatus, setTokenStatus] = useState(null);

  useEffect(() => {
    if (!token.trim()) {
      setHeaderJson(null);
      setPayloadJson(null);
      setSignatureRaw('');
      setErrorMsg(null);
      setTokenStatus(null);
      return;
    }

    const parts = token.trim().split('.');
    if (parts.length !== 3) {
      setErrorMsg('Invalid JWT format. A valid JWT contains three base64 parts separated by dots.');
      setHeaderJson(null);
      setPayloadJson(null);
      return;
    }

    try {
      // Decode Header
      const headerStr = atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'));
      const headerObj = JSON.parse(headerStr);
      setHeaderJson(headerObj);

      // Decode Payload
      const payloadStr = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      const payloadObj = JSON.parse(payloadStr);
      setPayloadJson(payloadObj);

      setSignatureRaw(parts[2]);
      setErrorMsg(null);

      // Check EXP timestamp
      if (payloadObj && payloadObj.exp) {
        const expMs = payloadObj.exp * 1000;
        const nowMs = Date.now();
        if (expMs < nowMs) {
          setTokenStatus({ isExpired: true, text: `Expired on ${new Date(expMs).toLocaleString()}` });
        } else {
          setTokenStatus({ isExpired: false, text: `Valid until ${new Date(expMs).toLocaleString()}` });
        }
      } else {
        setTokenStatus({ isExpired: false, text: 'No expiration claim (exp) set' });
      }

    } catch (e) {
      setErrorMsg('Failed to parse JWT payload or header: ' + e.message);
      setHeaderJson(null);
      setPayloadJson(null);
    }
  }, [token]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleCopyPayload = () => {
    if (!payloadJson) return;
    navigator.clipboard.writeText(JSON.stringify(payloadJson, null, 2));
    showToast('Decoded JWT payload copied!');
  };

  return (
    <ToolWrapper
      tool={tool}
      onBack={onBack}
      onCopy={payloadJson ? handleCopyPayload : null}
      onClear={() => setToken('')}
      onLoadSample={() => setToken(SAMPLE_JWT)}
    >
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" /> {toastMsg}
        </div>
      )}

      {/* Status Bar */}
      {tokenStatus && !errorMsg && (
        <div className={`glass-panel p-4 rounded-xl border flex items-center justify-between gap-4 text-xs ${
          tokenStatus.isExpired 
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
        }`}>
          <div className="flex items-center gap-2 font-medium">
            {tokenStatus.isExpired ? (
              <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>Token Status: <strong>{tokenStatus.isExpired ? 'Expired' : 'Active'}</strong> — {tokenStatus.text}</span>
          </div>

          {headerJson?.alg && (
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]">
              Algorithm: {headerJson.alg}
            </span>
          )}
        </div>
      )}

      {/* Main Grid: Left Token Input, Right Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Token Input Panel */}
        <div className="lg:col-span-5 glass-panel rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-indigo-400" />
              Encoded JWT Input
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              3 Encoded Parts
            </span>
          </div>

          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste raw encoded JWT string here..."
            className="w-full h-96 p-4 bg-slate-950/40 text-rose-300 font-mono text-xs focus:outline-none resize-none leading-relaxed placeholder-slate-600 break-all"
            spellCheck="false"
          />

          {errorMsg && (
            <div className="px-4 py-3 bg-rose-500/10 border-t border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Visualized Decoded Output */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Header Panel */}
          <div className="glass-panel rounded-xl border border-rose-500/30 overflow-hidden">
            <div className="px-4 py-2 bg-rose-500/10 border-b border-rose-500/20 text-rose-400 text-xs font-bold font-mono">
              HEADER: ALGORITHM & TOKEN TYPE
            </div>
            <pre className="p-4 bg-slate-950/80 text-rose-300 font-mono text-xs overflow-x-auto leading-relaxed">
              {headerJson ? JSON.stringify(headerJson, null, 2) : '// Header will appear here'}
            </pre>
          </div>

          {/* Payload Panel */}
          <div className="glass-panel rounded-xl border border-purple-500/30 overflow-hidden">
            <div className="px-4 py-2 bg-purple-500/10 border-b border-purple-500/20 text-purple-300 text-xs font-bold font-mono">
              PAYLOAD: DATA CLAIMS & EXPIRATION
            </div>
            <pre className="p-4 bg-slate-950/80 text-purple-200 font-mono text-xs overflow-x-auto leading-relaxed">
              {payloadJson ? JSON.stringify(payloadJson, null, 2) : '// Payload claims will appear here'}
            </pre>
          </div>

          {/* Signature Panel */}
          <div className="glass-panel rounded-xl border border-cyan-500/30 overflow-hidden">
            <div className="px-4 py-2 bg-cyan-500/10 border-b border-cyan-500/20 text-cyan-400 text-xs font-bold font-mono">
              VERIFY SIGNATURE
            </div>
            <div className="p-4 bg-slate-950/80 text-cyan-300 font-mono text-xs break-all leading-relaxed">
              {signatureRaw ? (
                <div>
                  <p className="text-slate-400 text-[11px] mb-1">// Raw Cryptographic Signature String:</p>
                  <code>{signatureRaw}</code>
                </div>
              ) : (
                '// Signature hash will appear here'
              )}
            </div>
          </div>

        </div>

      </div>
    </ToolWrapper>
  );
}
