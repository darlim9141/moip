import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ArchiveImage {
  id: string;
  date: string;
  image: string;
  styles: {
    minimal: number;
    casual: number;
    classic: number;
    street: number;
  };
}

export function ArchivePage() {
  const [selectedImage, setSelectedImage] = useState<ArchiveImage | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 10)); // November 2024

  // Mock archive data
  const archiveImages: ArchiveImage[] = [
    {
      id: '1',
      date: '2024-11-25',
      image: 'https://images.unsplash.com/photo-1653875842174-429c1b467548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXQlMjBtaW5pbWFsfGVufDF8fHx8MTc2NDEyOTg5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      styles: { minimal: 80, casual: 30, classic: 24, street: 10 },
    },
    {
      id: '2',
      date: '2024-11-22',
      image: 'https://images.unsplash.com/photo-1708317031389-1afe5ccc6f96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBvdXRmaXR8ZW58MXx8fHwxNzY0MTI5ODk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      styles: { minimal: 25, casual: 75, classic: 30, street: 40 },
    },
    {
      id: '3',
      date: '2024-11-20',
      image: 'https://images.unsplash.com/photo-1752950823536-2db75f37980d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwc3R5bGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQxMjk4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      styles: { minimal: 30, casual: 20, classic: 85, street: 15 },
    },
    {
      id: '4',
      date: '2024-11-18',
      image: 'https://images.unsplash.com/photo-1603233842167-ff91cab9e6ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmYXNoaW9uJTIwdXJiYW58ZW58MXx8fHwxNzY0MTIwMTc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      styles: { minimal: 15, casual: 45, classic: 20, street: 90 },
    },
    {
      id: '5',
      date: '2024-11-15',
      image: 'https://images.unsplash.com/photo-1653875842174-429c1b467548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXQlMjBtaW5pbWFsfGVufDF8fHx8MTc2NDEyOTg5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      styles: { minimal: 70, casual: 35, classic: 28, street: 12 },
    },
    {
      id: '6',
      date: '2024-11-12',
      image: 'https://images.unsplash.com/photo-1708317031389-1afe5ccc6f96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBvdXRmaXR8ZW58MXx8fHwxNzY0MTI5ODk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      styles: { minimal: 35, casual: 80, classic: 25, street: 50 },
    },
  ];

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const getImageForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return archiveImages.find(img => img.date === dateStr);
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  const styleColors = {
    minimal: '#06b6d4',
    casual: '#8b5cf6',
    classic: '#f59e0b',
    street: '#10b981',
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-8"
      >
        <h1 className="text-white mb-4 text-4xl">Archive</h1>
        <p className="text-white/60">Browse your fashion analysis history</p>
      </motion.div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <GlassCard className="p-8">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <h2 className="text-white">{monthName}</h2>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-white/50 text-sm py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-4">
            {getDaysInMonth(currentMonth).map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const imageData = getImageForDate(day);

              return (
                <motion.button
                  key={day}
                  onClick={() => imageData && setSelectedImage(imageData)}
                  className={`aspect-square rounded-xl border transition-all duration-300 ${
                    imageData
                      ? 'border-white/20 hover:border-white/40 hover:-translate-y-1 cursor-pointer'
                      : 'border-white/5 cursor-default'
                  }`}
                  style={{
                    background: imageData ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                  }}
                  whileHover={imageData ? { scale: 1.05 } : {}}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-2">
                    <span className="text-white/70 text-sm mb-2">{day}</span>
                    {imageData && (
                      <div className="relative w-full flex-1 rounded-lg overflow-hidden">
                        <img
                          src={imageData.image}
                          alt={`Analysis from ${imageData.date}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </GlassCard>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)' }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <GlassCard className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-white mb-1">Analysis Details</h2>
                    <p className="text-white/50 text-sm">
                      {new Date(selectedImage.date).toLocaleDateString('default', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Image */}
                  <div className="rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={selectedImage.image}
                      alt="Analysis result"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-6">
                    <h3 className="text-white">Style Breakdown</h3>
                    {Object.entries(selectedImage.styles).map(([style, percentage]) => (
                      <div key={style} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-white capitalize">{style}</span>
                          <span className="text-white/70">{percentage}%</span>
                        </div>
                        <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{
                              background: styleColors[style as keyof typeof styleColors],
                              boxShadow: `0 0 20px ${styleColors[style as keyof typeof styleColors]}40`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
