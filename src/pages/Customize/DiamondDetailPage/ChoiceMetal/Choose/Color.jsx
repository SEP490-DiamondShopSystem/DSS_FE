import React from 'react';

import {Button, Image, Radio} from 'antd';
import colorChart from '../../../../../assets/Diamond_Color_Chart.png';

export const Color = ({setStep, customizeDiamond, setCustomizeDiamond}) => {
	const colorItems = [
		{
			id: 1,
			value: 'colorless',
			color: 'COLORLESS',
		},
		{
			id: 2,
			value: 'near_colorless',
			color: 'NEAR COLORLESS',
		},
		{
			id: 3,
			value: 'faint_yellow',
			color: 'FAINT YELLOW',
		},
		{
			id: 4,
			value: 'light_yellow',
			color: 'VERY LIGHT YELLOW',
		},
		{
			id: 5,
			value: 'light_yellow',
			color: 'LIGHT YELLOW',
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
		if (customizeDiamond.color?.length > 0) {
			setStep(3);
		} else {
			notifyError('Vui lòng chọn color!');
		}
	};
	return (
		<div>
			<Image className="mt-5" src={colorChart} preview={false} alt="" />
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{colorItems?.map((item) => (
					<div key={item.id}>
						<Radio.Group onChange={onChange} value={customizeDiamond.color}>
							<Radio value={item.color}>
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
