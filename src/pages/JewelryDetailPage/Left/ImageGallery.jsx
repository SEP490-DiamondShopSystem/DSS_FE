import {Fullscreen} from '@mui/icons-material';
import {Image} from 'antd';
import React, {useState} from 'react';

export const ImageGallery = () => {
	const images = [
		'https://via.placeholder.com/600x400?text=Image+1',
		'https://via.placeholder.com/600x400?text=Image+2',
		'https://via.placeholder.com/600x400?text=Image+3',
	];

	const [currentImage, setCurrentImage] = useState(images[0]);

	const handleImageClick = (index) => {
		setCurrentImage(images[index]);
	};

	return (
		<div className="container mx-auto">
			<div className="relative large-image mb-4">
				<Image
					width="100%"
					height={400}
					src={currentImage}
					alt="Large"
					className="border rounded-lg"
				/>
			</div>

			<div className="thumbnail-container flex justify-start space-x-4">
				{images.map((image, index) => (
					<div
						key={index}
						className="cursor-pointer border rounded-lg hover:border-second"
						onClick={() => handleImageClick(index)}
					>
						<Image
							width={100}
							height={80}
							preview={false}
							src={image}
							alt={`Thumbnail ${index + 1}`}
							className="rounded-lg"
						/>
					</div>
				))}
			</div>
		</div>
	);
};
