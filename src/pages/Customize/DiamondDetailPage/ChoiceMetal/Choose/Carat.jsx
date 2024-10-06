import React from 'react';

import gold from '../../../../../assets/gold.png';
import rose_gold from '../../../../../assets/rose-gold.png';
import platinum from '../../../../../assets/platinum.png';
import {Button, Image, Input, Radio} from 'antd';
import {notifyError} from '../../../../../utils/toast';
import caratImage from '../../../../../assets/carat-weight.png';

export const Carat = ({setStep, customizeDiamond, setCustomizeDiamond}) => {
	const onChange = (e) => {
		const {name, value} = e.target;
		setCustomizeDiamond((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleNextStep = () => {
		const {caratFrom, caratTo} = customizeDiamond;

		// Check if caratFrom is less than 0.05 and caratTo is greater than 2
		if (caratFrom < 0.05 || caratTo > 2) {
			notifyError('Vui lòng chọn giới hạn carat hợp lệ!'); // Show an error
		}
		// Check if caratTo is less than caratFrom
		else if (caratTo < caratFrom) {
			notifyError('Giá trị "To" không thể nhỏ hơn "From"!'); // Show an error
		}
		// If all conditions are valid, move to the next step
		else {
			setStep(1);
		}
	};

	return (
		<div>
			<div>
				<Image preview={false} src={caratImage} />
			</div>
			<div className="flex items-center justify-center">
				<Input
					addonBefore="From"
					name="caratFrom"
					value={customizeDiamond.caratFrom}
					className="w-32"
					onChange={onChange}
				/>
				<Input
					addonBefore="To"
					name="caratTo"
					value={customizeDiamond.caratTo}
					className="w-32 ml-10"
					onChange={onChange}
				/>
			</div>
			<div className="flex justify-center items-center mt-10">
				<Button
					type="text"
					className="bg-primary w-48 uppercase font-semibold"
					disabled={customizeDiamond.caratFrom.length === 0}
					onClick={handleNextStep}
				>
					Tiếp tục
				</Button>
			</div>
		</div>
	);
};
