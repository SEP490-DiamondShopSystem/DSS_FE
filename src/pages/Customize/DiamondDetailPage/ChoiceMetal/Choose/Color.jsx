import React from 'react';

import {Button, Image, Radio} from 'antd';
import colorChart from '../../../../../assets/Diamond_Color_Chart.png';

export const Color = ({setStep, customizeDiamond, setCustomizeDiamond}) => {
	const colorItems = [
		{
			id: 1,
			value: 1,
			color: 'K',
		},
		{
			id: 2,
			value: 2,
			color: 'J',
		},
		{
			id: 3,
			value: 3,
			color: 'I',
		},
		{
			id: 4,
			value: 4,
			color: 'H',
		},
		{
			id: 5,
			value: 5,
			color: 'G',
		},
		{
			id: 6,
			value: 6,
			color: 'F',
		},
		{
			id: 7,
			value: 7,
			color: 'E',
		},
		{
			id: 8,
			value: 8,
			color: 'D',
		},
	];

	const onChange = (e) => {
		console.log('radio checked', e.target.value);
		setCustomizeDiamond((prev) => ({
			...prev,
			color: e.target.value,
		}));
	};

	const handleNextStep = () => {
		setStep(3);
	};
	return (
		<div>
			<Image className="mt-5" src={colorChart} preview={false} alt="" />
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{colorItems?.map((item) => (
					<div key={item.id}>
						<Radio.Group onChange={onChange} value={customizeDiamond.color}>
							<Radio value={item.value}>
								<div className="flex justify-between items-center">
									<p className="font-semibold text-xl">{item.color}</p>
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
					disabled={customizeDiamond.color?.length === 0}
					onClick={handleNextStep}
				>
					Tiếp tục
				</Button>
			</div>
		</div>
	);
};
