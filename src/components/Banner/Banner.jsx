import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../css/BannerDiamond.css'; // Import custom CSS for transition

// Importing images
import img1 from '../../assets/leftBackgroundSlide/1.jpg';
import img2 from '../../assets/leftBackgroundSlide/2.webp';
import img3 from '../../assets/leftBackgroundSlide/3.png';
import img4 from '../../assets/leftBackgroundSlide/4.png';
import img5 from '../../assets/leftBackgroundSlide/5.avif';
import img6 from '../../assets/leftBackgroundSlide/6.jpg';
import {getUserId} from '../GetUserId';

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
		<div className="relative bg-gray-800 text-white" style={{height: 700}}>
			{/* Background image slideshow with fade transition */}
			<div className={`slideshow-image ${fadeState}`}>
				<img
					className="w-full h-full object-fit"
					src={images[currentImageIndex]}
					alt="Banner Slide"
				/>
			</div>

			{/* Content with gradient background */}
			<div
				className="absolute inset-0 flex items-center justify-end text-white"
				style={{
					background: 'linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
				}}
			>
				<div
					className="text-end mr-52 p-8"
					style={{
						maxWidth: 550,
					}}
				>
					<h2 className="text-xl font-bold mb-4">
						GIẢM GIÁ ĐẾN 40% TRANG SỨC, 25% NHẪN CƯỚI
					</h2>
					<h2 className="text-3xl font-bold mb-4">Chúc mừng cửa hàng khai trương!</h2>
					<p className="mb-4">
						Khám phá những tính năng tuyệt vời và nội dung phù hợp dành riêng cho bạn.
					</p>
					<div className="flex items-center justify-end">
						<button
							className="mr-10 px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
							onClick={handleDiamondShopClick}
						>
							Mua Kim Cương
						</button>
						<button
							className="px-6 py-2 bg-primary rounded-lg uppercase font-semibold hover:bg-second w-full h-12"
							onClick={handleJewelryShopClick}
						>
							Mua Trang Sức
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
