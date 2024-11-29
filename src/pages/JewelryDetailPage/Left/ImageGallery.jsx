import React, {useState, useEffect} from 'react';

export const ImageGallery = ({diamondJewelry, selectedMetal}) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [images, setImages] = useState([]);

	// Effect to update images based on selected metal
	useEffect(() => {
		const metalGroupImages = selectedMetal
			? diamondJewelry?.MetalGroups?.find((group) => group.MetalId === selectedMetal.Id)
					?.Images || []
			: diamondJewelry?.MetalGroups?.[0]?.Images || [];

		const imagePaths = metalGroupImages.map((image) => image.MediaPath);
		setImages(imagePaths);

		// Reset index when images change
		if (imagePaths.length > 0) {
			setCurrentImageIndex(0);
		}
	}, [diamondJewelry, selectedMetal]); // Only re-run when these props change

	// Automatically change the image every 3 seconds
	useEffect(() => {
		if (images.length > 1) {
			const interval = setInterval(() => {
				setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
			}, 3000);

			return () => clearInterval(interval); // Clean up on unmount
		}
	}, [images]);

	// Fallback to placeholder if no images
	const currentImage =
		Array.isArray(images) && images.length > 0
			? images[currentImageIndex]
			: 'https://via.placeholder.com/600x400?text=No+Image';

	const handleImageClick = (index) => {
		setCurrentImageIndex(index);
	};

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
				{Array.isArray(images) &&
					images.map((image, index) => (
						<div
							key={index}
							className={`cursor-pointer border rounded-lg hover:border-second ${
								index === currentImageIndex ? 'border-black' : 'border-gray-300'
							}`}
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
