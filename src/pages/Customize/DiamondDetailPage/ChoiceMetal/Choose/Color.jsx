import React, {useState} from 'react';

import {Button, Image, Popover, Radio, Segmented} from 'antd';
import {InfoCircleFilled} from '@ant-design/icons';
import {
	colorD,
	colorE,
	colorF,
	colorG,
	colorH,
	colorI,
	colorJ,
	colorK,
} from '../../../../../utils/image';

export const Color = ({setStep, customizeDiamond, setCustomizeDiamond}) => {
	const [colorSelected, setColorSelected] = useState('K');
	const colorItems = [
		{
			id: 1,
			value: 1,
			color: 'K',
		},
		{
			id: 2,
			value: 2,
			color: 'J',
		},
		{
			id: 3,
			value: 3,
			color: 'I',
		},
		{
			id: 4,
			value: 4,
			color: 'H',
		},
		{
			id: 5,
			value: 5,
			color: 'G',
		},
		{
			id: 6,
			value: 6,
			color: 'F',
		},
		{
			id: 7,
			value: 7,
			color: 'E',
		},
		{
			id: 8,
			value: 8,
			color: 'D',
		},
	];

	const onChange = (e) => {
		console.log('radio checked', e.target.value);
		setCustomizeDiamond((prev) => ({
			...prev,
			color: e.target.value,
		}));
	};

	const handleNextStep = () => {
		setStep(3);
	};

	const text = <span>Diamond Color</span>;

	const content = (
		<div style={{width: 300, textAlign: 'justify'}}>
			{/* <Image className="mt-5" src={cutChart} preview={false} alt="" /> */}
			<Segmented
				options={['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D']}
				onChange={(value) => {
					setColorSelected(value);
				}}
				className="my-3"
			/>
			{colorSelected === 'K' ? (
				<>
					<div className="flex justify-center items-center">
						<Image className="mt-5" src={colorK} preview={false} alt="" />
					</div>
					<p>
						<span className="font-semibold">K Color:</span> Là cấp độ màu đầu tiên trong
						"màu nhạt", có nghĩa là màu sắc có thể được phát hiện bằng mắt thường. Kim
						cương K color có thể mang lại giá trị tuyệt vời.
					</p>
				</>
			) : colorSelected === 'J' ? (
				<>
					<div className="flex justify-center items-center">
						<Image className="mt-5" src={colorJ} preview={false} alt="" />
					</div>
					<p>
						<span className="font-semibold">J Color:</span> Cấp độ cuối cùng trong nhóm
						"gần như không màu", màu sắc có thể hơi dễ nhận biết bằng mắt thường, đặc
						biệt là đối với các hình dạng đặc biệt hoặc kim cương trên 1 carat.
					</p>
				</>
			) : colorSelected === 'I' ? (
				<>
					<div className="flex justify-center items-center">
						<Image className="mt-5" src={colorI} preview={false} alt="" />
					</div>
					<p>
						<span className="font-semibold">I Color:</span>
						Màu sắc có thể chỉ được phát hiện một cách nhẹ nhàng khi kiểm tra kỹ. Giá
						trị đặc biệt.
					</p>
				</>
			) : colorSelected === 'H' ? (
				<>
					<div className="flex justify-center items-center">
						<Image className="mt-5" src={colorH} preview={false} alt="" />
					</div>
					<p>
						<span className="font-semibold">H Color:</span> Cấp độ "gần như không màu"
						CA, màu sắc chỉ có thể nhận thấy khi so sánh với các cấp độ màu cao hơn
						nhiều. Giá trị xuất sắc.
					</p>
				</>
			) : colorSelected === 'G' ? (
				<>
					<div className="flex justify-center items-center">
						<Image className="mt-5" src={colorG} preview={false} alt="" />
					</div>
					<p>
						<span className="font-semibold">G Color:</span> Cấp độ "gần như không màu"
						cao nhất. Màu sắc có thể nhận thấy khi so sánh với các cấp độ "không màu"
						cao hơn. Giá trị xuất sắc.
					</p>
				</>
			) : colorSelected === 'F' ? (
				<>
					<div className="flex justify-center items-center">
						<Image className="mt-5" src={colorF} preview={false} alt="" />
					</div>
					<p>
						<span className="font-semibold">F Color:</span> Cấp độ "không màu" được đánh
						giá cao nhất khi được đính trong bạch kim hoặc vàng trắng. Màu sắc nhạt có
						thể được phát hiện bởi một chuyên gia đá quý có kinh nghiệm.
					</p>
				</>
			) : colorSelected === 'E' ? (
				<>
					<div className="flex justify-center items-center">
						<Image className="mt-5" src={colorE} preview={false} alt="" />
					</div>
					<p>
						<span className="font-semibold">E Color:</span> Cấp độ "không màu" được đánh
						giá cao nhất khi được đính trong bạch kim hoặc vàng trắng. Dấu vết màu sắc
						khó có thể phát hiện ngay cả với mắt của một chuyên gia.
					</p>
				</>
			) : (
				colorSelected === 'D' && (
					<>
						<div className="flex justify-center items-center">
							<Image className="mt-5" src={colorD} preview={false} alt="" />
						</div>
						<p>
							<span className="font-semibold">D Color:</span> Cấp độ "không màu" tuyệt
							đối cao nhất, được đánh giá cao nhất khi đính trong bạch kim hoặc vàng
							trắng. Rất hiếm gặp.
						</p>
					</>
				)
			)}
		</div>
	);

	return (
		<div>
			{/* <Image className="mt-5" src={colorChart} preview={false} alt="" /> */}
			<div className="flex items-center justify-center mt-10">
				<label className=" font-semibold text-xl my-5">
					Chọn Color{' '}
					<Popover placement="topLeft" title={text} content={content}>
						<InfoCircleFilled />
					</Popover>
				</label>
			</div>
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center">
				{colorItems?.map((item) => (
					<div key={item.id} className="mx-auto">
						<Radio.Group onChange={onChange} value={customizeDiamond.color}>
							<Radio value={item.value}>
								<div className="flex justify-between items-center">
									<p className="font-semibold text-xl">{item.color}</p>
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
					disabled={customizeDiamond.color?.length === 0}
					onClick={handleNextStep}
				>
					Tiếp tục
				</Button>
			</div> */}
		</div>
	);
};
