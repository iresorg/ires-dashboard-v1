/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import { useCloudinary } from '../hooks/useCloudinary';
import { Upload, X, CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  onUploadComplete: (result: any) => void;
  onUploadError?: (error: string) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  folder?: string;
  className?: string;
  disabled?: boolean;
  showPreview?: boolean;
}

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  uploaded?: boolean;
  publicId?: string;
  url?: string;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  onUploadError,
  multiple = false,
  accept = 'image/*',
  maxSize = 10, // 10MB default
  folder,
  className = '',
  disabled = false,
  showPreview = true,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  
  const {
    uploadFile,
    uploadMultipleFiles,
    isUploading,
    uploadProgress,
    error,
    clearError,
  } = useCloudinary();


  const createFilePreview = (file: File): string => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return '';
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const newFiles: UploadedFile[] = fileArray.map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: createFilePreview(file),
      uploaded: false,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    try {
      if (multiple) {
        const results = await uploadMultipleFiles(fileArray, { folder });
        
        setUploadedFiles(prev => 
          prev.map((uploadedFile, index) => ({
            ...uploadedFile,
            uploaded: true,
            publicId: results[index]?.public_id,
            url: results[index]?.secure_url,
          }))
        );

        onUploadComplete(results);
      } else {
        const result = await uploadFile(fileArray[0], { folder });
        
        setUploadedFiles(prev => 
          prev.map((uploadedFile, index) => 
            index === 0 ? {
              ...uploadedFile,
              uploaded: true,
              publicId: result.public_id,
              url: result.secure_url,
            } : uploadedFile
          )
        );

        onUploadComplete(result);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      onUploadError?.(errorMessage);
      
      setUploadedFiles(prev => 
        prev.map((uploadedFile, index) => 
          index < fileArray.length ? {
            ...uploadedFile,
            error: errorMessage,
          } : uploadedFile
        )
      );
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
        disabled={disabled}
      />

      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${isUploading ? 'pointer-events-none' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center space-y-2">
          <Upload className="w-8 h-8 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-gray-500">
              {accept === 'image/*' ? 'Images' : 'Files'} up to {maxSize}MB
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        {isUploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{uploadProgress}%</p>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-2 flex items-center space-x-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
          <button
            onClick={clearError}
            className="text-red-400 hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* File Previews */}
      {showPreview && uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              {file.preview ? (
                <img
                  src={file.preview}
                  alt={file.file.name}
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <div className="flex items-center space-x-2">
                {file.uploaded && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {file.error && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
