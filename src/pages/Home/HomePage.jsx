import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Helmet} from 'react-helmet';
import {BannerDiamond} from './../../components/Banner/Banner';
import {BannerJewelry} from './../../components/Banner/BannerJewelry-1';
import BannerShape from './../../components/Banner/BannerShape';
import {list} from '../../utils/constant';
import BlogPage from '../BlogPage/BlogPage';

const HomePage = () => {
	return (
		<div>
			<Helmet>
				<title>Diamond Shop</title>
			</Helmet>

			<BannerDiamond />

			<div className="grid grid-cols-4 divide-x py-10 bg-tintWhite">
				{list.map((list, i) => (
					<div key={i} className="">
						<div className="text-center mr-5">
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
							<h2 className="text-center ">{list.subtitle}</h2>
						</div>
					</div>
				))}
			</div>
			<BannerShape />

			<div className="my-10">
				<BannerJewelry />
			</div>
			<BlogPage />
		</div>
	);
};

export default HomePage;
