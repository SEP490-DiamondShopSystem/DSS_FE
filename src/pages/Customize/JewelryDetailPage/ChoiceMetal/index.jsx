import React, {useState} from 'react';

import {Button, Steps} from 'antd';
import {Engrave} from './Choose/Engrave';
import {Metal} from './Choose/Metal';

export const ChoiceMetal = ({
	setImageData,
	imageData,
	setCustomizeJewelry,
	customizeJewelry,
	setStepChoose,
	diamondJewelry,
	selectedMetal,
	setSelectedMetal,
	handleSelectMetal,
	setFontFamily,
	fontFamily,
	setTextValue,
	textValue,
	filteredGroups,
	size,
	setSize,
	handleSizeChange,
}) => {
	const [steps, setStep] = useState(0);

	const items = [
		{
			title: 'Chọn mẫu',
		},
		// {
		// 	title: 'Kích thước',
		// },
		...(diamondJewelry?.IsEngravable ? [{title: 'Chữ khắc'}] : []),
	];

	const handleStepClick = (index) => {
		if (index <= steps) {
			setStep(index); // Set step only if the index is less than or equal to the current step
		}
	};

	return (
		<div className="my-10 mx-5">
			<div className="mx-10">
				<Steps
					items={items.map((item, index) => ({
						...item,
						onClick: () => handleStepClick(index),
						disabled: index > steps,
					}))}
					current={steps}
					type="navigation"
				/>
			</div>
			{steps === 0 && (
				<div className="mx-20">
					<Metal
						setStep={setStep}
						customizeJewelry={customizeJewelry}
						setCustomizeJewelry={setCustomizeJewelry}
						diamondJewelry={diamondJewelry}
						selectedMetal={selectedMetal}
						setSelectedMetal={setSelectedMetal}
						handleSelectMetal={handleSelectMetal}
						filteredGroups={filteredGroups}
						handleSizeChange={handleSizeChange}
						size={size}
					/>
				</div>
			)}

			{diamondJewelry && diamondJewelry?.IsEngravable
				? steps === 1 && (
						<div className="mx-20">
							<Engrave
								setImageData={setImageData}
								imageData={imageData}
								setStep={setStep}
								customizeJewelry={customizeJewelry}
								setCustomizeJewelry={setCustomizeJewelry}
								setFontFamily={setFontFamily}
								fontFamily={fontFamily}
								setTextValue={setTextValue}
								textValue={textValue}
							/>
						</div>
				  )
				: steps === 1 && (
						<div className="mx-20 my-auto">
							<div className="my-10 shadow-lg p-10 rounded-lg">
								<div className="text-center">
									Chọn vỏ thành công. Vui lòng kiểm tra lại lựa chọn của bạn và
									tiếp tục tùy chỉnh kim cương!
								</div>
								<div className="flex items-center justify-between mt-10">
									<div className="flex items-center">
										<Button danger onClick={() => setStep(0)}>
											Chọn lại
										</Button>
										{/* <Button
											type="text"
											className="bg-tintWhite border ml-4"
											onClick={() => setStep((prev) => prev - 1)}
										>
											Quay lại
										</Button> */}
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
									Chọn lại
								</Button>
							</div>
							<Button
								type="text"
								className="bg-primary border"
								onClick={() => setStepChoose((prev) => prev + 1)}
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
