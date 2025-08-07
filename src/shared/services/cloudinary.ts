import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dlfiul9k2';

// Initialize Cloudinary instance
export const cld = new Cloudinary({ 
  cloud: { 
    cloudName: CLOUDINARY_CLOUD_NAME 
  } 
});

// Types for the service
export interface UploadResponse {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
}

export interface UploadOptions {
  folder?: string;
  public_id?: string;
  overwrite?: boolean;
  resource_type?: 'image' | 'video' | 'raw' | 'auto';
  transformation?: string;
}

export interface CloudinaryService {
  uploadFile: (file: File, options?: UploadOptions) => Promise<UploadResponse>;
  getOptimizedUrl: (publicId: string, options?: {
    width?: number;
    height?: number;
    format?: string;
    quality?: string;
  }) => string;
  deleteFile: (publicId: string) => Promise<void>;
}

// Cloudinary upload preset - you'll need to create this in your Cloudinary dashboard
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ires_uploads';

class CloudinaryServiceImpl implements CloudinaryService {
  
  /**
   * Upload a file to Cloudinary and return the response
   * @param file - The file to upload
   * @param options - Upload options
   * @returns Promise with upload response
   */
  async uploadFile(file: File, options: UploadOptions = {}): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    
    // Add optional parameters
    if (options.folder) {
      formData.append('folder', options.folder);
    }
    if (options.public_id) {
      formData.append('public_id', options.public_id);
    }
    if (options.overwrite !== undefined) {
      formData.append('overwrite', options.overwrite.toString());
    }
    if (options.resource_type) {
      formData.append('resource_type', options.resource_type);
    }
    if (options.transformation) {
      formData.append('transformation', options.transformation);
    }

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result as UploadResponse;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get an optimized URL for a Cloudinary image
   * @param publicId - The public ID of the image
   * @param options - Optimization options
   * @returns Optimized URL string
   */
  getOptimizedUrl(
    publicId: string, 
    options: {
      width?: number;
      height?: number;
      format?: string;
      quality?: string;
    } = {}
  ): string {
    let image = cld.image(publicId);

    // Apply transformations
    if (options.width || options.height) {
      image = image.resize(
        auto()
          .gravity(autoGravity())
          .width(options.width || 500)
          .height(options.height || 500)
      );
    }

    // Apply delivery optimizations
    image = image
      .delivery(format('auto'))
      .delivery(quality('auto'));

    return image.toURL();
  }

  /**
   * Delete a file from Cloudinary
   * @param publicId - The public ID of the file to delete
   */
  async deleteFile(publicId: string): Promise<void> {
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/delete_by_token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: publicId, // You might need to implement proper token generation
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Cloudinary delete error:', error);
      throw new Error(`Failed to delete file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Upload multiple files and return their URLs
   * @param files - Array of files to upload
   * @param options - Upload options
   * @returns Promise with array of upload responses
   */
  async uploadMultipleFiles(
    files: File[], 
    options: UploadOptions = {}
  ): Promise<UploadResponse[]> {
    const uploadPromises = files.map(file => this.uploadFile(file, options));
    return Promise.all(uploadPromises);
  }

  /**
   * Get a simple URL for a Cloudinary image (no transformations)
   * @param publicId - The public ID of the image
   * @returns Simple URL string
   */
  getSimpleUrl(publicId: string): string {
    return cld.image(publicId).toURL();
  }

  /**
   * Generate a thumbnail URL
   * @param publicId - The public ID of the image
   * @param width - Thumbnail width
   * @param height - Thumbnail height
   * @returns Thumbnail URL string
   */
  getThumbnailUrl(publicId: string, width: number = 150, height: number = 150): string {
    return cld
      .image(publicId)
      .resize(auto().gravity(autoGravity()).width(width).height(height))
      .delivery(format('auto'))
      .delivery(quality('auto'))
      .toURL();
  }
}

// Export the service instance
export const cloudinaryService = new CloudinaryServiceImpl();

// Export utility functions for common use cases
export const uploadToCloudinary = cloudinaryService.uploadFile.bind(cloudinaryService);
export const getOptimizedImageUrl = cloudinaryService.getOptimizedUrl.bind(cloudinaryService);
export const deleteFromCloudinary = cloudinaryService.deleteFile.bind(cloudinaryService);
