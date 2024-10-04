import React, {useState} from 'react';

import {Steps} from 'antd';
import {Metal} from './Choose/Metal';
import {Shape} from './Choose/Shape';
import {Engrave} from './Choose/Engrave';

export const ChoiceMetal = ({setMetal, metal, shape, setShape, engrave, setEngrave}) => {
	const [steps, setStep] = useState(0);

	const items = [
		{
			title: 'Chọn vật liệu',
		},
		{
			title: 'Chọn khuôn',
		},
		{
			title: 'Khắc tên',
		},
	];
	return (
		<div className="my-10 mx-5">
			<div className="mx-10">
				<Steps items={items} current={steps} type="navigation" />
			</div>
			{steps === 0 && (
				<div className="mx-20">
					<Metal setStep={setStep} metal={metal} setMetal={setMetal} />
				</div>
			)}
			{steps === 1 && (
				<div className="mx-20">
					<Shape setStep={setStep} shape={shape} setShape={setShape} />
				</div>
			)}
			{steps === 2 && (
				<div className="mx-20">
					<Engrave setStep={setStep} shape={engrave} setShape={setEngrave} />
				</div>
			)}
			{steps === 3 && <div className="mx-20"></div>}
		</div>
	);
};
