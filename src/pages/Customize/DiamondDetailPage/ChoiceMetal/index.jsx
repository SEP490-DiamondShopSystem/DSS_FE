import React, {useState} from 'react';

import {Button, Steps} from 'antd';
import {Carat} from './Choose/Carat';
import {Cut} from './Choose/Cut';
import {Color} from './Choose/Color';
import {Clarity} from './Choose/Clarity';

export const ChoiceMetalDiamond = ({setCustomizeDiamond, customizeDiamond}) => {
	const [steps, setStep] = useState(0);

	const items = [
		{
			title: 'Carat Weight',
		},
		{
			title: 'Cut',
		},
		{
			title: 'Color',
		},
		{
			title: 'Clarity',
		},
	];
	return (
		<div className="my-10 mx-5">
			<div className="mx-10">
				<Steps items={items} current={steps} type="navigation" />
			</div>
			{steps === 0 && (
				<div className="mx-20">
					<Carat
						setStep={setStep}
						customizeDiamond={customizeDiamond}
						setCustomizeDiamond={setCustomizeDiamond}
					/>
				</div>
			)}
			{steps === 1 && (
				<div className="mx-20">
					<Cut
						setStep={setStep}
						customizeDiamond={customizeDiamond}
						setCustomizeDiamond={setCustomizeDiamond}
					/>
				</div>
			)}
			{steps === 2 && (
				<div className="mx-20">
					<Color
						setStep={setStep}
						customizeDiamond={customizeDiamond}
						setCustomizeDiamond={setCustomizeDiamond}
					/>
				</div>
			)}
			{steps === 3 && (
				<div className="mx-20">
					<Clarity
						setStep={setStep}
						customizeDiamond={customizeDiamond}
						setCustomizeDiamond={setCustomizeDiamond}
					/>
				</div>
			)}
			{steps === 4 && (
				<div className="mx-20">
					<div className="my-10 shadow-lg p-10 rounded-lg">
						<div className="text-center">
							Chọn kim cương thành công. Vui lòng kiểm tra lại lựa chọn của bạn để
							hoàn tất!
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
							<Button type="text" className="bg-primary border">
								Xác Nhận
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
