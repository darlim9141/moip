import { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { StyleVisualization } from './StyleVisualization';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'motion/react';
import { Users, Image as ImageIcon, Percent, Database } from 'lucide-react';

interface StatData {
  global_stats: {
    total_images: number | string;
    unique_users: string;
    model_accuracy: string;
    dataset_size: string;
  };
  category_distribution: Array<{
    name: string;
    value: number;
    count: number;
    color: string;
  }>;
}

export function StatisticsPage() {
  // 1. 상태 관리
  const [stats, setStats] = useState<StatData | null>(null);
  const [backgroundPoints, setBackgroundPoints] = useState<any[]>([]);

  // API URL 변수
  const API_URL = import.meta.env.VITE_API_URL;

  // 2. 데이터 가져오기 (API 호출)
  useEffect(() => {
    // (1) 통계 데이터 가져오기
    // [수정 포인트] 백틱(`)과 ${} 사용
    fetch(`${API_URL}/api/stats`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Failed to load stats:", err));

    // (2) 3D 배경 데이터 가져오기
    // [수정 포인트] 백틱(`)과 ${} 사용
    fetch(`${API_URL}/api/graph-data`)
      .then(res => res.json())
      .then(data => setBackgroundPoints(data))
      .catch(err => console.error("Failed to load graph data:", err));
  }, []);

  // 하드코딩된 데이터셋 정보
  const datasetStats = [
    { category: 'Training Images', value: '1000', description: 'Curated fashion images for model training' },
    { category: 'Validation Set', value: '125', description: 'Images used for model validation' },
    { category: 'Test Set', value: '125', description: 'Final evaluation dataset' },
    { category: 'Style Categories', value: '4', description: 'Minimal, Casual, Classic, Street' },
  ];

  // 로딩 중일 때 표시
  if (!stats) {
    return <div className="text-center py-20 text-white/50">Loading statistics...</div>;
  }

  // 아이콘 매핑
  const statCards = [
    { label: 'Total Images', value: stats.global_stats.total_images, icon: ImageIcon, color: 'from-cyan-500 to-blue-500' },
    { label: 'Unique Users', value: stats.global_stats.unique_users, icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Model Accuracy', value: stats.global_stats.model_accuracy, icon: Percent, color: 'from-orange-500 to-red-500' },
    { label: 'Dataset Size', value: stats.global_stats.dataset_size, icon: Database, color: 'from-green-500 to-cyan-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-8"
      >
        <h1 className="text-white mb-4 text-4xl">Analytics Dashboard</h1>
        <p className="text-white/60">Global statistics and insights from Moip fashion recognition</p>
      </motion.div>

      {/* Stats Cards (상단 카드 4개) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">{stat.label}</p>
                  <p className="text-white text-3xl">{stat.value}</p>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* 3D Visualization (배경 데이터만 전달) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* userPoint는 없으므로 points만 전달하여 배경만 보여줌 */}
        <StyleVisualization points={backgroundPoints} />
      </motion.div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Category Distribution (Pie Chart) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <GlassCard className="p-8">
            <h2 className="text-white mb-6">Category Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.category_distribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.category_distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: 'white',
                    }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: number) => [`${value}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend (범례) */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {stats.category_distribution.map(cat => (
                <div key={cat.name} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cat.color }}></div>
                  <div>
                    <p className="text-white text-sm">{cat.name}</p>
                    <p className="text-white/50 text-xs">
                      {cat.value}% ({cat.count} images)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Dataset Overview (Static Info) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <GlassCard className="p-8">
            <h2 className="text-white mb-6">Dataset Overview</h2>
            <div className="space-y-6">
              {datasetStats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white">{stat.category}</span>
                    <span className="text-cyan-400">{stat.value}</span>
                  </div>
                  <p className="text-white/50 text-sm">{stat.description}</p>
                  {index < datasetStats.length - 1 && (
                    <div className="h-px bg-white/10 mt-4"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/50 text-sm text-center">
                Model trained with fine tuning techniques
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}