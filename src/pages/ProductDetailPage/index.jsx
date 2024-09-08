import React, {useState} from 'react';

import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';

const ProductDetailPage = () => {
	return (
		<div className="flex mx-32 bg-white my-20 rounded-lg">
			<div className="left-0 w-full pl-10 p-6">
				<ImageGallery />
				<InformationLeft />
			</div>

			<div className="right-0 w-full pl-10 p-6 pr-32">
				<InformationRight />
			</div>
		</div>
	);
};

export default ProductDetailPage;
