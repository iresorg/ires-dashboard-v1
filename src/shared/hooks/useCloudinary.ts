import { useState, useCallback } from 'react';
import { 
  cloudinaryService, 
  uploadToCloudinary, 
  getOptimizedImageUrl,
  deleteFromCloudinary,
  type UploadResponse,
  type UploadOptions 
} from '../services/cloudinary';

export interface UseCloudinaryReturn {
  uploadFile: (file: File, options?: UploadOptions) => Promise<UploadResponse>;
  uploadMultipleFiles: (files: File[], options?: UploadOptions) => Promise<UploadResponse[]>;
  getOptimizedUrl: (publicId: string, options?: {
    width?: number;
    height?: number;
    format?: string;
    quality?: string;
  }) => string;
  getThumbnailUrl: (publicId: string, width?: number, height?: number) => string;
  getSimpleUrl: (publicId: string) => string;
  deleteFile: (publicId: string) => Promise<void>;
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
  clearError: () => void;
}

export const useCloudinary = (): UseCloudinaryReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const uploadFile = useCallback(async (file: File, options?: UploadOptions): Promise<UploadResponse> => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Simulate progress (Cloudinary doesn't provide progress events for direct uploads)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const result = await uploadToCloudinary(file, options);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      throw err;
    } finally {
      setIsUploading(false);
      // Reset progress after a delay
      setTimeout(() => setUploadProgress(0), 1000);
    }
  }, []);

  const uploadMultipleFiles = useCallback(async (files: File[], options?: UploadOptions): Promise<UploadResponse[]> => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      const results = await cloudinaryService.uploadMultipleFiles(files, options);
      setUploadProgress(100);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Multiple upload failed');
      throw err;
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  }, []);

  const getOptimizedUrl = useCallback((publicId: string, options?: {
    width?: number;
    height?: number;
    format?: string;
    quality?: string;
  }) => {
    return getOptimizedImageUrl(publicId, options);
  }, []);

  const getThumbnailUrl = useCallback((publicId: string, width: number = 150, height: number = 150) => {
    return cloudinaryService.getThumbnailUrl(publicId, width, height);
  }, []);

  const getSimpleUrl = useCallback((publicId: string) => {
    return cloudinaryService.getSimpleUrl(publicId);
  }, []);

  const deleteFile = useCallback(async (publicId: string): Promise<void> => {
    setError(null);
    try {
      await deleteFromCloudinary(publicId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
      throw err;
    }
  }, []);

  return {
    uploadFile,
    uploadMultipleFiles,
    getOptimizedUrl,
    getThumbnailUrl,
    getSimpleUrl,
    deleteFile,
    isUploading,
    uploadProgress,
    error,
    clearError,
  };
};
