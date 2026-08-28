import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomepageHero from './components/HomepageHero';
import SearchModal from './components/SearchModal';
import { TOOLS_LIST } from './data/toolsData';

// Tools
import JsonYamlConverter from './components/tools/JsonYamlConverter';
import XmlJsonConverter from './components/tools/XmlJsonConverter';
import Base64Tool from './components/tools/Base64Tool';
import JwtDebugger from './components/tools/JwtDebugger';
import GlassmorphismGenerator from './components/tools/GlassmorphismGenerator';

export default function App() {
  const [activeToolId, setActiveToolId] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync hash routing e.g. #json-yaml
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && TOOLS_LIST.some(t => t.id === hash && t.status === 'active')) {
        setActiveToolId(hash);
      } else if (!hash) {
        setActiveToolId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTool = (id) => {
    setActiveToolId(id);
    if (id) {
      window.location.hash = id;
    } else {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic Document Title for High SEO
  useEffect(() => {
    if (activeToolId) {
      const activeTool = TOOLS_LIST.find(t => t.id === activeToolId);
      if (activeTool) {
        document.title = `${activeTool.name} | All You Want Free Tools`;
      }
    } else {
      document.title = 'All You Want | Free Online Developer & Web Utilities Hub';
    }
  }, [activeToolId]);

  const activeToolObj = TOOLS_LIST.find(t => t.id === activeToolId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white relative font-sans">
      
      {/* Top Header */}
      <Header 
        activeToolId={activeToolId}
        onSelectTool={handleSelectTool}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeToolId === null ? (
          <HomepageHero onSelectTool={handleSelectTool} />
        ) : activeToolId === 'json-yaml' ? (
          <JsonYamlConverter tool={activeToolObj} onBack={() => handleSelectTool(null)} />
        ) : activeToolId === 'xml-json' ? (
          <XmlJsonConverter tool={activeToolObj} onBack={() => handleSelectTool(null)} />
        ) : activeToolId === 'base64' ? (
          <Base64Tool tool={activeToolObj} onBack={() => handleSelectTool(null)} />
        ) : activeToolId === 'jwt' ? (
          <JwtDebugger tool={activeToolObj} onBack={() => handleSelectTool(null)} />
        ) : activeToolId === 'glassmorphism' ? (
          <GlassmorphismGenerator tool={activeToolObj} onBack={() => handleSelectTool(null)} />
        ) : (
          <HomepageHero onSelectTool={handleSelectTool} />
        )}
      </main>

      {/* Global Command Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTool={handleSelectTool}
      />

      {/* Footer */}
      <Footer onSelectTool={handleSelectTool} />

    </div>
  );
}
