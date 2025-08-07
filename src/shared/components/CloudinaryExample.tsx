import React from 'react';
import { SingleFileUpload } from './SingleFileUpload';

export const CloudinaryExample: React.FC = () => {
  const handleImageUpload = (result: any) => {
    console.log('Image uploaded:', result.secure_url);
  };

  const handlePdfUpload = (result: any) => {
    console.log('PDF uploaded:', result.secure_url);
  };

  const handleAnyFileUpload = (result: any) => {
    console.log('File uploaded:', result.secure_url);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Cloudinary Upload Examples</h2>
      
      {/* Image Upload Example */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Image Upload</h3>
        <SingleFileUpload
          label="Upload Profile Image"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          maxSize={5}
          folder="profile-images"
          onUploadComplete={handleImageUpload}
          onUploadError={(error) => console.error('Image upload error:', error)}
          placeholder="Select an image file"
          showPreview={true}
        />
      </div>

      {/* PDF Upload Example */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">PDF Upload</h3>
        <SingleFileUpload
          label="Upload Document"
          accept=".pdf,application/pdf"
          maxSize={10}
          folder="documents"
          onUploadComplete={handlePdfUpload}
          onUploadError={(error) => console.error('PDF upload error:', error)}
          placeholder="Select a PDF file"
          showPreview={false}
        />
      </div>

      {/* Any File Upload Example */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Any File Upload</h3>
        <SingleFileUpload
          label="Upload Any File"
          accept="*/*"
          maxSize={20}
          folder="general-files"
          onUploadComplete={handleAnyFileUpload}
          onUploadError={(error) => console.error('File upload error:', error)}
          placeholder="Select any file"
          showPreview={false}
        />
      </div>

      {/* Video Upload Example */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Video Upload</h3>
        <SingleFileUpload
          label="Upload Video"
          accept="video/mp4,video/avi,video/mov,video/wmv"
          maxSize={50}
          folder="videos"
          onUploadComplete={(result) => console.log('Video uploaded:', result.secure_url)}
          onUploadError={(error) => console.error('Video upload error:', error)}
          placeholder="Select a video file"
          showPreview={false}
        />
      </div>
    </div>
  );
};



