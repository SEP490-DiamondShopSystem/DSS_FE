import React, {useState} from 'react';

import {Steps} from 'antd';
import {DiamondLabList} from './DiamondLabList';
import {DiamondList} from './DiamondList';

const DiamondSearchPage = () => {
	const [changeDiamond, setChangeDiamond] = useState(true);
	const [active, setActive] = useState(false);
	const [diamondChoice, setDiamondChoice] = useState(
		localStorage.getItem('diamondChoice') || localStorage.getItem('selected') || ''
	);
	const [jewelryType, setJewelryType] = useState(localStorage.getItem('jewelryType') || '');

	console.log(diamondChoice);

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

	return (
		<div className="mx-32">
			{diamondChoice.length === 0 && (
				<Steps
					current={1}
					percent={50}
					labelPlacement="horizontal"
					items={items}
					className="bg-white p-4 rounded-full my-10"
				/>
			)}

			<div className="divide-x flex items-center justify-center my-5">
				<button
					className={`px-4 py-2 ${
						changeDiamond ? 'bg-primary' : 'bg-white'
					} rounded-s-lg`}
					onClick={() => setChangeDiamond(true)}
				>
					Tự nhiên
				</button>
				<button
					className={`px-4 py-2 ${
						changeDiamond === false ? 'bg-primary' : 'bg-white'
					} rounded-e-lg`}
					onClick={() => setChangeDiamond(false)}
				>
					Nhân tạo
				</button>
			</div>
			{changeDiamond ? <DiamondList /> : <DiamondLabList />}
		</div>
	);
};

export default DiamondSearchPage;
