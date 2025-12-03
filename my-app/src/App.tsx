import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { StatisticsPage } from './components/StatisticsPage';
import { ArchivePage } from './components/ArchivePage';
import { DocumentationPage } from './components/DocumentationPage';

type Page = 'home' | 'statistics' | 'archive' | 'documentation';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'statistics' && <StatisticsPage />}
        {currentPage === 'archive' && <ArchivePage />}
        {currentPage === 'documentation' && <DocumentationPage />}
      </main>

      <Footer />
    </div>
  );
}