import React from 'react';

import {Button, Image, Input, Space} from 'antd';
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
		const {caratForm, caratTo} = customizeDiamond;

		if (caratForm < 0.05 || caratTo > 2) {
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
