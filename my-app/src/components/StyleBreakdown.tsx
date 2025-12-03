import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';

interface StyleData {
  minimal: number;
  casual: number;
  classic: number;
  street: number;
}

interface StyleBreakdownProps {
  data: StyleData;
}

const styleColors = {
  minimal: { from: '#06b6d4', to: '#3b82f6' },
  casual: { from: '#8b5cf6', to: '#ec4899' },
  classic: { from: '#f59e0b', to: '#ef4444' },
  street: { from: '#10b981', to: '#06b6d4' },
};

const styleLabels = {
  minimal: 'Minimal',
  casual: 'Casual',
  classic: 'Classic',
  street: 'Street',
};

export function StyleBreakdown({ data }: StyleBreakdownProps) {
  const styles = Object.entries(data) as [keyof StyleData, number][];

  return (
    <GlassCard className="p-8">
      <h2 className="text-white mb-8 text-center">Your Fashion Breakdown</h2>
      
      <div className="space-y-6">
        {styles.map(([style, percentage], index) => (
          <div key={style} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white">{styleLabels[style]}</span>
              <span className="text-white/70">{percentage}%</span>
            </div>
            
            <div className="h-3 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                className="h-full rounded-full relative"
                style={{
                  background: `linear-gradient(90deg, ${styleColors[style].from}, ${styleColors[style].to})`,
                  boxShadow: `0 0 20px ${styleColors[style].from}40`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Dominant style indicator */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="text-center">
          <p className="text-white/50 text-sm mb-2">Dominant Style</p>
          <p className="text-white">
            {styleLabels[styles.reduce((a, b) => (a[1] > b[1] ? a : b))[0]]}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
