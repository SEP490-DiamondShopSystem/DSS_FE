import React, {useState} from 'react';

import {Button, Image, Popover, Radio, Segmented, Slider} from 'antd';
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
import {marks} from '../../../../../utils/constant';

export const Color = ({setStep, customizeDiamond, setCustomizeDiamond}) => {
	const [colorSelected, setColorSelected] = useState('K');

	const handleColorChange = (value) => {
		setCustomizeDiamond((prev) => ({
			...prev,
			colorFrom: value[0],
			colorTo: value[1],
		}));
	};

	const text = <span>Màu Sắc Kim Cương</span>;

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
					Chọn Màu Sắc (Color){' '}
					<Popover placement="topLeft" title={text} content={content}>
						<InfoCircleFilled />
					</Popover>
				</label>
			</div>
			<div className="mx-20 my-10">
				<Slider
					range
					marks={marks}
					min={1}
					max={8}
					value={[customizeDiamond.colorFrom || 1, customizeDiamond.colorTo || 8]}
					onChange={handleColorChange}
				/>
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
