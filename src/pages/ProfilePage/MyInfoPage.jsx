import React from 'react';

import {Helmet} from 'react-helmet';
import NavbarProfile from '../../components/NavbarProfile';

const MyInfoPage = () => {
	return (
		<div>
			<Helmet>
				<title>My Information</title>
			</Helmet>
			<div className="my-20 min-h-96 flex">
				<div className="mr-20">
					<NavbarProfile />
				</div>
				<div className="font-semibold w-full px-20 py-10 bg-white rounded-lg"></div>
			</div>
		</div>
	);
};

export default MyInfoPage;
