import React, {useState} from 'react';

import {Steps} from 'antd';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';

const JewelryDetailPage = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [diamondChoice, setDiamondChoice] = useState(localStorage.getItem('diamondChoice') || '');
	const [jewelryType, setJewelryType] = useState(localStorage.getItem('jewelryType') || '');

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="mx-32">
			<div className="flex flex-col md:flex-row mx-6 md:mx-32 bg-white my-10 md:my-20 rounded-lg shadow-lg">
				<div className="w-full md:w-1/2 p-6">
					<ImageGallery />
					<InformationLeft />
				</div>

				<div className="w-full md:w-1/2 p-6 md:pr-32">
					<InformationRight />
				</div>
			</div>
		</div>
	);
};

export default JewelryDetailPage;
