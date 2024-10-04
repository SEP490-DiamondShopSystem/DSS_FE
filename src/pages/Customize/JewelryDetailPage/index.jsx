import React, {useState} from 'react';

import {Steps} from 'antd';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import {ChoiceMetal} from './ChoiceMetal';
import {DetailMetal} from './DetailMetal/DetailMetal';

const JewelryCustomDetail = () => {
	const [step, setStep] = useState(0);
	const [size, setSize] = useState('');
	const [metal, setMetal] = useState('');
	const [shape, setShape] = useState('');
	const [engrave, setEngrave] = useState('');
	const [textValue, setTextValue] = useState('Your Text Here');
	const [imageData, setImageData] = useState(null);

	console.log(shape);
	console.log('textValue', textValue);
	console.log('imageData', imageData);

	console.log('metal', metal);
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
		setSize(e.target.value);
	};

	return (
		<div className="mx-32">
			{step === 0 && (
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
								setStep={setStep}
								size={size}
							/>
						</div>
					</div>
				</>
			)}
			{step === 1 && (
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
								setMetal={setMetal}
								metal={metal}
								setShape={setShape}
								shape={shape}
								setEngrave={setEngrave}
								engrave={engrave}
								setTextValue={setTextValue}
								textValue={textValue}
								imageData={imageData}
								setImageData={setImageData}
							/>
						</div>

						<div className="w-1/2">
							<DetailMetal
								imageData={imageData}
								textValue={textValue}
								shape={shape}
								metal={metal}
								size={size}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default JewelryCustomDetail;
