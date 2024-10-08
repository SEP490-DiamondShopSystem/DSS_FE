import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Helmet} from 'react-helmet';
import {BannerDiamond} from './../../components/Banner/Banner';
import BannerShape from './../../components/Banner/BannerShape';
import {BannerEarrings} from './../../components/Banner/BannerEarrings-1';
import {BannerEarrings2} from './../../components/Banner/BannerEarrings-2';
import {BannerEarrings3} from './../../components/Banner/BannerEarrings-3';
import {BannerJewelry} from './../../components/Banner/BannerJewelry-1';
import {BannerJewelry2} from './../../components/Banner/BannerJewelry-2';
import {BannerJewelry3} from './../../components/Banner/BannerJewelry-3';
import {BannerNecklace} from './../../components/Banner/BannerNecklace';
import {BannerNecklace2} from './../../components/Banner/BannerNecklace2';
import {BannerNecklace3} from './../../components/Banner/BannerNecklace3';
import {BannerRings} from './../../components/Banner/BannerRing-1';
import {BannerRing2} from './../../components/Banner/BannerRing-2';
import {BannerRing3} from './../../components/Banner/BannerRing-3';
import {PopularOnStore} from './../../components/Banner/PopularOnStore'; // Import the PopularOnStore component

import {list} from '../../utils/constant';

const HomePage = () => {
	return (
		<div>
			<Helmet>
				<title>Diamond Shop</title>
			</Helmet>

			<BannerDiamond />

			<div className="grid grid-cols-4 divide-x-0 my-5">
				{list.map((list, i) => (
					<div key={i} className="flex items-center mx-auto">
						<div className="mr-5">
							<FontAwesomeIcon
								icon={list.icon}
								color="#dec986"
								className="w-16 h-16"
							/>
						</div>
						<div>
							<h1 className="uppercase font-semibold text-xl">{list.title}</h1>
							<h2 className="">{list.subtitle}</h2>
						</div>
					</div>
				))}
			</div>

			<BannerEarrings />
			<BannerNecklace />

			<BannerJewelry />
			<BannerRings />
			<BannerShape />
			<PopularOnStore />
		</div>
	);
};

export default HomePage;
