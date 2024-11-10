import React, {useState} from 'react';

import {Button, Image, Popover, Radio, Segmented} from 'antd';
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

export const Clarity = ({setStep, customizeDiamond, setCustomizeDiamond}) => {
	const [claritySelected, setClaritySelected] = useState('I3');

	const clarityItems = [
		{
			id: 1,
			value: 1,
			clarity: 'S12',
		},
		{
			id: 2,
			value: 2,
			clarity: 'S11',
		},
		{
			id: 3,
			value: 3,
			clarity: 'VS2',
		},
		{
			id: 4,
			value: 4,
			clarity: 'VS1',
		},
		{
			id: 5,
			value: 5,
			clarity: 'VVS2',
		},
		{
			id: 6,
			value: 6,
			clarity: 'VVS1',
		},
		{
			id: 7,
			value: 7,
			clarity: 'IF',
		},
		{
			id: 8,
			value: 8,
			clarity: 'FL',
		},
	];

	const onChange = (e) => {
		console.log('radio checked', e.target.value);
		setCustomizeDiamond((prev) => ({
			...prev,
			clarity: e.target.value,
		}));
	};

	const text = <span>Diamond Color</span>;

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
			{/* <Image className="my-10" src={clarityChart} preview={false} alt="" /> */}
			<div className="flex items-center justify-center mt-10">
				<label className=" font-semibold text-xl my-5">
					Chọn Clarity{' '}
					<Popover placement="topLeft" title={text} content={content}>
						<InfoCircleFilled />
					</Popover>
				</label>
			</div>
			<div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center ">
				{clarityItems?.map((item) => (
					<div key={item.id} className="mx-auto">
						<Radio.Group onChange={onChange} value={customizeDiamond.clarity}>
							<Radio value={item.value}>
								<div className="flex justify-center items-center">
									<p className="font-semibold text-xl">{item.clarity}</p>
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
					disabled={customizeDiamond.clarity?.length === 0}
					onClick={handleNextStep}
				>
					Tiếp tục
				</Button>
			</div> */}
		</div>
	);
};
