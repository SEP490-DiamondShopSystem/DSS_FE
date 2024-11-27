import React, { useState, useEffect } from 'react';
import { Image } from 'antd';

export const ImageGallery = ({ diamondJewelry, selectedMetal }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Get images from the selected metal's MetalGroup
    const metalGroupImages = selectedMetal
        ? diamondJewelry?.MetalGroups?.find(
            (group) => group.MetalId === selectedMetal.Id
          )?.Images || []
        : diamondJewelry?.MetalGroups?.[0]?.Images || [];

    // Extract image paths
    const images = metalGroupImages.map(image => image.MediaPath);

    // Update current image index when metal changes, but keep the same relative position
    useEffect(() => {
        // Ensure the index is within the new images array bounds
        setCurrentImageIndex(prevIndex => 
            Math.min(prevIndex, images.length - 1)
        );
    }, [selectedMetal, diamondJewelry]);

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
    };

    // Fallback to placeholder if no images
    const currentImage = images.length > 0 
        ? images[currentImageIndex] 
        : 'https://via.placeholder.com/600x400?text=No+Image';

    return (
        <div className="container mx-auto">
            <div className="relative large-image mb-4 aspect-square">
                <div className="w-full h-full flex items-center justify-center">
                    <img 
                        src={currentImage} 
                        alt="Jewelry Image" 
                        className="max-w-full max-h-full object-contain" 
                    />
                </div>
            </div>

            <div className="thumbnail-container flex justify-start space-x-4">
                {images.map((image, index) => (
                    <div 
                        key={index} 
                        className={`
                            cursor-pointer 
                            border 
                            rounded-lg 
                            hover:border-second
                            ${index === currentImageIndex ? 'border-black' : 'border-gray-300'}
                        `} 
                        onClick={() => handleImageClick(index)}
                    >
                        <img 
                            src={image} 
                            alt={`Thumbnail ${index + 1}`} 
                            className="w-24 h-20 object-cover rounded-lg" 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};