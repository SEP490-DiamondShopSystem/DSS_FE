import React, {useState} from 'react';

import {Steps} from 'antd';
import {items} from '../../components/StepProgressBar/StepProgressBar-1';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import LoginModal from '../../components/LogModal/LoginModal';

const FinishProductPage = () => {
	const [jewelryChoice, setJewelryChoice] = useState(localStorage.getItem('jewelryChoice') || '');
	const [diamondChoice, setDiamondChoice] = useState(localStorage.getItem('diamondChoice') || '');
	const [jewelryType, setJewelryType] = useState(localStorage.getItem('jewelryType') || '');
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [diamondDetail, setDiamondDetail] = useState(() => {
		const cartDesign = localStorage.getItem('cartDesign');

		if (cartDesign) {
			try {
				const parsedCartDesign = JSON.parse(cartDesign);

				const diamond = parsedCartDesign.find((item) => item.DiamondId);

				return diamond || null;
			} catch (error) {
				console.error('Error parsing cartDesign from localStorage:', error);
				return null;
			}
		}

		return null;
	});
	const [jewelryDetail, setJewelryDetail] = useState(() => {
		const cartDesign = localStorage.getItem('cartDesign');

		if (cartDesign) {
			try {
				const parsedCartDesign = JSON.parse(cartDesign);

				const jewelry = parsedCartDesign.find((item) => item.JewelryId);

				return jewelry || null;
			} catch (error) {
				console.error('Error parsing cartDesign from localStorage:', error);
				return null;
			}
		}

		return null;
	});

	const hideLoginModal = () => setIsLoginModalVisible(false);

	const items = [
		{
			title: `Chọn ${jewelryType}`,
		},
		{
			title: 'Chọn Kim Cương',
		},
		{
			title: 'Hoàn Thành',
		},
	];
	const itemsDiamond = [
		{
			title: `Chọn Kim Cương`,
		},
		{
			title: `Chọn ${jewelryType}`,
		},
		{
			title: 'Hoàn Thành',
		},
	];
	return (
		<div className="mx-32">
			{diamondChoice.length > 0 ? (
				<Steps
					current={2}
					labelPlacement="horizontal"
					items={itemsDiamond}
					className="bg-white p-4 rounded-full my-10"
				/>
			) : (
				<Steps
					current={2}
					labelPlacement="horizontal"
					items={items}
					className="bg-white p-4 rounded-full my-10"
				/>
			)}

			<div className="flex flex-col md:flex-row bg-white my-10 md:my-20 rounded-lg shadow-lg">
				<div className="w-full md:w-1/2 p-6">
					<ImageGallery />
					<InformationLeft jewelryDetail={jewelryDetail} diamondDetail={diamondDetail} />
				</div>

				<div className="w-full md:w-1/2 p-6 md:pr-32">
					<InformationRight
						jewelryDetail={jewelryDetail}
						diamondDetail={diamondDetail}
						setIsLoginModalVisible={setIsLoginModalVisible}
						isLoginModalVisible={isLoginModalVisible}
					/>
				</div>
			</div>
			<LoginModal isOpen={isLoginModalVisible} onClose={hideLoginModal} />
		</div>
	);
};

export default FinishProductPage;
