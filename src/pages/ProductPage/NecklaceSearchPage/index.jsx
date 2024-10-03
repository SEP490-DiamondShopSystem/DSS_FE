import React, {useState} from 'react';

import {Steps} from 'antd';
import {NecklaceList} from './NecklaceList';

const NecklaceSearchPage = () => {
	const [jewelryType, setJewelryType] = useState(localStorage.getItem('jewelryType') || '');
	const [diamondChoice, setDiamondChoice] = useState(localStorage.getItem('diamondChoice') || '');

	const items = [
		{
			title: `Chọn ${jewelryType}`,
		},
		{
			title: 'Chọn Kim Cương',
		},
		{
			title: 'Hoàn Thành',
		},
	];
	const itemsDiamond = [
		{
			title: `Chọn Kim Cương`,
		},
		{
			title: `Chọn ${jewelryType}`,
		},
		{
			title: 'Hoàn Thành',
		},
	];
	return (
		<div className="mx-32">
			{/* <CarouselComponent listBanner={listBanner} /> */}
			{diamondChoice.length > 0 ? (
				<Steps
					current={1}
					labelPlacement="horizontal"
					percent={50}
					items={itemsDiamond}
					className="bg-white p-4 rounded-full my-10"
				/>
			) : (
				<Steps
					current={0}
					labelPlacement="horizontal"
					percent={50}
					items={items}
					className="bg-white p-4 rounded-full my-10"
				/>
			)}

			<NecklaceList />
		</div>
	);
};

export default NecklaceSearchPage;
