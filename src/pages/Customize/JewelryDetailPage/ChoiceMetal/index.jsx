import React, {useState} from 'react';

import {Button, Steps} from 'antd';
import {Metal} from './Choose/Metal';
import {Shape} from './Choose/Shape';
import {Engrave} from './Choose/Engrave';

export const ChoiceMetal = ({
	setImageData,
	imageData,
	setCustomizeJewelry,
	customizeJewelry,
	setStepChoose,
}) => {
	const [steps, setStep] = useState(0);

	const items = [
		{
			title: 'Chọn vật liệu',
		},
		{
			title: 'Chọn khuôn',
		},
		{
			title: 'Chữ khắc',
		},
	];
	return (
		<div className="my-10 mx-5">
			<div className="mx-10">
				<Steps items={items} current={steps} type="navigation" />
			</div>
			{steps === 0 && (
				<div className="mx-20">
					<Metal
						setStep={setStep}
						customizeJewelry={customizeJewelry}
						setCustomizeJewelry={setCustomizeJewelry}
					/>
				</div>
			)}
			{steps === 1 && (
				<div className="mx-20">
					<Shape
						setStep={setStep}
						customizeJewelry={customizeJewelry}
						setCustomizeJewelry={setCustomizeJewelry}
					/>
				</div>
			)}
			{steps === 2 && (
				<div className="mx-20">
					<Engrave
						setImageData={setImageData}
						imageData={imageData}
						setStep={setStep}
						customizeJewelry={customizeJewelry}
						setCustomizeJewelry={setCustomizeJewelry}
					/>
				</div>
			)}
			{steps === 3 && (
				<div className="mx-20 my-auto">
					<div className="my-10 shadow-lg p-10 rounded-lg">
						<div className="text-center">
							Chọn vỏ thành công. Vui lòng kiểm tra lại lựa chọn của bạn và tiếp tục
							tùy chỉnh kim cương !
						</div>
						<div className="flex items-center justify-between mt-10">
							<div className="flex items-center ">
								<Button danger onClick={() => setStep(0)}>
									Cài lại
								</Button>
								<Button
									type="text"
									className="bg-tintWhite border ml-4"
									onClick={() => setStep(2)}
								>
									Quay lại
								</Button>
							</div>
							<Button
								type="text"
								className="bg-primary border"
								onClick={() => setStepChoose(2)}
							>
								Xác Nhận
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
