import React from 'react';
import round from '../../../../../assets/diamondShapes/round.png';
import princess from '../../../../../assets/diamondShapes/princess.png';
import cushion from '../../../../../assets/diamondShapes/cushionSquare.png';
import emerald from '../../../../../assets/diamondShapes/emerald.png';
import oval from '../../../../../assets/diamondShapes/oval.png';
import radiant from '../../../../../assets/diamondShapes/radiant.png';
import asscher from '../../../../../assets/asscher-ring.png';
import marquise from '../../../../../assets/diamondShapes/marquise.png';
import heart from '../../../../../assets/diamondShapes/heart.png';
import {Button, Image, Radio} from 'antd';

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
	const shapeItems = [
		{
			id: 1,
			image: round,
			value: '1',
			shape: 'Round',
		},
		{
			id: 2,
			image: cushion,
			shape: 'Cushion',
			value: '3',
		},
		{id: 3, image: emerald, shape: 'Emerald', value: '4'},
		{id: 4, image: oval, shape: 'Oval', value: '5'},
		{id: 5, image: radiant, shape: 'Radiant', value: '6'},
		{id: 6, image: asscher, shape: 'Asscher', value: '7'},
		{id: 7, image: marquise, shape: 'Marquise', value: '8'},
		{id: 8, image: heart, shape: 'Heart', value: '9'},
		{id: 9, image: princess, shape: 'Princess', value: '2'},
		{id: 9, image: princess, shape: 'Pear', value: '10'},
	];

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

	console.log('currentDiamond', currentDiamond);

	return (
		<div>
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{shapeItems?.map((item) => (
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
