import { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  uploadedImage: string | null;
  onClear: () => void;
}

export function ImageUpload({ onImageUpload, uploadedImage, onClear }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      onImageUpload(files[0]);
    }
  }, [onImageUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageUpload(files[0]);
    }
  }, [onImageUpload]);

  if (uploadedImage) {
    return (
      <GlassCard className="p-8 relative">
        <button
          onClick={onClear}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10"
        >
          <X className="w-4 h-4 text-white" />
        </button>
        <div className="flex flex-col items-center gap-4">
          <p className="text-white/70 text-sm">Uploaded Image</p>
          <img
            src={uploadedImage}
            alt="Uploaded fashion"
            className="max-w-full max-h-96 rounded-xl border border-white/10 shadow-2xl"
          />
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-12">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
          isDragging
            ? 'border-cyan-400/50 bg-cyan-400/5'
            : 'border-white/20 hover:border-white/30'
        }`}
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center">
            {isDragging ? (
              <Upload className="w-10 h-10 text-cyan-400 animate-bounce" />
            ) : (
              <ImageIcon className="w-10 h-10 text-cyan-400" />
            )}
          </div>
          
          <div>
            <h3 className="text-white mb-2">Upload Your Fashion Image</h3>
            <p className="text-white/50 text-sm max-w-md">
              Drag and drop your image here, or click the button below to select a file
            </p>
          </div>

          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>Choose Image</span>
            </div>
          </label>

          <p className="text-xs text-white/30">Supported formats: JPG, PNG, WebP</p>
        </div>
      </div>
    </GlassCard>
  );
}
