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
		if (!customizeDiamond) {
			alert('Please select a diamond before continuing.'); // Alert if no diamond is selected
			return;
		}

		// Check if the diamond is already in the selectedDiamonds for the currentDiamond Id
		const isAlreadySelected = selectedDiamonds.some(
			(selected) =>
				selected.Id === customizeDiamond.Id &&
				selected.currentDiamondId === currentDiamond.Id
		);

		if (!isAlreadySelected) {
			// Add the diamond to selectedDiamonds with the currentDiamond Id
			setSelectedDiamonds((prev) => [
				...prev,
				{...customizeDiamond, currentDiamondId: currentDiamond.Id}, // Store with currentDiamond ID
			]);
		}

		setCustomizeDiamond({
			caratFrom: '',
			caratTo: '',
			shape: '',
			color: '',
			cut: '',
			clarity: '',
			polish: '',
			symmetry: '',
			girdle: '',
			culet: '',
			isLabGrown: null,
		});
		setStep(0);
		setStepChooseDiamond((prev) => prev + 1); // Proceed to the next step
	};

	const matchedShapeItems = shapeItems.filter((item) =>
		currentDiamond.Shapes.some((shape) => shape.ShapeId === item.value)
	);

	console.log(matchedShapeItems);

	console.log('currentDiamond', currentDiamond);

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
					className="w-48 uppercase font-semibold bg-primary"
					// disabled={!isCaratValid}
					onClick={handleNextStep}
				>
					{setStepChooseDiamond === 0 ? 'Tiếp tục' : 'Xác Nhận'}
				</Button>
			</div>
		</div>
	);
};
