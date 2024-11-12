import React, {useEffect, useState} from 'react';

import {Button, message} from 'antd';
import {Carat} from './Carat';
import {Clarity} from './Clarity';
import {Color} from './Color';
import {Cut} from './Cut';

export const Diamond = ({
	setStep,
	customizeDiamond,
	setCustomizeDiamond,
	currentDiamond,
	setStepChooseDiamond,
	selectedDiamonds,
	setSelectedDiamonds,
}) => {
	const [caratFromShape, setCaratFromShape] = useState();
	const [caratToShape, setCaratToShape] = useState();

	const matchedShape = currentDiamond.Shapes.find(
		(shapeObj) => shapeObj.ShapeId === customizeDiamond.shape
	);

	useEffect(() => {
		if (currentDiamond) {
			setCaratFromShape(matchedShape.CaratFrom);
			setCaratToShape(matchedShape.CaratTo);
			setCustomizeDiamond((prev) => ({
				...prev,
				caratFrom: matchedShape.CaratFrom,
				caratTo: matchedShape.CaratTo,
			}));
		}
	}, [currentDiamond]);

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
		setStepChooseDiamond((prev) => prev + 1);
	};

	const handleAdvanceClick = () => {
		setStep((prev) => prev + 1);
	};

	console.log('customizeDiamond', customizeDiamond);

	return (
		<div>
			<Carat
				setStep={setStep}
				customizeDiamond={customizeDiamond}
				setCustomizeDiamond={setCustomizeDiamond}
				currentDiamond={currentDiamond}
				caratFromShape={caratFromShape}
				caratToShape={caratToShape}
			/>
			<Cut
				setStep={setStep}
				customizeDiamond={customizeDiamond}
				setCustomizeDiamond={setCustomizeDiamond}
			/>
			<Color
				setStep={setStep}
				customizeDiamond={customizeDiamond}
				setCustomizeDiamond={setCustomizeDiamond}
			/>
			<Clarity
				setStep={setStep}
				customizeDiamond={customizeDiamond}
				setCustomizeDiamond={setCustomizeDiamond}
			/>
			<div className="flex justify-around items-center mt-10">
				<Button
					type="text"
					className="w-48 uppercase font-semibold bg-primary"
					disabled={
						customizeDiamond?.color === '' ||
						customizeDiamond?.clarity === '' ||
						customizeDiamond?.cut === ''
					}
					onClick={handleAdvanceClick}
				>
					Chọn Nâng Cao
				</Button>
				<Button
					type="text"
					className="w-48 uppercase font-semibold bg-primary"
					disabled={
						customizeDiamond?.color === '' ||
						customizeDiamond?.clarity === '' ||
						customizeDiamond?.cut === ''
					}
					onClick={handleNextStep}
				>
					Hoàn Thành
				</Button>
			</div>
		</div>
	);
};
