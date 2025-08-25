import React, { useRef, useState } from 'react';
import ImageClicker from '@/shared/assets/icons/Upload.svg';
import Trash from '@/shared/assets/icons/delete.svg';

interface SingleFileUploadProps {
    onFileSelect?: (file: File) => void;
    onFileRemove?: () => void;
    onUploadError?: (error: string) => void;
    accept?: string;
    maxSize?: number; // in MB
    label?: string;
    className?: string;
    disabled?: boolean;
    showPreview?: boolean;
    placeholder?: string;
    selectedFile?: File | null;
    existingImage?: string | null; // Add this prop for existing images
}

export const SingleFileUpload: React.FC<SingleFileUploadProps> = ({
    onFileSelect,
    onFileRemove,
    onUploadError,
    accept = 'image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/tiff,image/svg+xml',
    maxSize = 5, // 5MB default
    label = 'Upload file',
    className = '',
    disabled = false,
    showPreview = true,
    placeholder = 'No file chosen',
    selectedFile = null,
    existingImage = null, // Add this prop
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File): string | null => {
        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
            return `File size must be less than ${maxSize}MB`;
        }

        // Check file type - more flexible validation
        if (accept !== '*/*') {
            const acceptedTypes = accept.split(',').map(type => type.trim());
            const fileType = file.type.toLowerCase();
            const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

            const isAccepted = acceptedTypes.some(type => {
                // Handle wildcard types like image/*
                if (type.includes('*')) {
                    const baseType = type.split('/')[0];
                    return fileType.startsWith(baseType + '/');
                }
                // Handle specific MIME types
                if (type.startsWith('.')) {
                    return fileExtension === type;
                }
                return fileType === type;
            });

            if (!isAccepted) {
                // Show a cleaner error message
                const typeNames = acceptedTypes
                    .map(type => {
                        if (type.includes('*')) return type.split('/')[0] + ' files';
                        if (type.startsWith('.')) return type.toUpperCase();
                        return type.split('/')[1]?.toUpperCase() || type;
                    })
                    .join(', ');
                return `Please select a ${typeNames} file`;
            }
        }

        return null;
    };

    const createFilePreview = (file: File): string => {
        if (file.type.startsWith('image/')) {
            return URL.createObjectURL(file);
        }
        return '';
    };

    const handleFileSelect = (files: FileList | null) => {
        if (!files || files.length === 0) return;

        const file = files[0];
        const validationError = validateFile(file);

        if (validationError) {
            setError(validationError);
            onUploadError?.(validationError);
            return;
        }

        // Clear previous error
        setError(null);

        // Create preview
        const filePreview = createFilePreview(file);
        setPreview(filePreview);

        // Notify parent component
        onFileSelect?.(file);
    };

    const removeFile = () => {
        setPreview(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onFileRemove?.();
    };

    const handleClick = () => {
        if (!disabled) {
            fileInputRef.current?.click();
        }
    };

    // Use selectedFile prop if provided, otherwise use local state
    const currentFile = selectedFile;
    const currentPreview = preview;
    
    // Show existing image if no new file is selected
    const displayPreview = currentPreview || (existingImage && !currentFile) ? existingImage : null;

    return (
        <div className={`w-full ${className}`}>
            {/* File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden cursor-pointer"
                disabled={disabled}
            />

            {/* Label */}
            {label && (
                <label className="block text-sm font-medium mb-1 text-[#000000]/70 cursor-pointer">
                    {label}
                </label>
            )}

            {/* Upload Area */}
            <div className="relative bg-[#D9D9D9]/70 p-2 rounded-xl">
                <div className="relative flex items-center">
                    <input
                        type="file"
                        accept={accept}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => handleFileSelect(e.target.files)}
                        disabled={disabled}
                    />
                    <button
                        type="button"
                        className={`w-[40%] rounded-lg flex flex-row items-center bg-white pl-3 py-1 h-7 mr-4 text-left text-gray-700 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                        onClick={handleClick}
                        disabled={disabled}
                    >
                        <img src={ImageClicker} alt="Upload Icon" className="h-4 w-4 mr-3" />
                        <p className="text-xs">Upload File</p>
                    </button>

                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-600">
                            {currentFile ? currentFile.name : placeholder}
                        </p>
                    </div>

                    {currentFile && (
                        <button
                            type="button"
                            onClick={removeFile}
                            className="ml-2 p-1 hover:bg-gray-200 rounded"
                            disabled={disabled}
                        >
                            <img src={Trash} alt="Remove" className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="mt-2 text-red-500 text-xs break-words">
                    {error}
                </div>
            )}

            {/* File Preview */}
            {showPreview && displayPreview && (
                <div className="mt-3">
                    <div className="relative inline-block">
                        <img
                            src={displayPreview}
                            alt={currentFile?.name || 'Preview'}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
