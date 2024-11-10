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
	setAdvanced,
	steps,
	advanced,
}) => {
	const [caratFromShape, setCaratFromShape] = useState();
	const [caratToShape, setCaratToShape] = useState();

	useEffect(() => {
		if (currentDiamond) {
			setCaratFromShape(currentDiamond?.Shapes[0]?.CaratFrom);
			setCaratToShape(currentDiamond?.Shapes[0]?.CaratTo);
		}
	}, [currentDiamond]);

	const handleNextStep = () => {
		const {caratFrom, caratTo} = customizeDiamond;
		console.log(caratFrom);
		console.log(caratTo);

		if (
			Number(caratFrom) >= Number(caratFromShape) &&
			Number(caratTo) <= Number(caratToShape)
		) {
			setStep((prev) => prev + 1);
		} else {
			message.warning('Vui lòng chọn giới hạn carat hợp lệ!');
		}
	};

	const handleAdvanceClick = () => {
		if (advanced) {
			setAdvanced(false);
		} else {
			setAdvanced(true);
		}
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
					onClick={handleNextStep}
				>
					{steps === 0 ? 'Tiếp tục' : 'Xác Nhận'}
				</Button>
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
					{advanced ? 'Hủy Chọn Nâng Cao' : 'Chọn Nâng Cao'}
				</Button>
			</div>
		</div>
	);
};
