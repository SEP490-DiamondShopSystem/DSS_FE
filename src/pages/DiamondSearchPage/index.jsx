import React from 'react';

import {FilterDiamond} from '../../components/Filter/Filter';
import {DiamondList} from './DiamondList';
import {Steps} from 'antd';
import {items} from '../../components/StepProgressBar/StepProgressBar-1';

const DiamondSearchPage = () => {
	return (
		<div className="mx-32">
			<Steps
				current={1}
				percent={50}
				labelPlacement="horizontal"
				items={items}
				className="bg-white p-4 rounded-full my-10"
			/>
			<FilterDiamond />
			<DiamondList />
		</div>
	);
};

export default DiamondSearchPage;
