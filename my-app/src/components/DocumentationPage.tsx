import { GlassCard } from './GlassCard';
import { motion } from 'motion/react';
import { BookOpen, Calendar, FileCode, ExternalLink } from 'lucide-react';

export function DocumentationPage() {
  const projectTimeline = [
    { 
      date: '2025-09-05', 
      milestone: 'Project Kickoff', 
      description: 'Initial repository setup, folder structure organization (Front/Back separation), and Git flow establishment.' 
    },
    { 
      date: '2025-09-20', 
      milestone: 'Data Acquisition', 
      description: 'Executed web crawling strategies to gather fashion datasets (Minimal, Amekaji, Street) and performed initial cleaning.' 
    },
    { 
      date: '2025-10-10', 
      milestone: 'ML Model Prototyping', 
      description: 'Implemented K-Means clustering algorithms and set up the ResNet-50 architecture for supervised style classification.' 
    },
    { 
      date: '2025-10-25', 
      milestone: 'Backend & API Integration', 
      description: 'Built FastAPI server, integrated Google Gemini API for personalized recommendations, and established DB connections.' 
    },
    { 
      date: '2025-11-10', 
      milestone: 'Frontend Core Development', 
      description: 'Developed React-based UI with Gallery, Upload features, and implemented state management for seamless user interaction.' 
    },
    { 
      date: '2025-11-20', 
      milestone: 'Visualization & Features', 
      description: 'Added interactive 3D Style Space visualization, statistics dashboard, and detailed analysis modal windows.' 
    },
    { 
      date: '2025-12-01', 
      milestone: 'Deployment & Optimization', 
      description: 'Dockerized the backend application, configured Git LFS for model weights, and deployed to Hugging Face Spaces & Vercel.' 
    },
    { 
      date: '2025-12-03', 
      milestone: 'Final Polish', 
      description: 'Refined UX/UI design (Pretendard font, Glassmorphism), fixed layout bugs, and finalized documentation.' 
    },
  ];

  const notebooks = [
    {
      title: 'Unsupervised Learning & Style Analysis',
      author: 'Dongjoon Lee',
      description: 'Exploratory data analysis using VGG16 feature extraction, PCA dimensionality reduction, and K-Means clustering to visualize the latent fashion space.',
      link: 'https://github.com/darlim9141/kcu5/blob/main/kmeans_notebook.ipynb', 
      tags: ['Unsupervised', 'PCA', 'K-Means', 't-SNE'],
    },
    {
      title: 'Supervised Learning: Style Classification',
      author: 'Jiho Han, Wonjun Jung',
      description: 'Implementation of a robust CNN classifier using Transfer Learning with ResNet-50. Covers data augmentation strategies and model performance evaluation.',
      link: 'https://github.com/darlim9141/kcu5/blob/main/cnn-notebook.ipynb', 
      tags: ['ResNet-50', 'Transfer Learning', 'CNN', 'Augmentation'],
    },
    {
      title: 'Backend Architecture & MLOps',
      author: 'Harim Jin', 
      description: 'A comprehensive guide to model serving. Details the architecture using FastAPI, Docker containerization, Git LFS management, and cloud deployment pipelines.',
      link: 'https://github.com/darlim9141/kcu5/blob/main/backend_notebook.ipynb', 
      tags: ['FastAPI', 'Docker', 'MLOps', 'Hugging Face'],
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
                Moip is a collaborative project developed by a diverse team of Computer Science students at the University of Wisconsin-Madison. The team consists of members with varying levels of experience, ranging from those currently enrolled in introductory OOP courses to advanced developers.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                This project was driven by a focus on experiential learning and technical exploration. We aimed to bridge the gap between theoretical knowledge and practical application by implementing a full-cycle software development process. The journey involved mastering various technologies including Supervised & Unsupervised Learning, Web Crawling for dataset creation, RESTful API development, and modern full-stack architecture using React and Python.
              </p>
              <p className="text-white/70 leading-relaxed">
                Functionally, Moip is an intelligent platform that leverages Machine Learning to analyze fashion images, classify them into distinct styles, provide statistical insights via dashboards, and render interactive 3D visualizations of style embeddings. It also incorporates Docker for containerization and Git for rigorous version control, ensuring a robust and scalable deployment workflow.
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
              <div className="text-white/70 leading-relaxed space-y-2">
                <p>
                  <strong className="text-white block mb-1">Frontend:</strong>
                  React (Vite), TypeScript, Tailwind CSS v4.0, Framer Motion, Recharts
                </p>
                <p>
                  <strong className="text-white block mb-1">Backend & AI:</strong>
                  Python, FastAPI, PyTorch, TensorFlow (ResNet-50), Google Gemini API, Scikit-learn (K-Means)
                </p>
                <p>
                  <strong className="text-white block mb-1">Infrastructure & Tools:</strong>
                  Docker, Hugging Face Spaces (GPU/CPU), Vercel, Git LFS
                </p>
              </div>
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
              <a href="https://github.com/darlim9141/kcu5/commits/main" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
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