import React from 'react';
import {DiamondList} from './DiamondList';
import {FilterDiamond} from '../../components/Filter/Filter';

const DiamondSearchPage = () => {
	return (
		<div className="m-20">
			<FilterDiamond />
			<DiamondList />
		</div>
	);
};

export default DiamondSearchPage;
