import React from 'react';

import {Button, Image, Input} from 'antd';
import caratImage from '../../../../../assets/carat-weight.png';
import {notifyError} from '../../../../../utils/toast';

export const Carat = ({setStep, customizeDiamond, setCustomizeDiamond}) => {
	const onChange = (e) => {
		const {name, value} = e.target;
		setCustomizeDiamond((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleNextStep = () => {
		const {carat} = customizeDiamond;

		if (carat < 0.05 || carat > 2) {
			notifyError('Vui lòng chọn giới hạn carat hợp lệ!'); // Show an error
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
					addonBefore="Carat"
					name="carat"
					value={customizeDiamond.carat}
					className="w-32 ml-10"
					onChange={onChange}
				/>
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
