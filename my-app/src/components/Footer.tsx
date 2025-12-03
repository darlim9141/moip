import { GlassCard } from './GlassCard';
import { Instagram, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="px-6 py-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            {/* Logo & Copyright */}
            <div>
              <p className="text-white mb-1">Moip · 모입</p>
              <p className="text-white/50 text-sm">Fashion Style Recognition Platform</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/kcu_madison/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
              >
                <Instagram className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://github.com/darlim9141/kcu5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
              >
                <Github className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </GlassCard>
      </div>
    </footer>
  );
}
