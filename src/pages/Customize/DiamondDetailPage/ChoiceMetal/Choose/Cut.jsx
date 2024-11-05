import React from 'react';

import {Button, Image, Radio} from 'antd';
import cutChart from '../../../../../assets/diamond-chart-cut.png';

export const Cut = ({setStep, customizeDiamond, setCustomizeDiamond}) => {
	const cutItems = [
		{
			id: 1,
			value: 1,
			cut: 'Good',
		},
		{
			id: 2,
			value: 2,
			cut: 'Very Good',
		},
		{
			id: 3,
			value: 3,
			cut: 'Excellent',
		},
	];

	const onChange = (e) => {
		console.log('radio checked', e.target.value);
		setCustomizeDiamond((prev) => ({
			...prev,
			cut: e.target.value,
		}));
	};

	const handleNextStep = () => {
		setStep(2);
	};

	return (
		<div>
			<Image className="mt-5" src={cutChart} preview={false} alt="" />
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{cutItems?.map((item) => (
					<div key={item.id}>
						<Radio.Group onChange={onChange} value={customizeDiamond.cut}>
							<Radio value={item.value}>
								<div className="flex justify-between items-center">
									<p className="font-semibold text-xl">{item.cut}</p>
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
					onClick={() => setStep(0)}
				>
					Quay lại
				</Button>
				<Button
					type="text"
					className="bg-primary w-48 uppercase font-semibold"
					disabled={customizeDiamond.cut?.length === 0}
					onClick={handleNextStep}
				>
					Tiếp tục
				</Button>
			</div>
		</div>
	);
};
