import React, {useState} from 'react';

import {Button, Image, Popover, Radio, Segmented, Slider} from 'antd';
import clarityChart from '../../../../../assets/Diamond-Clarity-Chart.png';

import {InfoCircleFilled} from '@ant-design/icons';
import {
	clarityFlawless,
	clarityI1I2,
	clarityI3,
	claritySI1SI2,
	clarityVS1VS2,
	clarityVSS1VSS2,
} from '../../../../../utils/image';
import {marksClarity} from '../../../../../utils/constant';

export const Clarity = ({setStep, customizeDiamond, setCustomizeDiamond, filter}) => {
	const [claritySelected, setClaritySelected] = useState('I3');

	const handleClarityChange = (value) => {
		setCustomizeDiamond((prev) => ({
			...prev,
			clarityFrom: value[0],
			clarityTo: value[1],
		}));
	};

	const text = <span>Độ Trong Kim Cương</span>;

	const content = (
		<div style={{width: 400, textAlign: 'justify'}}>
			<Segmented
				options={['I3', 'I1-I2', 'SI1-SI2', 'VS1-VS2', 'VSS1-VSS2', 'FL-IF']}
				onChange={(value) => {
					setClaritySelected(value);
				}}
				className="my-3"
			/>
			{claritySelected === 'I3' ? (
				<>
					<div className="flex justify-center items-center">
						<Image className="mt-5" src={clarityI3} preview={false} alt="" />
					</div>
					<p>
						<span className="font-semibold">I3:</span> Có tạp chất. Sẽ có tạp chất rõ
						ràng hơn hoặc có thể gây phân tâm. Diamond Shop không cung cấp kim cương có
						độ trong I3.
					</p>
				</>
			) : claritySelected === 'I1-I2' ? (
				<>
					<div className="flex justify-center items-center">
						<Image className="mt-5" src={clarityI1I2} preview={false} alt="" />
					</div>
					<p>
						<span className="font-semibold">I1-I2:</span> Có tạp chất. Kim cương có thể
						có tạp chất nhỏ có thể nhìn thấy bằng mắt thường. Diamond Shop không cung
						cấp kim cương có độ trong I1-I2.
					</p>
				</>
			) : claritySelected === 'SI1-SI2' ? (
				<>
					<div className="flex justify-center items-center">
						<Image className="mt-5" src={claritySI1SI2} preview={false} alt="" />
					</div>
					<p>
						<span className="font-semibold">SI1-SI2:</span>
						Có tạp chất nhẹ. Tạp chất có thể nhìn thấy ở độ phóng đại 10x. Giá trị tốt
						nhất nếu không có tạp chất khi nhìn bằng mắt thường. Tạp chất ở mức SI2 có
						thể được phát hiện bởi một mắt thường tinh tường.
					</p>
				</>
			) : claritySelected === 'VS1-VS2' ? (
				<>
					<div className="flex justify-center items-center">
						<Image className="mt-5" src={clarityVS1VS2} preview={false} alt="" />
					</div>
					<p>
						<span className="font-semibold">VS1-VS2:</span> Có tạp chất rất nhẹ. Tạp
						chất nhỏ, từ khó thấy (VS1) đến hơi dễ thấy (VS2) khi phóng đại 10x.
					</p>
				</>
			) : claritySelected === 'VSS1-VSS2' ? (
				<>
					<div className="flex justify-center items-center">
						<Image className="mt-5" src={clarityVSS1VSS2} preview={false} alt="" />
					</div>
					<p>
						<span className="font-semibold">VSS1-VSS2:</span> Có tạp chất rất, rất nhẹ.
						Các đặc điểm cực nhỏ và khó nhìn thấy dưới độ phóng đại 10x, ngay cả với mắt
						của chuyên gia.
					</p>
				</>
			) : (
				claritySelected === 'FL-IF' && (
					<>
						<div className="flex justify-center items-center">
							<Image className="mt-5" src={clarityFlawless} preview={false} alt="" />
						</div>
						<p>
							<span className="font-semibold">Flawless:</span> Không có tạp chất bên
							trong hay bên ngoài. Flawless: Chỉ có thể có vết khuyết bên ngoài. Cả
							hai đều rất hiếm gặp.
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
					Chọn Độ Trong (Clarity){' '}
					<Popover placement="topLeft" title={text} content={content}>
						<InfoCircleFilled />
					</Popover>
				</label>
			</div>
			<div className="mx-20 my-10">
				<Slider
					range
					marks={marksClarity}
					min={1}
					max={8}
					value={[customizeDiamond?.clarityFrom || 1, customizeDiamond?.clarityTo || 8]}
					onChange={handleClarityChange}
				/>
			</div>
		</div>
	);
};
