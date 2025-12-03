import { useState, useEffect } from 'react';
import { ImageUpload } from './ImageUpload';
import { StyleBreakdown } from './StyleBreakdown';
import { StyleVisualization } from './StyleVisualization';
import { RecommendationCard } from './RecommendationCard';
import { motion } from 'motion/react';

// 백엔드 응답 타입 정의
interface AnalysisResponse {
  style_breakdown: { [key: string]: number };
  coordinates: { x: number; y: number; z: number };
  recommendations: any[];
}

export function HomePage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // 분석 결과 데이터 State
  const [styleData, setStyleData] = useState<any>(null);
  const [userPoint, setUserPoint] = useState<{x: number, y: number, z: number} | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  
  // [추가] 3D 배경 데이터 State
  const [backgroundPoints, setBackgroundPoints] = useState<any[]>([]);

  // [추가] 페이지 로드 시 배경 데이터 가져오기
  useEffect(() => {
    fetch('import.meta.env.VITE_API_URL/api/graph-data')
      .then(res => res.json())
      .then(data => {
        console.log("Graph data loaded:", data.length, "points");
        setBackgroundPoints(data);
      })
      .catch(err => console.error("Failed to load graph data:", err));
  }, []);

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsAnalyzing(true);
    setShowResults(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('import.meta.env.VITE_API_URL/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data: AnalysisResponse = await response.json();
      
      setStyleData(data.style_breakdown);
      setUserPoint(data.coordinates);
      setRecommendations(data.recommendations);
      
      setShowResults(true);

    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("분석 중 오류가 발생했습니다.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setUploadedImage(null);
    setShowResults(false);
    setIsAnalyzing(false);
    setStyleData(null);
    setUserPoint(null);
    setRecommendations([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12"
      >
        <h1 className="text-white mb-4 text-5xl">
          Discover Your Fashion Identity
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Upload an image and let Moip's AI analyze your unique style across multiple fashion categories
        </p>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <ImageUpload
          onImageUpload={handleImageUpload}
          uploadedImage={uploadedImage}
          onClear={handleClear}
        />
      </motion.div>

      {/* Loading State */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="inline-block w-16 h-16 border-4 border-white/20 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
          <p className="text-white/70">Analyzing your fashion style...</p>
        </motion.div>
      )}

      {/* Results Section */}
      {showResults && styleData && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            <StyleBreakdown data={styleData} />
            
            {/* [변경] 배경 점 데이터(points)도 같이 전달 */}
            {userPoint && (
              <StyleVisualization 
                userPoint={userPoint} 
                points={backgroundPoints} 
              />
            )}
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-white mb-2">Recommended Accessories & Brands</h2>
              <p className="text-white/50">Curated selections that match your style profile</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <RecommendationCard recommendation={rec} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}