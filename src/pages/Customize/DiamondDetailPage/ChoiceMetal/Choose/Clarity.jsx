import React from 'react';

import {Button, Image, Radio} from 'antd';
import clarityChart from '../../../../../assets/Diamond-Clarity-Chart.png';

export const Clarity = ({setStep, customizeDiamond, setCustomizeDiamond}) => {
	const clarityItems = [
		{
			id: 1,
			value: 1,
			clarity: 'S12',
		},
		{
			id: 2,
			value: 2,
			clarity: 'S11',
		},
		{
			id: 3,
			value: 3,
			clarity: 'VS2',
		},
		{
			id: 4,
			value: 4,
			clarity: 'VS1',
		},
		{
			id: 5,
			value: 5,
			clarity: 'VVS2',
		},
		{
			id: 6,
			value: 6,
			clarity: 'VVS1',
		},
		{
			id: 7,
			value: 7,
			clarity: 'IF',
		},
		{
			id: 8,
			value: 8,
			clarity: 'F',
		},
	];

	const onChange = (e) => {
		console.log('radio checked', e.target.value);
		setCustomizeDiamond((prev) => ({
			...prev,
			clarity: e.target.value,
		}));
	};

	const handleNextStep = () => {
		setStep(4);
	};
	return (
		<div>
			<Image className="my-10" src={clarityChart} preview={false} alt="" />
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{clarityItems?.map((item) => (
					<div key={item.id}>
						<Radio.Group onChange={onChange} value={customizeDiamond.clarity}>
							<Radio value={item.value}>
								<div className="flex justify-between items-center">
									<p className="font-semibold text-xl">{item.clarity}</p>
									{/* <p className="font-semibold ml-20">{item.price}</p> */}
								</div>
							</Radio>
						</Radio.Group>
					</div>
				))}
			</div>
			<div className="flex justify-between items-center mt-10">
				<Button
					type="text"
					className="bg-primary w-48 uppercase font-semibold"
					onClick={() => setStep(1)}
				>
					Quay lại
				</Button>
				<Button
					type="text"
					className="bg-primary w-48 uppercase font-semibold"
					disabled={customizeDiamond.clarity?.length === 0}
					onClick={handleNextStep}
				>
					Tiếp tục
				</Button>
			</div>
		</div>
	);
};
