import React, {useState} from 'react';

import {Steps} from 'antd';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import {Sidebar} from './Sidebar';

const ProductDetailPage = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [diamondChoice, setDiamondChoice] = useState(localStorage.getItem('diamondChoice') || '');
	const [jewelryType, setJewelryType] = useState(localStorage.getItem('jewelryType') || '');

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

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="mx-32">
			{diamondChoice.length > 0 ? (
				<Steps
					current={1}
					labelPlacement="horizontal"
					percent={100}
					items={itemsDiamond}
					className="bg-white p-4 rounded-full my-10"
				/>
			) : (
				<Steps
					current={0}
					labelPlacement="horizontal"
					percent={100}
					items={items}
					className="bg-white p-4 rounded-full my-10"
				/>
			)}
			{diamondChoice.length === 0 && (
				<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
			)}

			<div className="flex flex-col md:flex-row mx-6 md:mx-32 bg-white my-10 md:my-20 rounded-lg shadow-lg">
				<div className="w-full md:w-1/2 p-6">
					<ImageGallery />
					<InformationLeft />
				</div>

				<div className="w-full md:w-1/2 p-6 md:pr-32">
					<InformationRight toggleSidebar={toggleSidebar} diamondChoice={diamondChoice} />
				</div>
			</div>
		</div>
	);
};

export default ProductDetailPage;
