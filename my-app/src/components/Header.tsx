import { useState } from 'react';
import { Sparkles, BarChart3, Calendar, FileText, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Page = 'home' | 'statistics' | 'archive' | 'documentation';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as Page, label: 'Home', icon: Sparkles },
    { id: 'statistics' as Page, label: 'Statistics', icon: BarChart3 },
    { id: 'archive' as Page, label: 'Archive', icon: Calendar },
    { id: 'documentation' as Page, label: 'Documentation', icon: FileText },
  ];

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  // 유리 질감 스타일 (공통 사용)
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  };

  return (
    <header className="sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        
        {/* 상단 네비게이션 바 */}
        <div 
          className="rounded-2xl px-6 py-4 border border-white/10 relative z-20"
          style={glassStyle}
        >
          <div className="flex items-center justify-between">
            {/* 로고 (항상 보임) */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigate('home')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white tracking-tight font-bold">Moip</h1>
                <p className="text-xs text-white/50">Fashion Recognition</p>
              </div>
            </div>

            {/* [데스크톱 메뉴] md(768px) 이상에서만 보임 (flex), 미만에서는 숨김 (hidden) */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                      isActive
                        ? 'text-white'
                        : 'text-white/60 hover:text-white/90'
                    }`}
                    style={{
                      background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      backdropFilter: isActive ? 'blur(10px)' : 'none',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* [모바일 햄버거 버튼] md(768px) 미만에서만 보임 (block), 이상에서는 숨김 (hidden) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* [모바일 드롭다운 메뉴] md 미만일 때만 렌더링 */}
        <div className="md:hidden">
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-2 rounded-2xl border border-white/10 overflow-hidden relative z-10"
                style={glassStyle}
              >
                <div className="flex flex-col p-2 gap-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                          isActive
                            ? 'text-white bg-white/10'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}