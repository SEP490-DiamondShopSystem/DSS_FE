import React from 'react';

import {Button, Image, Radio} from 'antd';
import {shapeItems} from '../../../../../utils/constant';

export const Shape = ({
	setStepChooseDiamond,
	customizeDiamond,
	setCustomizeDiamond,
	selectedDiamonds,
	currentDiamond,
	setSelectedDiamonds,
	setStep,
	currentJewelry,
}) => {
	const onChange = (e) => {
		console.log('radio checked', e.target.value);
		setCustomizeDiamond((prev) => ({
			...prev,
			shape: e.target.value,
		}));
	};

	const handleNextStep = () => {
		setStep((prev) => prev + 1);
	};

	const matchedShapeItems = shapeItems.filter((item) =>
		currentDiamond?.Shapes?.some((shape) => shape?.ShapeId === item?.value)
	);

	return (
		<div>
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{matchedShapeItems?.map((item) => (
					<div key={item.id}>
						<Radio.Group onChange={onChange} value={customizeDiamond.shape}>
							<Radio value={item.value}>
								<div className="flex justify-between items-center">
									<div className="mx-5 my-5">
										<Image
											preview={false}
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
			<div className="flex justify-center items-center mt-10">
				<Button
					type="text"
					className="w-48 uppercase font-semibold bg-primary"
					disabled={customizeDiamond?.shape === null}
					onClick={handleNextStep}
				>
					{setStepChooseDiamond === 0 ? 'Tiếp tục' : 'Xác Nhận'}
				</Button>
			</div>
		</div>
	);
};
