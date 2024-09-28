import React, {useState} from 'react';

import {Steps} from 'antd';
import {items} from '../../components/StepProgressBar/StepProgressBar-1';
import {DiamondLabList} from './DiamondLabList';
import {DiamondList} from './DiamondList';

const DiamondSearchPage = () => {
	const [changeDiamond, setChangeDiamond] = useState(true);
	return (
		<div className="mx-32">
			<Steps
				current={1}
				percent={50}
				labelPlacement="horizontal"
				items={items}
				className="bg-white p-4 rounded-full my-10"
			/>

			<div className="divide-x flex items-center justify-center my-5">
				<button
					className="px-4 py-2 bg-primary hover:bg-second"
					onClick={() => setChangeDiamond(true)}
				>
					Kim cương tự nhiên
				</button>
				<button
					className="px-4 py-2 bg-primary hover:bg-second"
					onClick={() => setChangeDiamond(false)}
				>
					Kim cương nhân tạo
				</button>
			</div>
			{changeDiamond ? <DiamondList /> : <DiamondLabList />}
		</div>
	);
};

export default DiamondSearchPage;
