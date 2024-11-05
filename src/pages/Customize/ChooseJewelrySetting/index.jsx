import React, {useEffect} from 'react';
import {ProductList} from './ProductList';
import {Steps} from 'antd';

const ChooseJewelrySetting = () => {
	const items = [
		{
			title: `Chọn Mẫu Trang Sức`,
		},
		{
			title: 'Chọn Mẫu Kim Cương',
		},
		{
			title: 'Hoàn Thành',
		},
	];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="mx-32 my-20">
			<Steps items={items} percent={33} className="bg-white p-4 rounded-full my-10" />
			<ProductList />
		</div>
	);
};

export default ChooseJewelrySetting;
