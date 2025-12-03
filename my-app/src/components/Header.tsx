import { Sparkles, BarChart3, Calendar, FileText } from 'lucide-react';

type Page = 'home' | 'statistics' | 'archive' | 'documentation';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const navItems = [
    { id: 'home' as Page, label: 'Home', icon: Sparkles },
    { id: 'statistics' as Page, label: 'Statistics', icon: BarChart3 },
    { id: 'archive' as Page, label: 'Archive', icon: Calendar },
    { id: 'documentation' as Page, label: 'Documentation', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div 
          className="rounded-2xl px-6 py-4 border border-white/10"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white tracking-tight">Moip</h1>
                <p className="text-xs text-white/50">모입 · Fashion Recognition</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
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
          </div>
        </div>
      </div>
    </header>
  );
}