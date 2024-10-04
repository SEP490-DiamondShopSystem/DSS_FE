import React, {useState} from 'react';

import {Steps} from 'antd';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import {Sidebar} from './Sidebar';

const DiamondDetailPage = () => {
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
		<>
			<div className="mx-6 md:mx-32">
				{diamondChoice.length === 0 ? (
					<Steps
						current={1}
						percent={100}
						labelPlacement="horizontal"
						items={items}
						className="bg-white p-4 rounded-full mt-10"
					/>
				) : (
					<Steps
						current={0}
						labelPlacement="horizontal"
						items={itemsDiamond}
						className="bg-white p-4 rounded-full mt-10"
					/>
				)}

				{diamondChoice.length > 0 && (
					<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				)}

				<div className="flex flex-col md:flex-row bg-white my-10 md:my-20 rounded-lg shadow-lg">
					<div className="w-full md:w-1/2 p-6">
						<ImageGallery />
						<InformationLeft />
					</div>

					<div className="w-full md:w-1/2 p-6 md:pr-32">
						<InformationRight
							diamondChoice={diamondChoice}
							toggleSidebar={toggleSidebar}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default DiamondDetailPage;
