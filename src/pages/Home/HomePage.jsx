import React, {useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Helmet} from 'react-helmet';
import {BannerDiamond} from './../../components/Banner/Banner';
import {list} from '../../utils/constant';
import {FilterJewelry} from '../../components/Filter/Filter';

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
		</div>
	);
};

export default HomePage;
