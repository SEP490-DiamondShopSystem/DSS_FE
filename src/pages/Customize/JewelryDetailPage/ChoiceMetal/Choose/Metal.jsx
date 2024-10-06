import React from 'react';

import gold from '../../../../../assets/gold.png';
import rose_gold from '../../../../../assets/rose-gold.png';
import platinum from '../../../../../assets/platinum.png';
import {Button, Image, Radio} from 'antd';
import {notifyError} from '../../../../../utils/toast';

export const Metal = ({setStep, customizeJewelry, setCustomizeJewelry}) => {
	const metalItems = [
		{
			id: 1,
			image: gold,
			name: '14K Gold',
			price: '$1,102/Gram',
		},
		{
			id: 2,
			image: rose_gold,
			name: '14K Rose Gold',
			price: '$1,102/Gram',
		},
		{id: 3, image: gold, name: '18K Gold', price: '$2,002 / Gram'},
		{id: 4, image: platinum, name: 'Platinum', price: '$2,002 / Gram'},
	];

	const onChange = (e) => {
		console.log('radio checked', e.target.value);
		setCustomizeJewelry((prev) => ({
			...prev,
			metal: e.target.value,
		}));
	};

	const handleNextStep = () => {
		if (customizeJewelry?.metal.length > 0) {
			setStep(1);
		} else {
			notifyError('Vui lòng chọn vật liệu!');
		}
	};

	return (
		<div>
			<div>
				{metalItems?.map((item) => (
					<div key={item.id}>
						<Radio.Group onChange={onChange} value={customizeJewelry.metal}>
							<Radio value={item.name}>
								<div
									className="flex items-center justify-between"
									style={{width: 500}}
								>
									<div className="flex items-center">
										<div className="mx-5 my-5">
											<Image
												preview={false}
												src={item.image}
												height={50}
												width={50}
											/>
										</div>
										<p className="">{item.name}</p>
									</div>
									<p className="font-semibold">{item.price}</p>
								</div>
							</Radio>
						</Radio.Group>
					</div>
				))}
			</div>
			<div className="flex justify-center items-center mt-10">
				<Button
					type="text"
					className="bg-primary w-48 uppercase font-semibold"
					disabled={customizeJewelry.metal.length === 0}
					onClick={handleNextStep}
				>
					Tiếp tục
				</Button>
			</div>
		</div>
	);
};
