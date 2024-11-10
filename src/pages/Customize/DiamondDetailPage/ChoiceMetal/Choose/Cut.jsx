import React, {useState} from 'react';

import {Button, Image, Popover, Radio, Segmented} from 'antd';
import cutChart from '../../../../../assets/diamond-chart-cut.png';
import {InfoCircleFilled} from '@ant-design/icons';
import {cutExcellent, cutGood, cutVeryGood} from '../../../../../utils/image';

export const Cut = ({setStep, customizeDiamond, setCustomizeDiamond}) => {
	const [cutSelected, setCutSelected] = useState('Good');
	const cutItems = [
		{
			id: 1,
			value: 1,
			cut: 'Good',
		},
		{
			id: 2,
			value: 2,
			cut: 'Very Good',
		},
		{
			id: 3,
			value: 3,
			cut: 'Excellent',
		},
	];

	const onChange = (e) => {
		console.log('radio checked', e.target.value);
		setCustomizeDiamond((prev) => ({
			...prev,
			cut: e.target.value,
		}));
	};

	// const handleNextStep = () => {
	// 	setStep(2);
	// };

	const text = <span>Diamond Cut</span>;

	const content = (
		<div style={{width: 300, textAlign: 'justify'}}>
			<Segmented
				options={['Good', 'Very Good', 'Excellent']}
				onChange={(value) => {
					setCutSelected(value);
				}}
			/>
			{/* <Image className="mt-5" src={cutChart} preview={false} alt="" /> */}
			{cutSelected === 'Good' ? (
				<>
					<div className="flex justify-center items-center">
						<Image className="mt-5" src={cutGood} preview={false} alt="" />
					</div>
					<p className="mt-3">
						<span className="font-semibold">Good Cut:</span> Chất lượng với mức giá thấp
						hơn kiểu cắt rất tốt, vẫn tạo ra được viên kim cương đẹp cho những người có
						ngân sách hạn hẹp.
					</p>
				</>
			) : cutSelected === 'Very Good' ? (
				<>
					<div className="flex justify-center items-center">
						<Image className="mt-5" src={cutVeryGood} preview={false} alt="" />
					</div>
					<p className="mt-3">
						<span className="font-semibold">Very Good Cut:</span> Độ sáng hoặc độ lấp
						lánh thấp hơn một chút so với kim cương cắt lý tưởng, với mức giá phải chăng
						hơn.
					</p>
				</>
			) : (
				cutSelected === 'Excellent' && (
					<>
						<div className="flex justify-center items-center">
							<Image className="mt-5" src={cutExcellent} preview={false} alt="" />
						</div>
						<p className="mt-3">
							<span className="font-semibold">Excellent Cut:</span> Độ cắt cao nhất.
							Tỷ lệ cắt của nó tạo ra sự cân bằng tuyệt vời giữa ánh sáng màu và sự
							lấp lánh trong một viên kim cương.
						</p>
					</>
				)
			)}
		</div>
	);

	return (
		<div>
			<div className="flex items-center justify-center mt-10">
				<label className=" font-semibold text-xl my-5">
					Chọn Cut{' '}
					<Popover placement="topLeft" title={text} content={content}>
						<InfoCircleFilled />
					</Popover>
				</label>
			</div>
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{cutItems?.map((item) => (
					<div key={item.id} className="mx-auto">
						<Radio.Group onChange={onChange} value={customizeDiamond.cut}>
							<Radio value={item.value}>
								<div className="flex justify-between items-center">
									<p className="font-semibold text-xl">{item.cut}</p>
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
					onClick={() => setStep(0)}
				>
					Quay lại
				</Button>
				<Button
					type="text"
					className="bg-primary w-48 uppercase font-semibold"
					disabled={customizeDiamond.cut?.length === 0}
					onClick={handleNextStep}
				>
					Tiếp tục
				</Button>
			</div> */}
		</div>
	);
};
