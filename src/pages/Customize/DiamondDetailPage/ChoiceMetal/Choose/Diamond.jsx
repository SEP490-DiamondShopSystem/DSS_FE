import React, {useEffect, useState} from 'react';

import {Button} from 'antd';
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
	const [filter, setFilter] = useState({});
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

	// const handleNextStep = () => {
	// 	if (!customizeDiamond) {
	// 		alert('Please select a diamond before continuing.'); // Alert if no diamond is selected
	// 		return;
	// 	}

	// 	// Update or add the diamond to selectedDiamonds based on currentDiamond Id
	// 	setSelectedDiamonds((prev) => {
	// 		// Check if a diamond with the same currentDiamondId already exists
	// 		const existingIndex = prev.findIndex(
	// 			(selected) =>
	// 				selected.Id === customizeDiamond.Id &&
	// 				selected.currentDiamondId === currentDiamond.Id
	// 		);

	// 		// If found, replace it; otherwise, add a new entry
	// 		if (existingIndex !== -1) {
	// 			// Create a new array with the updated diamond
	// 			const updatedDiamonds = [...prev];
	// 			updatedDiamonds[existingIndex] = {
	// 				...customizeDiamond,
	// 				currentDiamondId: currentDiamond.Id,
	// 			};
	// 			return updatedDiamonds;
	// 		} else {
	// 			// Add as a new entry
	// 			return [...prev, {...customizeDiamond, currentDiamondId: currentDiamond.Id}];
	// 		}
	// 	});

	// 	// Reset customizeDiamond and proceed to the next step
	// 	setCustomizeDiamond({
	// 		caratFrom: '',
	// 		caratTo: '',
	// 		shape: '',
	// 		colorFrom: '',
	// 		colorTo: '',
	// 		cutFrom: '',
	// 		cutTo: '',
	// 		clarityFrom: '',
	// 		clarityTo: '',
	// 		polish: '',
	// 		symmetry: '',
	// 		girdle: '',
	// 		culet: '',
	// 		isLabGrown: false,
	// 	});
	// 	setStep(0);
	// 	setStepChooseDiamond((prev) => prev + 1);
	// };

	const handleNextStep = () => {
		if (!customizeDiamond) {
			alert('Please select a diamond before continuing.'); // Alert if no diamond is selected
			return;
		}

		// Always add a new diamond entry to selectedDiamonds
		setSelectedDiamonds((prev) => [
			...prev,
			{...customizeDiamond, currentDiamondId: currentDiamond.Id},
		]);

		// Reset customizeDiamond and proceed to the next step
		setCustomizeDiamond({
			caratFrom: '',
			caratTo: '',
			shape: '',
			colorFrom: '',
			colorTo: '',
			cutFrom: '',
			cutTo: '',
			clarityFrom: '',
			clarityTo: '',
			polish: '',
			symmetry: '',
			girdle: '',
			culet: '',
			isLabGrown: false,
		});
		setStep(0);
		setStepChooseDiamond((prev) => prev + 1);
	};

	const handleAdvanceClick = () => {
		setStep((prev) => prev + 1);
	};

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
