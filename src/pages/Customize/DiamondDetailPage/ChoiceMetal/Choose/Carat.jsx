import React from 'react';

import {InfoCircleFilled} from '@ant-design/icons';
import {Input, Popover, Space} from 'antd';

export const Carat = ({
	setStep,
	customizeDiamond,
	setCustomizeDiamond,
	currentDiamond,
	caratFromShape,
	caratToShape,
}) => {
	const onChange = (e) => {
		const {name, value} = e.target;
		setCustomizeDiamond((prev) => ({
			...prev,
			[name]: value,
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
					Chọn Carat{' '}
					<Popover placement="topLeft" title={text} content={content}>
						<InfoCircleFilled />
					</Popover>
				</label>
			</div>
			<div className="my-10 text-red text-lg font-semibold">
				Kim Cương Được Chọn Carat: {caratFromShape} - {caratToShape}
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
