import React from 'react';

import {Button, Image, Popover, Radio} from 'antd';
import polishImage from '../../../../../assets/Polish.png';
import {InfoCircleFilled} from '@ant-design/icons';

const polishItems = [
	{
		id: 1,
		value: 1,
		polish: 'Poor',
	},
	{
		id: 2,
		value: 2,
		polish: 'Fair',
	},
	{
		id: 3,
		value: 3,
		polish: 'Good',
	},
	{
		id: 4,
		value: 4,
		polish: 'Very Good',
	},
	{
		id: 5,
		value: 5,
		polish: 'Excellent',
	},
];

export const Polish = ({setStep, customizeDiamond, setCustomizeDiamond}) => {
	const onChange = (e) => {
		setCustomizeDiamond((prev) => ({
			...prev,
			polish: e.target.value,
		}));
	};

	const handleNextStep = () => {
		setStep(5);
	};

	const text = <span>Polish</span>;

	const content = (
		<div style={{width: 300, textAlign: 'justify'}}>
			<p>
				Tình trạng tổng thể của các bề mặt đã được mài của viên kim cương hoàn thiện, bao
				gồm độ mịn của các mặt cắt, có vết xước nào từ bánh mài hay không, và mức độ sắc nét
				của các cạnh mỗi mặt cắt. Các vết từ quá trình mài thường gần như không thể thấy
				bằng mắt thường, nhưng độ mài bóng tốt là điều cần thiết để tối ưu hóa hiệu suất
				phản chiếu ánh sáng.
			</p>
		</div>
	);

	return (
		<div>
			<div className="flex items-center justify-center mt-10">
				<label className=" font-semibold text-xl">
					Chọn Carat{' '}
					<Popover placement="topLeft" title={text} content={content}>
						<InfoCircleFilled />
					</Popover>
				</label>
			</div>
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{polishItems?.map((item) => (
					<div key={item.id} className="mx-auto">
						<Radio.Group onChange={onChange} value={customizeDiamond.polish}>
							<Radio value={item.value}>
								<div className="flex justify-between items-center">
									<p className="font-semibold text-xl">{item.polish}</p>
									{/* <p className="font-semibold ml-20">{item.price}</p> */}
								</div>
							</Radio>
						</Radio.Group>
					</div>
				))}
			</div>
			{/* <div className="flex justify-between items-center mt-10">
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
					disabled={customizeDiamond.polish?.length === 0}
					onClick={handleNextStep}
				>
					Tiếp tục
				</Button>
			</div> */}
		</div>
	);
};
