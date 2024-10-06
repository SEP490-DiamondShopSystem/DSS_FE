import React, {useState} from 'react';

import {Steps} from 'antd';
import {ChoiceMetal} from './ChoiceMetal';
import {DetailMetal} from './DetailMetal/DetailMetal';

const DiamondCustomDetail = () => {
	const [step, setStep] = useState(0);

	const [customizeDiamond, setCustomizeDiamond] = useState({
		carat: '',
		color: '',
		shape: '',
		clarity: '',
	});

	console.log('customizeDiamond', customizeDiamond);

	const handleSizeChange = (e) => {
		setCustomizeDiamond((prev) => ({
			...prev,
			size: e.target.value,
		}));
	};

	return (
		<div className="mx-32">
			<>
				<Steps
					current={0}
					items={items}
					percent={100}
					className="bg-white p-4 rounded-full my-10"
				/>
				<div className="flex w-full bg-white my-10 md:my-20 rounded-lg shadow-lg">
					<div className="w-1/2">
						<ChoiceMetal
							setCustomizeDiamond={setCustomizeDiamond}
							customizeDiamond={customizeDiamond}
						/>
					</div>

					{/* <div className="w-1/2">
						<DetailMetal customizeDiamond={customizeDiamond} />
					</div> */}
				</div>
			</>
		</div>
	);
};

export default DiamondCustomDetail;
