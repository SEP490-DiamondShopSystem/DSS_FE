import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {BannerDiamond} from './../../components/Banner/Banner';
import {BannerEarrings} from './../../components/Banner/BannerEarrings-1';
import {BannerJewelry} from './../../components/Banner/BannerJewelry-1';
import {BannerNecklace} from './../../components/Banner/BannerNecklace';
import {BannerRings} from './../../components/Banner/BannerRing-1';
import BannerShape from './../../components/Banner/BannerShape';
// import {PopularOnStore} from './../../components/Banner/PopularOnStore'; // Import the PopularOnStore component

import {list} from '../../utils/constant';

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
			<div></div>
		</div>
	);
};

export default HomePage;
