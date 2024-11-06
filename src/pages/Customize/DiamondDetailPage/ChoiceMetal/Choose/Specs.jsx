import React from 'react';

import {Button, Image, Input, Radio} from 'antd';
import symmetryImage from '../../../../../assets/Polish.png';
import {notifyError} from '../../../../../utils/toast';

const symmetryItems = [
	{
		id: 1,
		value: 1,
		symmetry: 'Poor',
	},
	{
		id: 2,
		value: 2,
		symmetry: 'Fair',
	},
	{
		id: 3,
		value: 3,
		symmetry: 'Good',
	},
	{
		id: 4,
		value: 4,
		symmetry: 'Very Good',
	},
	{
		id: 5,
		value: 5,
		symmetry: 'Excellent',
	},
];

const diamondLabItems = [
	{
		id: 1,
		value: false,
		isLabGrown: 'Tự Nhiên',
	},
	{
		id: 2,
		value: true,
		isLabGrown: 'Nhân Tạo',
	},
];

const girdleItems = [
	{
		id: 1,
		value: 1,
		girdle: 'Extremely Thin',
	},
	{
		id: 2,
		value: 2,
		girdle: 'Very Thin',
	},
	{
		id: 3,
		value: 3,
		girdle: 'Thin',
	},
	{
		id: 4,
		value: 4,
		girdle: 'Medium',
	},
	{
		id: 5,
		value: 5,
		girdle: 'Slightly Thick',
	},
	{
		id: 6,
		value: 6,
		girdle: 'Thick',
	},
	{
		id: 7,
		value: 7,
		girdle: 'Very Thick',
	},
	{
		id: 8,
		value: 8,
		girdle: 'Extremely Thick',
	},
];

const culetItems = [
	{
		id: 1,
		value: 1,
		culet: 'None',
	},
	{
		id: 2,
		value: 2,
		culet: 'Very Small',
	},
	{
		id: 3,
		value: 3,
		culet: 'Small',
	},
	{
		id: 4,
		value: 4,
		culet: 'Medium',
	},
	{
		id: 5,
		value: 5,
		culet: 'Slightly Large',
	},
	{
		id: 6,
		value: 6,
		culet: 'Large',
	},
	{
		id: 7,
		value: 7,
		culet: 'Very Large',
	},
	{
		id: 8,
		value: 8,
		culet: 'Extremely Large',
	},
];

export const Specs = ({setStep, customizeDiamond, setCustomizeDiamond}) => {
	const onChangeSymmetry = (e) => {
		setCustomizeDiamond((prev) => ({
			...prev,
			symmetry: e.target.value,
		}));
	};
	const onChangeGirdle = (e) => {
		setCustomizeDiamond((prev) => ({
			...prev,
			girdle: e.target.value,
		}));
	};
	const onChangeCulet = (e) => {
		setCustomizeDiamond((prev) => ({
			...prev,
			culet: e.target.value,
		}));
	};
	const onChangeDiamondLab = (e) => {
		setCustomizeDiamond((prev) => ({
			...prev,
			isLabGrown: e.target.value,
		}));
	};

	const handleNextStep = () => {
		setStep(6);
	};

	return (
		<div>
			{/* <Image className="my-10" src={symmetryImage} preview={false} alt="" /> */}
			<h1 className="my-5 font-semibold text-xl">Symmetry</h1>
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{symmetryItems?.map((item) => (
					<div key={item.id}>
						<Radio.Group onChange={onChangeSymmetry} value={customizeDiamond.symmetry}>
							<Radio value={item.value}>
								<div className="flex justify-between items-center">
									<p className="font-semibold text-xl">{item.symmetry}</p>
									{/* <p className="font-semibold ml-20">{item.price}</p> */}
								</div>
							</Radio>
						</Radio.Group>
					</div>
				))}
			</div>
			<h1 className="my-5 font-semibold text-xl">Girdle</h1>
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{girdleItems?.map((item) => (
					<div key={item.id}>
						<Radio.Group onChange={onChangeGirdle} value={customizeDiamond.girdle}>
							<Radio value={item.value}>
								<div className="flex justify-between items-center">
									<p className="font-semibold text-xl">{item.girdle}</p>
									{/* <p className="font-semibold ml-20">{item.price}</p> */}
								</div>
							</Radio>
						</Radio.Group>
					</div>
				))}
			</div>
			<h1 className="my-5 font-semibold text-xl">Culet</h1>
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{culetItems?.map((item) => (
					<div key={item.id}>
						<Radio.Group onChange={onChangeCulet} value={customizeDiamond.culet}>
							<Radio value={item.value}>
								<div className="flex justify-between items-center">
									<p className="font-semibold text-xl">{item.culet}</p>
									{/* <p className="font-semibold ml-20">{item.price}</p> */}
								</div>
							</Radio>
						</Radio.Group>
					</div>
				))}
			</div>
			<h1 className="my-5 font-semibold text-xl">Nguồn Gốc</h1>
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{diamondLabItems?.map((item) => (
					<div key={item.id}>
						<Radio.Group
							onChange={onChangeDiamondLab}
							value={customizeDiamond.isLabGrown}
						>
							<Radio value={item.value}>
								<div className="flex justify-between items-center">
									<p className="font-semibold text-xl">{item.isLabGrown}</p>
									{/* <p className="font-semibold ml-20">{item.price}</p> */}
								</div>
							</Radio>
						</Radio.Group>
					</div>
				))}
			</div>
			<div className="flex justify-between items-center mt-10">
				<Button
					type="text"
					className="bg-primary w-48 uppercase font-semibold"
					onClick={() => setStep(1)}
				>
					Quay lại
				</Button>
				<Button
					type="text"
					className="bg-primary w-48 uppercase font-semibold"
					disabled={customizeDiamond.symmetry?.length === 0}
					onClick={handleNextStep}
				>
					Tiếp tục
				</Button>
			</div>
		</div>
	);
};
