import React, {useState} from 'react';

import {Steps} from 'antd';
import {items} from '../../components/StepProgressBar/StepProgressBar-1';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import {Sidebar} from './Sidebar';

const ProductDetailPage = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	console.log(isSidebarOpen);

	return (
		<div className="mx-32">
			<Steps
				current={0}
				percent={100}
				labelPlacement="horizontal"
				items={items}
				className="bg-white p-4 rounded-full my-10"
			/>
			<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

			<div className="flex flex-col md:flex-row mx-6 md:mx-32 bg-white my-10 md:my-20 rounded-lg shadow-lg">
				<div className="w-full md:w-1/2 p-6">
					<ImageGallery />
					<InformationLeft />
				</div>

				<div className="w-full md:w-1/2 p-6 md:pr-32">
					<InformationRight toggleSidebar={toggleSidebar} />
				</div>
			</div>
		</div>
	);
};

export default ProductDetailPage;
