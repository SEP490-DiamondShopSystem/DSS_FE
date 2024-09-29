import React from 'react';

import {ProductList} from './ProductList';
import {Steps} from 'antd';
import {listBanner} from '../../utils/constant';
import {CarouselComponent} from '../../components/Carousel';

const ProductPage = () => {
	return (
		<div className="mx-32">
			<CarouselComponent listBanner={listBanner} />

			<ProductList />
		</div>
	);
};

export default ProductPage;
