import {Fullscreen} from '@mui/icons-material';
import {Image} from 'antd';
import React, {useEffect, useState} from 'react';

export const ImageGallery = ({jewelry}) => {
	// Check if Model and Thumbnail are present

	// Initialize the first image as the current image
	const [images, setImages] = useState();
	const [currentImage, setCurrentImage] = useState();

	const handleImageClick = (index) => {
		setCurrentImage(images[index]);
	};

	useEffect(() => {
		const images = jewelry?.Model?.Thumbnail
			? [jewelry.Model.Thumbnail.MediaPath] // Use the single thumbnail path
			: [];
		if (images?.length > 0) {
			setImages(images);
			setCurrentImage(images[0]);
		} else {
			setCurrentImage(null);
		}
	}, [jewelry]);

	return (
		<div className="container mx-auto">
			{Array.isArray(images) && images.length > 0 ? (
				<>
					<div className="relative large-image mb-4 aspect-square">
						<div className="w-full h-full flex items-center justify-center">
							<Image
								src={currentImage}
								alt="Large"
								className="w-24 h-20 object-cover rounded-lg"
							/>
						</div>
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
									className="w-24 h-20 object-cover rounded-lg"
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
