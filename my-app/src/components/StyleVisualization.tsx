import { useEffect, useRef } from 'react';
import { GlassCard } from './GlassCard';

interface GraphPoint {
  id: number;
  filename: string;
  x: number;
  y: number;
  z: number;
  cluster: number;
  original_label: string;
}

interface StyleVisualizationProps {
  userPoint?: { x: number; y: number; z: number } | null;
  points?: GraphPoint[];
}

const styleColors: { [key: string]: string } = {
  minimal: '#06b6d4',
  casual: '#8b5cf6',
  classic: '#f59e0b',
  street: '#10b981',
};

export function StyleVisualization({ userPoint, points = [] }: StyleVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth * window.devicePixelRatio;
        canvas.height = parent.clientHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // [핵심 변경] 전체를 조망하기 위한 스케일 설정
    // 값이 작을수록 점들이 중앙으로 모입니다. (Zoom Out 효과)
    const GLOBAL_SCALE = 15; 
    
    // 카메라 거리 (값이 클수록 왜곡이 줄고 멀리서 보는 느낌)
    const CAMERA_DIST = 700;

    let rotation = 0;
    let animationFrameId: number;

    const project3D = (x: number, y: number, z: number, rot: number) => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);
      
      const rotatedX = x * cosR - z * sinR;
      const rotatedZ = x * sinR + z * cosR;
      
      // 원근 투영 계산
      const scale = CAMERA_DIST / (CAMERA_DIST + rotatedZ * 20); 
      
      // 카메라 뒤에 있는 점 숨기기
      if (scale < 0) return null;

      const projectedX = width / 2 + rotatedX * GLOBAL_SCALE * scale;
      const projectedY = height / 2 - y * GLOBAL_SCALE * scale;
      
      return { x: projectedX, y: projectedY, scale, zDepth: rotatedZ };
    };

    const animate = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      
      ctx.clearRect(0, 0, width, height);
      rotation += 0.002; 

      // 1. 배경 점 그리기
      if (points && points.length > 0) {
        points.forEach(point => {
          if (point.x === undefined) return;

          const projected = project3D(point.x, point.y, point.z, rotation);
          if (!projected) return;

          // 점 크기 (멀리서 보니까 점도 조금 작게)
          const size = Math.max(0.8, 2.5 * projected.scale);
          
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
          
          const label = point.original_label?.toLowerCase() || 'unknown';
          const color = styleColors[label] || styleColors['unknown'];
          
          ctx.fillStyle = color;
          ctx.fill();
        });
      }

      // 2. 내 위치 그리기
      if (userPoint) {
        const projected = project3D(userPoint.x, userPoint.y, userPoint.z, rotation);
        
        if (projected) {
          // Glow Effect
          const gradient = ctx.createRadialGradient(
            projected.x, projected.y, 0,
            projected.x, projected.y, 20
          );
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(projected.x - 20, projected.y - 20, 40, 40);
          
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          
          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [userPoint, points]);

  return (
    <GlassCard className="p-8">
      <div className="mb-6 text-center">
        <h2 className="text-white mb-2">Style Space Visualization</h2>
        <p className="text-white/50 text-sm">
          Your image plotted within the learned fashion-space
          {points.length > 0 && ` (${points.length} reference points)`}
        </p>
      </div>
      
      {/* 캔버스 높이를 넉넉하게 600px로 설정 */}
      <div className="relative w-full h-[600px] rounded-xl bg-black/20 overflow-hidden border border-white/5">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />
        
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3 justify-center pointer-events-none">
          {Object.entries(styleColors).slice(0, 5).map(([name, color]) => (
            <div key={name} className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
              <span className="text-white/70 text-xs capitalize">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}