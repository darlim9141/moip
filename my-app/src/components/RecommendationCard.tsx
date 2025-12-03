import { GlassCard } from './GlassCard';
import { ExternalLink } from 'lucide-react';

interface Recommendation {
  id: string;
  image: string;
  title: string;
  description: string;
  brands: string[];
}

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <GlassCard hover className="overflow-hidden">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={recommendation.image}
          alt={recommendation.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>
      
      <div className="p-5">
        <h3 className="text-white mb-2">{recommendation.title}</h3>
        <p className="text-white/60 text-sm mb-4 line-clamp-2">
          {recommendation.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {recommendation.brands.map(brand => (
            <span
              key={brand}
              className="px-3 py-1 rounded-lg text-xs text-white/70 border border-white/10"
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            >
              {brand}
            </span>
          ))}
        </div>
        
        <button className="w-full py-2 rounded-lg text-white/80 hover:text-white text-sm flex items-center justify-center gap-2 transition-colors border border-white/10 hover:border-white/20">
          <span>View More</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </GlassCard>
  );
}
