import React from 'react';

import {FilterDiamond} from '../../components/Filter/Filter';
import {DiamondList} from './DiamondList';

const DiamondSearchPage = () => {
	return (
		<div className="m-20">
			<FilterDiamond />
			<DiamondList />
		</div>
	);
};

export default DiamondSearchPage;
