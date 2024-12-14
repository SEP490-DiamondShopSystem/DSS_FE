import React, {useEffect, useState} from 'react';

import {Button, Modal, Space} from 'antd';
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
			setCaratFromShape(matchedShape?.CaratFrom);
			setCaratToShape(matchedShape?.CaratTo);
			setCustomizeDiamond((prev) => ({
				...prev,
				caratFrom: matchedShape?.CaratFrom,
				caratTo: matchedShape?.CaratTo,
			}));
		}
	}, [currentDiamond]);

	const handleCompleted = () => {
		Modal.confirm({
			title: 'Vui lòng kiểm tra lại thông số kim cương trước khi tiếp tục!',
			content: 'Bạn có chắc chắn muốn tiếp tục?',
			centered: true,
			okText: 'Đồng Ý',
			cancelText: 'Hủy Bỏ',
			onOk: handleNextStep,
		});
	};

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
			colorFrom: 1,
			colorTo: 8,
			cutFrom: 1,
			cutTo: 3,
			clarityFrom: 1,
			clarityTo: 8,
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

	const handleBackStep = () => {
		setStep((prev) => prev - 1);
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
			<div className="flex justify-between items-center mt-10">
				<Button
					type="text"
					className="w-48 uppercase font-semibold bg-primary"
					onClick={handleBackStep}
					size="large"
				>
					Quay Lại
				</Button>

				<div className="flex justify-around items-center">
					<Button
						type="text"
						className="w-48 uppercase font-semibold bg-primary mr-5"
						size="large"
						// disabled={
						// 	customizeDiamond?.color === '' ||
						// 	customizeDiamond?.clarity === '' ||
						// 	customizeDiamond?.cut === ''
						// }
						onClick={handleAdvanceClick}
					>
						Chọn Nâng Cao
					</Button>
					<Button
						type="text"
						className="w-48 uppercase font-semibold bg-primary"
						size="large"
						// disabled={
						// 	customizeDiamond?.colorFrom === '' ||
						// 	customizeDiamond?.clarityFrom === '' ||
						// 	customizeDiamond?.cutFrom === ''
						// }
						onClick={handleCompleted}
					>
						Hoàn Thành
					</Button>
				</div>
			</div>
		</div>
	);
};
