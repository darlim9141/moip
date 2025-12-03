import { GlassCard } from './GlassCard';
import { motion } from 'motion/react';
import { BookOpen, Calendar, FileCode, ExternalLink } from 'lucide-react';

export function DocumentationPage() {
  const projectTimeline = [
    { date: '2024-09-15', milestone: 'Project Initialization', description: 'Repository setup and initial project structure' },
    { date: '2024-10-01', milestone: 'Dataset Collection', description: 'Gathered and curated 500K fashion images' },
    { date: '2024-10-15', milestone: 'Model Architecture', description: 'Implemented ResNet-50 based classification model' },
    { date: '2024-11-01', milestone: 'Training Phase', description: 'Completed model training with 94.2% accuracy' },
    { date: '2024-11-10', milestone: 'Frontend Development', description: 'Built glassmorphism UI with React and Tailwind' },
    { date: '2024-11-20', milestone: '3D Visualization', description: 'Added interactive style-space embedding visualization' },
    { date: '2024-11-25', milestone: 'Beta Launch', description: 'Deployed Moip platform for testing' },
  ];

  const notebooks = [
    {
      title: 'Data Preprocessing & Augmentation',
      author: 'Team Member A',
      description: 'Comprehensive notebook covering image preprocessing, data augmentation techniques, and dataset preparation for model training.',
      link: 'https://colab.research.google.com/notebook-1',
      tags: ['Data', 'Preprocessing', 'CV'],
    },
    {
      title: 'Model Training & Evaluation',
      author: 'Team Member B',
      description: 'Deep dive into model architecture, training process, hyperparameter tuning, and evaluation metrics with visual analysis.',
      link: 'https://colab.research.google.com/notebook-2',
      tags: ['Training', 'Deep Learning', 'ResNet'],
    },
    {
      title: 'Style Embedding Analysis',
      author: 'Team Member C',
      description: 'Exploration of learned embeddings, dimensionality reduction techniques, and visualization of fashion style space.',
      link: 'https://colab.research.google.com/notebook-3',
      tags: ['Embedding', 'Visualization', 'Analysis'],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-8"
      >
        <h1 className="text-white mb-4 text-4xl">Documentation</h1>
        <p className="text-white/60">Technical details and project resources</p>
      </motion.div>

      {/* Section 1: Project Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <GlassCard className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-white">Project Overview & Website Description</h2>
          </div>

          <div className="space-y-6">
            <div className="pl-4 border-l-2 border-white/10">
              <h3 className="text-white mb-3">About Moip (모입)</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Moip is an AI-powered fashion style recognition platform that analyzes clothing and outfits to classify them across four distinct style categories: Minimal, Casual, Classic, and Street. Built with cutting-edge deep learning technology, Moip provides users with instant style insights and personalized fashion recommendations.
              </p>
              <p className="text-white/70 leading-relaxed">
                The platform features a clean, modern glassmorphism interface that emphasizes clarity and user experience. Users can upload fashion images, receive detailed style breakdowns with confidence percentages, explore their upload history through an interactive calendar archive, and visualize their style preferences in a 3D embedding space.
              </p>
            </div>

            <div className="pl-4 border-l-2 border-white/10">
              <h3 className="text-white mb-3">Core Features</h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong className="text-white">Real-time Analysis:</strong> Instant fashion style classification with multi-category confidence scores</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong className="text-white">3D Visualization:</strong> Interactive embedding space showing style relationships and patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong className="text-white">Archive System:</strong> Calendar-based history tracking with detailed analysis records</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong className="text-white">Smart Recommendations:</strong> Personalized accessory and brand suggestions based on style profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span><strong className="text-white">Analytics Dashboard:</strong> Comprehensive statistics and insights from global dataset</span>
                </li>
              </ul>
            </div>

            <div className="pl-4 border-l-2 border-white/10">
              <h3 className="text-white mb-3">Technology Stack</h3>
              <p className="text-white/70 leading-relaxed">
                Backend: PyTorch-based ResNet-50 architecture with custom attention mechanisms. 
                Frontend: React with TypeScript, Tailwind CSS v4.0, Motion animations, and Recharts for data visualization. 
                The model achieves 79.2% accuracy on our validation set and processes images through a 3-dimensional latent space optimized for style classification.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Section 2: Development Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <GlassCard className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-white">Project Development Timeline</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10"></div>

            <div className="space-y-8">
              {projectTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="relative pl-16"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-slate-900"></div>

                  <div className="space-y-1">
                    <p className="text-white/50 text-sm">{item.date}</p>
                    <h3 className="text-white">{item.milestone}</h3>
                    <p className="text-white/70 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-white/50 text-sm">
              View complete commit history on{' '}
              <a href="https://github.com/darlim9141/kcu5/commits/main/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                GitHub
              </a>
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Section 3: Learning Notes / Jupyter Notebooks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <GlassCard className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400/20 to-red-500/20 flex items-center justify-center">
              <FileCode className="w-6 h-6 text-orange-400" />
            </div>
            <h2 className="text-white">Learning Notes & Jupyter Notebooks</h2>
          </div>

          <p className="text-white/60 mb-6">
            Explore detailed technical notebooks created by our team members, covering data processing, model training, and analysis.
          </p>

          <div className="space-y-4">
            {notebooks.map((notebook, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <div
                  className="p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white mb-1">{notebook.title}</h3>
                      <p className="text-white/50 text-sm mb-3">by {notebook.author}</p>
                      <p className="text-white/70 text-sm leading-relaxed mb-4">
                        {notebook.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {notebook.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-lg text-xs text-white/70 border border-white/10"
                            style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a
                    href={notebook.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 text-sm"
                  >
                    <span>Open Notebook</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
