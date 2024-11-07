import React, {useEffect, useState} from 'react';

import {Button, Image, Input, message, Space} from 'antd';
import caratImage from '../../../../../assets/carat-weight.png';

export const Carat = ({setStep, customizeDiamond, setCustomizeDiamond, currentDiamond}) => {
	const [caratFromShape, setCaratFromShape] = useState();
	const [caratToShape, setCaratToShape] = useState();

	useEffect(() => {
		if (currentDiamond) {
			setCaratFromShape(currentDiamond?.Shapes[0]?.CaratFrom);
			setCaratToShape(currentDiamond?.Shapes[0]?.CaratTo);
		}
	}, [currentDiamond]);

	console.log('caratFormShape', caratFromShape);
	console.log('caratToShape', caratToShape);

	const onChange = (e) => {
		const {name, value} = e.target;
		setCustomizeDiamond((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleNextStep = () => {
		const {caratFrom, caratTo} = customizeDiamond;
		console.log(caratFrom);
		console.log(caratTo);

		if (
			Number(caratFrom) >= Number(caratFromShape) &&
			Number(caratTo) <= Number(caratToShape)
		) {
			setStep(1);
		} else {
			message.warning('Vui lòng chọn giới hạn carat hợp lệ!');
		}
	};

	console.log('currentDiamond', currentDiamond);
	console.log('caratForm', Number(customizeDiamond.caratFrom));
	console.log('caratTo', Number(customizeDiamond.caratTo));
	console.log('caratToShape', Number(caratToShape));
	console.log('caratFromShape', Number(caratFromShape));
	return (
		<div>
			<div>
				<Image preview={false} src={caratImage} />
			</div>

			<div className="my-10 text-red text-lg font-semibold">
				Kim Cương Được Nhập Carat: {caratFromShape} - {caratToShape}
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
