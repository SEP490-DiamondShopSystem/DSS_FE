import React, {useState, useEffect} from 'react';
import {Image} from 'antd';
import {useDispatch} from 'react-redux';
import {fetchDiamondFiles} from '../../../redux/slices/fileSlice';

export const ImageGallery = ({diamondId}) => {
	const dispatch = useDispatch();
	const [imageFiles, setImageFiles] = useState([]);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		if (diamondId) {
			dispatch(fetchDiamondFiles(diamondId))
				.unwrap()
				.then((response) => {
					if (response && response.BaseImages) {
						// Filter only images with a valid ContentType (e.g., 'image/jpeg', 'image/png')
						const validImages = response.BaseImages.filter((image) =>
							image.ContentType.startsWith('image/')
						);
						setImageFiles(validImages);
						if (validImages.length > 0) {
							setCurrentImageIndex(0); // Start with the first image
						}
					}
				})
				.catch((error) => {});
		}
	}, [diamondId, dispatch]);

	// Auto-change functionality
	useEffect(() => {
		if (imageFiles.length > 1) {
			const interval = setInterval(() => {
				setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageFiles.length);
			}, 3000); // Change image every 3 seconds

			return () => clearInterval(interval); // Cleanup on unmount
		}
	}, [imageFiles]);

	const handleImageClick = (index) => {
		setCurrentImageIndex(index); // Update current image index manually
	};

	return (
		<div className="container mx-auto">
			{imageFiles.length > 0 ? (
				<>
					{/* Centered Large Image */}
					<div
						className="relative large-image mb-4 border rounded-lg flex justify-center items-center"
						style={{height: '400px'}}
					>
						<Image
							width="auto"
							height="100%"
							src={
								imageFiles[currentImageIndex]?.MediaPath ||
								'https://via.placeholder.com/400'
							}
							alt="Large"
							style={{maxHeight: '100%', maxWidth: '100%'}}
						/>
					</div>

					{/* Thumbnails Section */}
					<div
						className="thumbnail-container flex space-x-4 overflow-x-auto"
						style={{
							whiteSpace: 'nowrap',
							paddingBottom: '10px', // Prevent scrollbar overlap
						}}
					>
						{imageFiles.map((image, index) => (
							<div
								key={index}
								className={`inline-block cursor-pointer border rounded-lg hover:border-second ${
									index === currentImageIndex ? 'border-second' : ''
								}`}
								onClick={() => handleImageClick(index)}
								style={{flexShrink: 0}} // Prevent shrinking in a flex container
							>
								<Image
									width="100%"
									height={80}
									preview={false}
									src={image.MediaPath}
									alt={`Thumbnail ${index + 1}`}
									className="rounded-lg"
								/>
							</div>
						))}
					</div>
				</>
			) : (
				<p>No images available for this diamond.</p>
			)}
		</div>
	);
};
