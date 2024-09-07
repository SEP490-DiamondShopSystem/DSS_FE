import React from 'react';
import {CarouselComponent} from '../../components/Carousel';
import {listBanner} from '../../utils/constant';
import {JewelryList} from './JewelryList';

const JewelrySearchPage = () => {
	return (
		<div className="mx-20">
			<CarouselComponent listBanner={listBanner} />
			<JewelryList />
		</div>
	);
};

export default JewelrySearchPage;
