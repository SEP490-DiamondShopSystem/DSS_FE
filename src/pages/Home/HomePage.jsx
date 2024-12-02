import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Helmet} from 'react-helmet';
import SliderTopSelling from '../../components/SliderTopSelling';
import {list} from '../../utils/constant';
import BlogPage from '../BlogPage/BlogPage';
import {BannerDiamond} from './../../components/Banner/Banner';
import {BannerJewelry} from './../../components/Banner/BannerJewelry-1';
import BannerShape from './../../components/Banner/BannerShape';

const HomePage = () => {
	return (
		<div>
			<Helmet>
				<title>Diamond Shop</title>
			</Helmet>

			<BannerDiamond />

			<div className="grid grid-cols-1 md:grid-cols-4 md:divide-x py-10 bg-tintWhite">
				{list.map((list, i) => (
					<div key={i} className="px-4 py-6">
						<div className="text-center mb-4">
							<FontAwesomeIcon
								icon={list.icon}
								color="#dec986"
								className="w-16 h-16"
							/>
						</div>
						<div>
							<h1 className="text-center uppercase font-semibold text-xl">
								{list.title}
							</h1>
							<h2 className="text-center">{list.subtitle}</h2>
						</div>
					</div>
				))}
			</div>

			<BannerShape />

			<div className="my-10 hidden md:block">
				<BannerJewelry />
			</div>
			{/* <BannerEarrings2 /> */}
			<SliderTopSelling />

			<BlogPage />
		</div>
	);
};

export default HomePage;
