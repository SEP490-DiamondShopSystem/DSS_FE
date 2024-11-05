import React from 'react';

import {Button, Image, Input, Radio} from 'antd';
import polishImage from '../../../../../assets/Polish.png';
import {notifyError} from '../../../../../utils/toast';

const polishItems = [
	{
		id: 1,
		value: 1,
		polish: 'Poor',
	},
	{
		id: 2,
		value: 2,
		polish: 'Fair',
	},
	{
		id: 3,
		value: 3,
		polish: 'Good',
	},
	{
		id: 4,
		value: 4,
		polish: 'Very Good',
	},
	{
		id: 5,
		value: 5,
		polish: 'Excellent',
	},
];

export const Polish = ({setStep, customizeDiamond, setCustomizeDiamond}) => {
	const onChange = (e) => {
		setCustomizeDiamond((prev) => ({
			...prev,
			polish: e.target.value,
		}));
	};

	const handleNextStep = () => {
		setStep(5);
	};

	return (
		<div>
			<Image className="my-10" src={polishImage} preview={false} alt="" />
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{polishItems?.map((item) => (
					<div key={item.id}>
						<Radio.Group onChange={onChange} value={customizeDiamond.polish}>
							<Radio value={item.value}>
								<div className="flex justify-between items-center">
									<p className="font-semibold text-xl">{item.polish}</p>
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
					disabled={customizeDiamond.polish?.length === 0}
					onClick={handleNextStep}
				>
					Tiếp tục
				</Button>
			</div>
		</div>
	);
};
