import React, {useState} from 'react';

import {Button, Image, Popover, Radio, Segmented, Slider} from 'antd';
import cutChart from '../../../../../assets/diamond-chart-cut.png';
import {InfoCircleFilled} from '@ant-design/icons';
import {cutExcellent, cutGood, cutVeryGood} from '../../../../../utils/image';
import {marksCut} from '../../../../../utils/constant';

export const Cut = ({setStep, customizeDiamond, setCustomizeDiamond}) => {
	const [cutSelected, setCutSelected] = useState('Good');

	const handleCutChange = (value) => {
		setCustomizeDiamond((prev) => ({
			...prev,
			cutFrom: value[0],
			cutTo: value[1],
		}));
	};

	const text = <span>Chế Tác Kim Cương</span>;

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
					Chọn Chế Tác (Cut){' '}
					<Popover placement="topLeft" title={text} content={content}>
						<InfoCircleFilled />
					</Popover>
				</label>
			</div>
			<div className="mx-20 my-10">
				<Slider
					range
					marks={marksCut}
					min={1}
					max={3}
					value={[customizeDiamond?.cutFrom || 1, customizeDiamond?.cutTo || 3]}
					onChange={handleCutChange}
				/>
			</div>
		</div>
	);
};
