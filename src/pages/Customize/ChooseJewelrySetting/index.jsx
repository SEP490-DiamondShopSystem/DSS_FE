import React from 'react';
import {ProductList} from './ProductList';
import {Steps} from 'antd';

const ChooseJewelrySetting = () => {
	const items = [
		{
			title: `Chọn Trang Sức`,
		},
		{
			title: 'Chọn Kim Cương',
		},
		{
			title: 'Hoàn Thành',
		},
	];
	return (
		<div className="mx-32 my-20">
			<Steps items={items} percent={33} className="bg-white p-4 rounded-full my-10" />
			<ProductList />
		</div>
	);
};

export default ChooseJewelrySetting;
