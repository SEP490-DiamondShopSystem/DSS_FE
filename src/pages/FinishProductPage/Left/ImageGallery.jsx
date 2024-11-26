import { Fullscreen } from '@mui/icons-material';
import { Image } from 'antd';
import React, { useState } from 'react';

export const ImageGallery = ({ jewelry }) => {
  // Check if Model and Thumbnail are present
  const images = jewelry?.Model?.Thumbnail
    ? [jewelry.Model.Thumbnail.MediaPath] // Use the single thumbnail path
    : []; // Fallback to an empty array if no thumbnail is available

  // Initialize the first image as the current image
  const [currentImage, setCurrentImage] = useState(images[0] || '');

  const handleImageClick = (index) => {
    setCurrentImage(images[index]);
  };

  return (
    <div className="container mx-auto">
      {images.length > 0 ? (
        <>
          {/* Large Image Section */}
          <div className="relative large-image mb-4">
            <Image
              width="100%"
              height={400}
              src={currentImage}
              alt="Large"
              className="border rounded-lg"
            />
          </div>

          {/* Thumbnails Section */}
          <div className="thumbnail-container flex justify-start space-x-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="cursor-pointer border rounded-lg hover:border-second"
                onClick={() => handleImageClick(index)}
              >
                <Image
                  width="100%"
                  height={80}
                  preview={false}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};
