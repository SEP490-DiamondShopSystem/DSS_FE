import React from 'react';

import {InfoCircleFilled} from '@ant-design/icons';
import {Input, Popover, Slider, Space} from 'antd';

export const Carat = ({
	setStep,
	customizeDiamond,
	setCustomizeDiamond,
	currentDiamond,
	caratFromShape,
	caratToShape,
}) => {
	const handleCaratChange = (value) => {
		setCustomizeDiamond((prev) => ({
			...prev,
			caratFrom: value[0],
			caratTo: value[1],
		}));
	};

	const text = <span>Carat (ct.)</span>;

	const content = (
		<div style={{width: 300, textAlign: 'justify'}}>
			<p>
				Đơn vị trọng lượng quốc tế, được sử dụng để đo kim cương và đá quý. 1 carat bằng 200
				miligam hoặc 0,2 gam.
			</p>
		</div>
	);

	return (
		<div>
			{/* <div>
				<Image preview={false} src={caratImage} />
			</div> */}

			<div className="flex items-center justify-center mt-10">
				<label className=" font-semibold text-xl">
					Chọn Ly (Carat){' '}
					<Popover placement="topLeft" title={text} content={content}>
						<InfoCircleFilled />
					</Popover>
				</label>
			</div>
			<div className="my-10 text-primary text-lg font-semibold flex justify-center items-center">
				Kim Cương Được Chọn Ly (Carat): {caratFromShape} - {caratToShape}
			</div>
			<div className="mx-40 my-10">
				<Slider
					range
					value={[customizeDiamond?.caratFrom, customizeDiamond?.caratTo]}
					step={0.1}
					min={caratFromShape}
					max={caratToShape}
					onChange={handleCaratChange}
				/>
			</div>
			{/* <div className="flex justify-center items-center mt-10">
				<Button
					type="text"
					className="bg-primary w-48 uppercase font-semibold"
					disabled={customizeDiamond.carat?.length === 0}
					onClick={handleNextStep}
				>
					Tiếp tục
				</Button>
			</div> */}
		</div>
	);
};
