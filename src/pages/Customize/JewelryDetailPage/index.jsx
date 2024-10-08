import React, {useState} from 'react';

import {Steps} from 'antd';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import {ChoiceMetal} from './ChoiceMetal';
import {DetailMetal} from './DetailMetal/DetailMetal';
import {ChoiceMetalDiamond} from '../DiamondDetailPage/ChoiceMetal';
import {DetailMetalDiamond} from '../DiamondDetailPage/DetailMetal/DetailMetal';

const JewelryCustomDetail = () => {
	const [stepChoose, setStepChoose] = useState(0);
	const [imageData, setImageData] = useState(null);
	const [customizeJewelry, setCustomizeJewelry] = useState({
		size: '',
		metal: '',
		shape: '',
		textValue: 'Your Text Here',
	});
	const [customizeDiamond, setCustomizeDiamond] = useState({
		caratFrom: '',
		caratTo: '',
		color: '',
		shape: '',
		clarity: '',
	});

	console.log(customizeDiamond);

	console.log('customizeJewelry', customizeJewelry);
	console.log('imageData', imageData);

	const items = [
		{
			title: `Chọn Trang Sức`,
		},
		{
			title: 'Chọn Kim Cương',
		},
		{
			title: 'Hoàn Thành',
		},
	];

	const handleSizeChange = (e) => {
		setCustomizeJewelry((prev) => ({
			...prev,
			size: e.target.value,
		}));
	};

	return (
		<div className="mx-32">
			{stepChoose === 0 && (
				<>
					<Steps
						current={0}
						items={items}
						percent={67}
						className="bg-white p-4 rounded-full my-10"
					/>
					<div className="flex flex-col md:flex-row mx-6 md:mx-32 bg-white my-10 md:my-20 rounded-lg shadow-lg">
						<div className="w-full md:w-1/2 p-6">
							<ImageGallery />
							<InformationLeft />
						</div>

						<div className="w-full md:w-1/2 p-6 md:pr-32">
							<InformationRight
								handleSizeChange={handleSizeChange}
								setStepChoose={setStepChoose}
								customizeJewelry={customizeJewelry}
							/>
						</div>
					</div>
				</>
			)}
			{stepChoose === 1 && (
				<>
					<Steps
						current={0}
						items={items}
						percent={100}
						className="bg-white p-4 rounded-full my-10"
					/>
					<div className="flex w-full bg-white my-10 md:my-20 rounded-lg shadow-lg">
						<div className="w-1/2">
							<ChoiceMetal
								imageData={imageData}
								setImageData={setImageData}
								setCustomizeJewelry={setCustomizeJewelry}
								customizeJewelry={customizeJewelry}
								setStepChoose={setStepChoose}
							/>
						</div>

						<div className="w-1/2">
							<DetailMetal
								imageData={imageData}
								customizeJewelry={customizeJewelry}
							/>
						</div>
					</div>
				</>
			)}
			{stepChoose === 2 && (
				<>
					<Steps current={1} items={items} className="bg-white p-4 rounded-full my-10" />
					<div className="flex w-full bg-white my-10 md:my-20 rounded-lg shadow-lg">
						<div className="w-1/2">
							<ChoiceMetalDiamond
								setCustomizeDiamond={setCustomizeDiamond}
								customizeDiamond={customizeDiamond}
							/>
						</div>

						<div className="w-1/2">
							<DetailMetalDiamond
								imageData={imageData}
								customizeJewelry={customizeJewelry}
								customizeDiamond={customizeDiamond}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default JewelryCustomDetail;
