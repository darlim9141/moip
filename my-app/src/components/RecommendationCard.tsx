import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { ShoppingBag } from 'lucide-react'; // 아이콘 변경 (ExternalLink -> ShoppingBag)

interface Recommendation {
  id: string;
  image: string;
  title: string;
  description: string;
  brands: string[];
  shopping_url?: string; // [추가] 백엔드에서 주는 쇼핑 링크 (선택적)
}

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  // 이미지 로딩 실패 시 처리를 위한 state
  const [imgError, setImgError] = useState(false);

  // 백엔드 URL이 있으면 쓰고, 없으면 제목+브랜드로 검색 링크 자동 생성 (안전장치)
  const searchUrl = recommendation.shopping_url || 
    `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(recommendation.title + ' ' + (recommendation.brands[0] || 'fashion'))}`;

  return (
    <GlassCard hover className="h-full flex flex-col overflow-hidden group">
      {/* 이미지 영역 */}
      <div className="aspect-[4/3] relative overflow-hidden bg-black/20">
        {!imgError ? (
          <img
            src={recommendation.image}
            alt={recommendation.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgError(true)} // 이미지가 깨지면 에러 상태로 변경
            loading="lazy"
          />
        ) : (
          // 이미지가 없을 때 보여줄 대체 화면
          <div className="w-full h-full flex items-center justify-center bg-white/5">
            <span className="text-white/30 text-xs">Image not available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
      </div>
      
      {/* 텍스트 및 버튼 영역 */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-medium text-lg mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors">
          {recommendation.title}
        </h3>
        
        <p className="text-white/60 text-sm mb-4 line-clamp-2 flex-1">
          {recommendation.description}
        </p>
        
        <div className="space-y-4 mt-auto">
          {/* 브랜드 태그 */}
          <div className="flex flex-wrap gap-2">
            {recommendation.brands.map(brand => (
              <span
                key={brand}
                className="px-2.5 py-1 rounded-xl text-xs font-medium text-white/70 border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                {brand}
              </span>
            ))}
          </div>
          
          {/* [핵심 변경] 쇼핑하러 가기 버튼 (a 태그로 변경) */}
          <a 
            href={searchUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-500/30 border border-white/10 flex items-center justify-center gap-2 transition-all duration-300 group/btn"
          >
            <span className="text-sm font-medium">Shop Now</span>
            <ShoppingBag className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </a>
        </div>
      </div>
    </GlassCard>
  );
}