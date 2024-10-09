import React from 'react';

import {Button, Image, Radio} from 'antd';
import clarityChart from '../../../../../assets/Diamond-Clarity-Chart.png';

export const Clarity = ({setStep, customizeDiamond, setCustomizeDiamond}) => {
	const clarityItems = [
		{
			id: 1,
			value: 'clarityless',
			clarity: 'FLAWLESS',
		},
		{
			id: 2,
			value: 'near_clarityless',
			clarity: 'VERY VERY SMALL INCLUSIONS',
		},
		{
			id: 3,
			value: 'faint_yellow',
			clarity: 'VERY SMALL INCLUSIONS',
		},
		{
			id: 4,
			value: 'light_yellow',
			clarity: 'SMALL INCLUSIONS',
		},
		{
			id: 5,
			value: 'light_yellow',
			clarity: 'INCLUSIONS',
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
		if (customizeDiamond.clarity?.length > 0) {
			setStep(4);
		} else {
			notifyError('Vui lòng chọn clarity!');
		}
	};
	return (
		<div>
			<Image className="my-10" src={clarityChart} preview={false} alt="" />
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{clarityItems?.map((item) => (
					<div key={item.id}>
						<Radio.Group onChange={onChange} value={customizeDiamond.clarity}>
							<Radio value={item.clarity}>
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
