import React from 'react';

import {Steps} from 'antd';
import {items} from '../../components/StepProgressBar/StepProgressBar-1';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';

const DiamondDetailPage = () => {
	return (
		<>
			<div className="mx-6 md:mx-32">
				<Steps
					current={1}
					percent={100}
					labelPlacement="horizontal"
					items={items}
					className="bg-white p-4 rounded-full mt-10"
				/>
				<div className="flex flex-col md:flex-row bg-white my-10 md:my-20 rounded-lg shadow-lg">
					<div className="w-full md:w-1/2 p-6">
						<ImageGallery />
						<InformationLeft />
					</div>

					<div className="w-full md:w-1/2 p-6 md:pr-32">
						<InformationRight />
					</div>
				</div>
			</div>
		</>
	);
};

export default DiamondDetailPage;
