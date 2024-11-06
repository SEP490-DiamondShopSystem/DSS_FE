import React, {useEffect, useState} from 'react';

import {Button, Image, Input, message, Space} from 'antd';
import caratImage from '../../../../../assets/carat-weight.png';

export const Carat = ({setStep, customizeDiamond, setCustomizeDiamond, currentDiamond}) => {
	const [caratFormShape, setCaratFromShape] = useState();
	const [caratToShape, setCaratToShape] = useState();

	useEffect(() => {
		if (currentDiamond) {
			setCaratFromShape(currentDiamond?.Shapes[0]?.CaratFrom);
			setCaratToShape(currentDiamond?.Shapes[0]?.CaratTo);
		}
	}, [currentDiamond]);

	console.log('caratFormShape', caratFormShape);
	console.log('caratToShape', caratToShape);

	const onChange = (e) => {
		const {name, value} = e.target;
		setCustomizeDiamond((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleNextStep = () => {
		const {caratForm, caratTo} = customizeDiamond;

		if (caratForm < caratFormShape || caratTo > caratToShape) {
			message.warning('Vui lòng chọn giới hạn carat hợp lệ!');
		}

		// If all conditions are valid, move to the next step
		else {
			setStep(1);
		}
	};

	console.log('currentDiamond', currentDiamond);
	console.log('caratForm', customizeDiamond.caratFrom);
	return (
		<div>
			<div>
				<Image preview={false} src={caratImage} />
			</div>

			<div className="my-10 text-red text-lg font-semibold">
				Kim Cương Được Nhập Carat: {caratFormShape} - {caratToShape}
			</div>
			<div className="flex items-center justify-center">
				<Space>
					<Input
						addonBefore="Carat From"
						name="caratFrom"
						value={customizeDiamond.caratFrom}
						className="w-32 ml-10"
						style={{width: 150}}
						onChange={onChange}
					/>
					<Input
						addonBefore="Carat To"
						name="caratTo"
						value={customizeDiamond.caratTo}
						className="w-32 ml-10"
						style={{width: 150}}
						onChange={onChange}
					/>
				</Space>
			</div>
			<div className="flex justify-center items-center mt-10">
				<Button
					type="text"
					className="bg-primary w-48 uppercase font-semibold"
					disabled={customizeDiamond.carat?.length === 0}
					onClick={handleNextStep}
				>
					Tiếp tục
				</Button>
			</div>
		</div>
	);
};
