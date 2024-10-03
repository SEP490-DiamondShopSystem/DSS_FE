import React from 'react';

import {CarouselComponent} from '../../components/Carousel';
import {listBanner} from '../../utils/constant';
import {ProductList} from './ProductList';

const ProductPage = () => {
	return (
		<div className="mx-32">
			<CarouselComponent listBanner={listBanner} />

			<ProductList />
		</div>
	);
};

export default ProductPage;
