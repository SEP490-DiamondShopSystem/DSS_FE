import React from 'react';

import {CarouselComponent} from '../../components/Carousel';
import {listBanner} from '../../utils/constant';
import {DiamondJewelryList} from './DiamondJewelryList';

const DiamondJewelryPage = () => {
	return (
		<div className="mx-32">
			<CarouselComponent listBanner={listBanner} />

			<DiamondJewelryList />
		</div>
	);
};

export default DiamondJewelryPage;