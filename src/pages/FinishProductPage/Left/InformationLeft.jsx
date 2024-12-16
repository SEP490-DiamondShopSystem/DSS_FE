import React, {useEffect, useState} from 'react';

import {InfoCircleFilled, MinusOutlined, PlusOutlined} from '@ant-design/icons';
import GIA_logo from '../../../assets/GIA/GIA_logo.png';
import {enums} from '../../../utils/constant';
import {fetchDiamondFiles} from '../../../redux/slices/fileSlice';
import {useDispatch} from 'react-redux';
import {Image, Popover, Segmented} from 'antd';
import {
	clarityFlawless,
	clarityI1I2,
	clarityI3,
	claritySI1SI2,
	clarityVS1VS2,
	clarityVSS1VSS2,
	colorD,
	colorE,
	colorF,
	colorG,
	colorH,
	colorI,
	colorJ,
	colorK,
	cutExcellent,
	cutGood,
	cutVeryGood,
} from '../../../utils/image';
import girdle from '../../../assets/advanceDiamond/Girdle .jpeg';
import culet from '../../../assets/advanceDiamond/Culet.jpg';

const mapAttributes = (diamonds, attributes) => {
	if (!Array.isArray(diamonds)) return [];
	return diamonds.map((data) => ({
		DiamondId: data.Id,
		Carat: data.Carat,
		Title: data.Title,
		Certificate: data.Certificate,
		Clarity:
			attributes.Clarity && data.Clarity !== undefined
				? Object.keys(attributes.Clarity).find(
						(key) => attributes.Clarity[key] === data.Clarity
				  ) || 'Unknown Clarity'
				: '',
		Color:
			attributes.Color && data.Color !== undefined
				? Object.keys(attributes.Color).find(
						(key) => attributes.Color[key] === data.Color
				  ) || 'Unknown Color'
				: '',
		Culet:
			attributes.Culet && data.Culet !== undefined
				? Object.keys(attributes.Culet)
						.find((key) => attributes.Culet[key] === data.Culet)
						.replace('_', ' ') || 'Unknown Culet'
				: '',
		Cut:
			attributes.Cut && data.Cut !== undefined
				? Object.keys(attributes.Cut)
						.find((key) => attributes.Cut[key] === data.Cut)
						.replace('_', ' ') || 'Unknown Cut'
				: '',
		Fluorescence:
			attributes.Fluorescence && data.Fluorescence !== undefined
				? Object.keys(attributes.Fluorescence).find(
						(key) => attributes.Fluorescence[key] === data.Fluorescence
				  ) || 'Unknown Fluorescence'
				: '',
		Girdle:
			attributes.Girdle && data.Girdle !== undefined
				? Object.keys(attributes.Girdle)
						.find((key) => attributes.Girdle[key] === data.Girdle)
						.replace('_', ' ') || 'Unknown Girdle'
				: '',
		Polish:
			attributes.Polish && data.Polish !== undefined
				? Object.keys(attributes.Polish)
						.find((key) => attributes.Polish[key] === data.Polish)
						.replace('_', ' ') || 'Unknown Polish'
				: '',
		Symmetry:
			attributes.Symmetry && data.Symmetry !== undefined
				? Object.keys(attributes.Symmetry)
						.find((key) => attributes.Symmetry[key] === data.Symmetry)
						.replace('_', ' ') || 'Unknown Symmetry'
				: '',
		Depth: data.Depth,
		Table: data.Table,
		Measurement: data.Measurement,
		DiamondShape: data.DiamondShape?.ShapeName,
		Price: data.TruePrice,
		IsLabDiamond: data.IsLabDiamond,
		Criteria: data.DiamondPrice?.CriteriaId,
		SerialCode: data?.SerialCode,
	}));
};

export const InformationLeft = ({jewelryDetail, diamondDetail, jewelry, diamond, Id}) => {
	const dispatch = useDispatch();
	const [showMore, setShowMore] = useState(false);
	const [certificates, setCertificates] = useState([]);
	const [colorSelected, setColorSelected] = useState('K');
	const [claritySelected, setClaritySelected] = useState('I3');
	const [cutSelected, setCutSelected] = useState('Good');

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	const mappedDiamond = mapAttributes(jewelry?.Diamonds, enums);

	useEffect(() => {
		if (mappedDiamond.length > 0) {
			const diamondIds = mappedDiamond.map((diamond) => diamond.DiamondId);

			// Fetch certificates for each diamond ID sequentially
			const fetchCertificatesForDiamonds = async () => {
				try {
					const certificateMap = {};

					for (const diamondId of diamondIds) {
						const response = await dispatch(fetchDiamondFiles(diamondId));

						if (response.payload && response.payload.Certificates) {
							certificateMap[diamondId] = response.payload.Certificates[0];
						}
					}

					setCertificates(certificateMap);
				} catch (error) {
					console.error('Error fetching diamond files:', error);
				}
			};

			fetchCertificatesForDiamonds();
		}
	}, [jewelry?.Diamonds, dispatch]);

	const text = <span>Carat (ct.)</span>;

	const content = (
		<div style={{width: 300, textAlign: 'justify'}}>
			<p>
				Đơn vị trọng lượng quốc tế, được sử dụng để đo kim cương và đá quý. 1 carat bằng 200
				miligam hoặc 0,2 gam.
			</p>
		</div>
	);

	const textClarity = <span>Độ Trong Kim Cương</span>;

	const contentClarity = (
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

	const textColor = <span>Màu Sắc Kim Cương</span>;

	const contentColor = (
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

	const textCut = <span>Chế Tác Kim Cương</span>;

	const contentCut = (
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

	const textSymmetry = <span>Độ đối xứng</span>;
	const contentSymmetry = (
		<div style={{width: 300, textAlign: 'justify'}}>
			<p>
				Độ chính xác và sự sắp xếp thẳng hàng của các mặt cắt trên viên kim cương và ảnh
				hưởng của chúng đến độ sáng lấp lánh của viên đá.
			</p>
		</div>
	);

	const textGirdle = <span>Viền cạnh kim cương</span>;
	const contentGirdle = (
		<div style={{width: 300, textAlign: 'justify'}}>
			<div className="flex items-center justify-center">
				<Image src={girdle} preview={false} />
			</div>
			<p>
				Độ chính xác và sự sắp xếp thẳng hàng của các mặt cắt trên viên kim cương và ảnh
				hưởng của chúng đến độ sáng lấp lánh của viên đá.
			</p>
		</div>
	);

	const textCulet = <span>Chóp đáy kim cương</span>;
	const contentCulet = (
		<div style={{width: 300, textAlign: 'justify'}}>
			<div className="flex items-center justify-center">
				<Image src={culet} preview={false} />
			</div>
			<p>
				Độ chính xác và sự sắp xếp thẳng hàng của các mặt cắt trên viên kim cương và ảnh
				hưởng của chúng đến độ sáng lấp lánh của viên đá.
			</p>
		</div>
	);

	const textPolish = <span>Độ bóng</span>;

	const contentPolish = (
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
		<>
			<div className="bg-gray-50 rounded-lg w-full mt-10 ">
				{mappedDiamond?.map((diamond) => (
					<>
						<h2 className="text-lg font-semibold flex items-center justify-center my-10">
							Thông Số Kim Cương {diamond?.IsLabDiamond ? 'Nhân Tạo' : 'Tự Nhiên'}
						</h2>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray">Giấy chứng nhận</span>
							<div>
								{certificates[diamond.DiamondId] ? (
									<div className="flex items-center space-x-2 mb-2">
										<a
											href={certificates[diamond.DiamondId].MediaPath}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue hover:underline"
										>
											View Report
										</a>
									</div>
								) : (
									<span className="text-gray">Không có</span>
								)}
							</div>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Mã Định Danh</span>
							<span className="text-gray-800">{diamond?.SerialCode}</span>
						</div>

						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Giác cắt (Cut)</span>
							<div className="flex items-center">
								<span className="text-gray-800 flex items-center mr-2">
									{diamond.Cut}{' '}
								</span>{' '}
								<Popover placement="topLeft" title={textCut} content={contentCut}>
									<InfoCircleFilled />
								</Popover>
							</div>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Màu Sắc (Color)</span>
							<div className="flex items-center">
								<span className="text-gray-800 flex items-center mr-2">
									{diamond.Color}{' '}
								</span>
								<Popover
									placement="topLeft"
									title={textColor}
									content={contentColor}
								>
									<InfoCircleFilled />
								</Popover>
							</div>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Độ Tinh Khiết (Clarity)</span>
							<div className="flex items-center">
								<span className="text-gray-800 flex items-center mr-2">
									{diamond.Clarity}{' '}
								</span>
								<Popover
									placement="topLeft"
									title={textClarity}
									content={contentClarity}
								>
									<InfoCircleFilled />
								</Popover>
							</div>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Ly (Carat)</span>
							<div className="flex items-center">
								<span className="text-gray-800 flex items-center mr-2">
									{diamond.Carat}{' '}
								</span>
								<Popover placement="topLeft" title={text} content={content}>
									<InfoCircleFilled />
								</Popover>
							</div>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Huỳnh quang (Fluorescence)</span>
							<span className="text-gray-800 flex items-center">
								{diamond.Fluorescence.replace('_', ' ')}
							</span>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Độ sâu (Depth) %</span>
							<span className="text-gray-800">{diamond?.Depth}</span>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Bảng đáy (Table) %</span>
							<span className="text-gray-800">{diamond?.Table}</span>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Độ bóng (Polish)</span>
							<div>
								<span className="text-gray-800 mr-2">{diamond.Polish}</span>
								<Popover
									placement="topLeft"
									title={textPolish}
									content={contentPolish}
								>
									<InfoCircleFilled />
								</Popover>
							</div>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Độ đối xứng (Symmetry)</span>
							<div>
								<span className="text-gray-800 mr-2">{diamond.Symmetry}</span>
								<Popover
									placement="topLeft"
									title={textSymmetry}
									content={contentSymmetry}
								>
									<InfoCircleFilled />
								</Popover>
							</div>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Viền cạnh (Girdle)</span>
							<div>
								<span className="text-gray-800 mr-2">{diamond.Girdle}</span>
								<Popover
									placement="topLeft"
									title={textGirdle}
									content={contentGirdle}
								>
									<InfoCircleFilled />
								</Popover>
							</div>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Chóp đáy (Culet)</span>
							<div>
								<span className="text-gray-800 mr-2">{diamond.Culet}</span>
								<Popover
									placement="topLeft"
									title={textCulet}
									content={contentCulet}
								>
									<InfoCircleFilled />
								</Popover>
							</div>
						</div>
						<div className="flex justify-between px-4 py-2">
							<span className="text-gray-600">Kích Thước</span>
							<span className="text-gray-800">{diamond?.Measurement}</span>
						</div>
						<div className="bg-gray-50 rounded-lg w-full">
							<div className="flex justify-center items-center text-xl font-semibold my-10">
								<span>Thông Số Kim Cương Tấm</span>
							</div>
							<div class="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Ly(Carat)</span>
								<span className="text-gray-800">{jewelry?.SideDiamond?.Carat}</span>
							</div>

							<div className="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Độ Tinh Khiết (Clarity)</span>
								<span className="text-gray-800 flex items-center">
									{Object.keys(enums.Clarity).find(
										(key) =>
											enums.Clarity[key] === jewelry?.SideDiamond?.ClarityMin
									)}
									-{' '}
									{Object.keys(enums.Clarity).find(
										(key) =>
											enums.Clarity[key] === jewelry?.SideDiamond?.ClarityMax
									)}
								</span>
							</div>
							<div className="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Màu Sắc (Color)</span>
								<span className="text-gray-800 flex items-center">
									{Object.keys(enums.Color).find(
										(key) => enums.Color[key] === jewelry?.SideDiamond?.ColorMin
									)}
									-{' '}
									{Object.keys(enums.Color).find(
										(key) => enums.Color[key] === jewelry?.SideDiamond?.ColorMax
									)}
								</span>
							</div>
							<div className="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Số lượng</span>
								<span className="text-gray-800 flex items-center">
									{jewelry?.SideDiamond?.Quantity}
								</span>
							</div>
						</div>
					</>
				))}
			</div>
			{jewelry?.Diamonds?.length > 0 ? (
				<>
					<div
						className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
							showMore ? 'max-h-screen' : 'max-h-0'
						}`}
					>
						<div className="bg-gray-50  rounded-lg shadow-md w-full">
							<div className="flex justify-center items-center text-xl font-semibold my-10">
								<span>Thông Số Vỏ</span>
							</div>
							<div class="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Mã sê-ri</span>
								<span className="text-gray-800">{jewelry?.SerialCode}</span>
							</div>
							<div class="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Vật Liệu</span>
								<span className="text-gray-800">{jewelry?.Metal?.Name}</span>
							</div>

							<div className="flex justify-between px-4 border-b border-tintWhite py-2">
								<span className="text-gray-600">Kích Cỡ Nhẫn (mm)</span>
								<span className="text-gray-800 flex items-center">
									{jewelry?.Size?.Value}
								</span>
							</div>
						</div>
					</div>
					<div
						className="border-y my-4 flex justify-between cursor-pointer"
						onClick={toggleShowMore}
					>
						<div className="text-black m-4 px-4 rounded-lg focus:outline-none ">
							{showMore ? 'Thu Gọn' : 'Xem Thêm'}
						</div>
						<div className="m-4 px-4 rounded-lg focus:outline-none">
							{showMore ? <MinusOutlined /> : <PlusOutlined />}
						</div>
					</div>
				</>
			) : (
				<>
					<div className="bg-gray-50  rounded-lg shadow-md w-full">
						<div className="flex justify-center items-center text-xl font-semibold my-10">
							<span>Thông Số Vỏ</span>
						</div>
						<div class="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Vật Liệu</span>
							<span className="text-gray-800">{jewelry?.Metal?.Name}</span>
						</div>

						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Kích Cỡ Nhẫn (mm)</span>
							<span className="text-gray-800 flex items-center">
								{jewelry?.Size?.Value}
							</span>
						</div>
						<div className="flex justify-between px-4 border-b border-tintWhite py-2">
							<span className="text-gray-600">Kim Cương Tấm</span>
							<span className="text-gray-800 flex items-center">
								Số viên: {jewelry?.SideDiamond?.Quantity} - Ly{' '}
								{jewelry?.SideDiamond?.Carat}
							</span>
						</div>
					</div>
				</>
			)}
		</>
	);
};
