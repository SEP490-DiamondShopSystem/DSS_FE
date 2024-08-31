import React from 'react';

import {Helmet} from 'react-helmet';
import Banner from '../../components/Banner';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeadphones, faRefresh, faTag, faTruck} from '@fortawesome/free-solid-svg-icons';

const list = [
	{
		icon: <FontAwesomeIcon icon={faTruck} color="#dec986" className="w-16 h-16" />,
		title: 'Free Delivery',
		subtitle: 'Orders from all item',
	},
	{
		icon: <FontAwesomeIcon icon={faRefresh} color="#dec986" className="w-16 h-16" />,
		title: 'Return & Refund',
		subtitle: 'Money back guarantee',
	},
	{
		icon: <FontAwesomeIcon icon={faTag} color="#dec986" className="w-16 h-16" />,
		title: 'Discount',
		subtitle: 'On every order over 40%',
	},
	{
		icon: <FontAwesomeIcon icon={faHeadphones} color="#dec986" className="w-16 h-16" />,
		title: 'Support 24/7',
		subtitle: 'Contact us 24 hours a day',
	},
];

const HomePage = () => {
	return (
		<div>
			<Helmet>
				<title>Diamond Shop</title>
			</Helmet>
			<Banner />
			<div className="grid grid-cols-4 divide-x-0 my-5">
				{list.map((list) => (
					<div className="flex items-center mx-auto">
						<div className="mr-5">{list.icon}</div>
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
