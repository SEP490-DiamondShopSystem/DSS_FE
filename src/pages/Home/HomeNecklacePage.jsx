import React from 'react';

import {Helmet} from 'react-helmet';
import {BannerNecklace} from '../../components/Banner/BannerNecklace';
import {BannerNecklace2} from '../../components/Banner/BannerNecklace2';
import {BannerNecklace3} from '../../components/Banner/BannerNecklace3';

const HomeNecklacePage = () => {
	return (
		<div>
			<Helmet>
				<title>Thiết Kế Dây Chuyền Cho Riêng Bạn | Diamond Shop</title>
			</Helmet>
			<BannerNecklace />
			<div className="my-10">
				<BannerNecklace3 />
			</div>
			<div>
				<BannerNecklace2 />
			</div>
		</div>
	);
};

export default HomeNecklacePage;
