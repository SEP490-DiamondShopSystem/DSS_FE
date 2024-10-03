import React from 'react';

import {Helmet} from 'react-helmet';
import {BannerEarrings} from '../../components/Banner/BannerEarrings-1';
import {BannerEarrings2} from '../../components/Banner/BannerEarrings-2';
import {BannerEarrings3} from '../../components/Banner/BannerEarrings-3';

const HomePendantPage = () => {
	return (
		<div>
			<Helmet>
				<title>Thiết Kế Dây Chuyền Cho Riêng Bạn | Diamond Shop</title>
			</Helmet>
			<BannerEarrings />
			<div className="my-10">
				<BannerEarrings3 />
			</div>
			<div>
				<BannerEarrings2 />
			</div>
		</div>
	);
};

export default HomePendantPage;
