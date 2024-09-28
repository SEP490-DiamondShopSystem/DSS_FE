import React from 'react';

import {Steps} from 'antd';
import {items} from '../../components/StepProgressBar/StepProgressBar-1';
import {JewelryList} from './JewelryList';

const JewelrySearchPage = () => {
	return (
		<div className="mx-32">
			{/* <CarouselComponent listBanner={listBanner} /> */}
			<Steps
				current={0}
				percent={50}
				labelPlacement="horizontal"
				items={items}
				className="bg-white p-4 rounded-full my-10"
			/>

			<JewelryList />
		</div>
	);
};

export default JewelrySearchPage;
