import React from 'react';
import {Carousel, Image} from 'antd';

export const CarouselComponent = ({listBanner}) => {
	return (
		<div className="w-full mx-auto">
			<Carousel autoplay autoplaySpeed={4000} className="flex justify-center">
				{listBanner?.map((carousel, i) => (
					<div key={i}>
						<Image
							className="h-96 w-full object-cover"
							preview={false}
							src={carousel.img}
						/>
					</div>
				))}
			</Carousel>
		</div>
	);
};
