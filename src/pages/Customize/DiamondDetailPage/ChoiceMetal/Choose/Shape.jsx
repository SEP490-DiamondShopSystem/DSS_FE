import React from 'react';
import round from '../../../../../assets/round-ring.png';
import princess from '../../../../../assets/princess-ring.png';
import cushion from '../../../../../assets/cushion-ring.png';
import emerald from '../../../../../assets/emerald-ring.png';
import oval from '../../../../../assets/oval-ring.png';
import radiant from '../../../../../assets/radiant-ring.png';
import asscher from '../../../../../assets/asscher-ring.png';
import marquise from '../../../../../assets/marquise-ring.png';
import heart from '../../../../../assets/heart-ring.png';
import {Button, Image, Radio} from 'antd';

export const Shape = ({setStep, customizeJewelry, setCustomizeJewelry}) => {
	const shapeItems = [
		{
			id: 1,
			image: round,
			shape: 'Round',
		},
		{
			id: 2,
			image: cushion,
			shape: 'Cushion',
		},
		{id: 3, image: emerald, shape: 'Emerald'},
		{id: 4, image: oval, shape: 'Oval'},
		{id: 5, image: radiant, shape: 'Radiant'},
		{id: 6, image: asscher, shape: 'Asscher'},
		{id: 7, image: marquise, shape: 'Marquise'},
		{id: 8, image: heart, shape: 'Heart'},
		{id: 9, image: princess, shape: 'Princess'},
	];

	const onChange = (e) => {
		console.log('radio checked', e.target.value);
		setCustomizeJewelry((prev) => ({
			...prev,
			shape: e.target.value,
		}));
	};

	const handleNextStep = () => {
		if (customizeJewelry.shape.length > 0) {
			setStep(2);
		} else {
			notifyError('Vui lòng chọn khuôn!');
		}
	};
	return (
		<div>
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{shapeItems?.map((item) => (
					<div key={item.id}>
						<Radio.Group onChange={onChange} value={customizeJewelry.shape}>
							<Radio value={item.shape}>
								<div className="flex justify-between items-center">
									<div className="mx-5 my-5">
										<Image
											preview={true}
											src={item.image}
											height={80}
											width={80}
										/>
									</div>
									<p className="font-semibold text-xl">{item.shape}</p>
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
					disabled={customizeJewelry.shape.length === 0}
					onClick={handleNextStep}
				>
					Tiếp tục
				</Button>
			</div>
		</div>
	);
};
