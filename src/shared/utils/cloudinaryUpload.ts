import { uploadToCloudinary } from '../services/cloudinary';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Upload a file to Cloudinary
 * @param file - The file to upload
 * @param folder - The folder to upload to
 * @returns Promise with upload result
 */
export const uploadFileToCloudinary = async (
  file: File, 
  folder: string = 'dashboard'
): Promise<UploadResult> => {
  try {
    const result = await uploadToCloudinary(file, { folder });
    return {
      success: true,
      url: result.secure_url,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
};

/**
 * Upload multiple files to Cloudinary
 * @param files - Array of files to upload
 * @param folder - The folder to upload to
 * @returns Promise with array of upload results
 */
export const uploadMultipleFilesToCloudinary = async (
  files: File[], 
  folder: string = 'dashboard'
): Promise<UploadResult[]> => {
  const uploadPromises = files.map(file => uploadFileToCloudinary(file, folder));
  return Promise.all(uploadPromises);
};
