import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

// Importing images
import img1 from '../../assets/leftBackgroundSlide/1.jpg';
import img2 from '../../assets/leftBackgroundSlide/2.webp';
import img3 from '../../assets/leftBackgroundSlide/3.png';
import img4 from '../../assets/leftBackgroundSlide/4.png';
import img5 from '../../assets/leftBackgroundSlide/5.avif';
import img6 from '../../assets/leftBackgroundSlide/6.jpg';
import {getUserId} from '../GetUserId';
import {Row, Col, Button} from 'antd'; // Importing Ant Design components

export const BannerDiamond = () => {
	const navigate = useNavigate();
	const userId = getUserId();

	// Array of imported image paths
	const images = [img1, img2, img3, img4, img5, img6];

	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [fadeState, setFadeState] = useState('fade-in'); // Track fade state

	// Function to cycle through the images with a fade effect
	useEffect(() => {
		const intervalId = setInterval(() => {
			setFadeState('fade-out'); // Start fading out
			setTimeout(() => {
				setCurrentImageIndex((prevIndex) =>
					prevIndex === images.length - 1 ? 0 : prevIndex + 1
				);
				setFadeState('fade-in'); // Start fading in
			}, 1000); // 1 second for fade-out before switching image
		}, 6000); // Change image every 6 seconds, including 1 second fade duration

		return () => clearInterval(intervalId); // Cleanup interval on component unmount
	}, [images.length]);

	const handleDiamondShopClick = () => {
		navigate('/diamond/search');
		localStorage.setItem('diamondChoice', 'Diamond Choice');
		localStorage.removeItem('jewelryChoice');
		localStorage.removeItem('jewelryType');
		localStorage.removeItem('selected');
		localStorage.removeItem(`jewelryModel_${userId}`);
	};

	const handleJewelryShopClick = () => {
		navigate('/jewelry-model/search');
		localStorage.removeItem('jewelryChoice');
		localStorage.removeItem('diamondChoice');
		localStorage.removeItem('jewelryType');
		localStorage.removeItem('selected');
		localStorage.removeItem('jewelry');
	};

	return (
		<div className="relative bg-gray-800">
			{/* Background image slideshow with fade transition */}
			<div className={`slideshow-image ${fadeState}`}>
				<img
					className="w-full object-cover"
					style={{maxHeight: 700}}
					src={images[currentImageIndex]}
					alt="Banner Slide"
				/>
			</div>

			{/* Content with gradient background */}
			<div
				className="absolute inset-0 flex items-center justify-end text-tintWhite"
				style={{
					background: 'linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
				}}
			>
				<Row className="w-full" justify="end" align="middle">
					<Col xs={24} sm={18} md={8} lg={8} xl={8}>
						{/* Make the content visible only on medium and larger screens */}
						<div className="text-end p-8 max-w-lg hidden md:block">
							
							<h2 className="text-3xl font-bold mb-4">
								Chúc mừng cửa hàng khai trương!
							</h2>
							<div className="my-4">
								Khám phá những món trang sức và kim cương phù hợp dành riêng
								cho bạn.
							</div>
							<div className="flex flex-col sm:flex-row justify-end ">
								<Button
									className="mr-0 sm:mr-10 mb-4 sm:mb-0 px-6 py-2 rounded-lg uppercase font-semibold hover:bg-secondary w-full sm:w-auto h-12 bg-primary"
									onClick={handleDiamondShopClick}
								>
									Mua Kim Cương
								</Button>
								<Button
									className="px-6 py-2 rounded-lg uppercase font-semibold hover:bg-secondary w-full sm:w-auto h-12 bg-primary"
									onClick={handleJewelryShopClick}
								>
									Mua Trang Sức
								</Button>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
};
