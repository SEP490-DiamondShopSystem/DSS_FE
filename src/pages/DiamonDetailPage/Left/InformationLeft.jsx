import React, {useState, useEffect} from 'react';

import {InfoCircleFilled, MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {fetchDiamondFiles} from '../../../redux/slices/fileSlice';
import GIA_logo from '../../../assets/GIA/GIA_logo.png';
import {Popover, Segmented, Image} from 'antd';
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

export const InformationLeft = ({diamond, diamondId}) => {
	const dispatch = useDispatch();
	const [showMore, setShowMore] = useState(false);
	const [certificates, setCertificates] = useState([]);
	const [colorSelected, setColorSelected] = useState('K');
	const [claritySelected, setClaritySelected] = useState('I3');
	const [cutSelected, setCutSelected] = useState('Good');

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	// Fetch certificates when component mounts or when `diamond` changes
	useEffect(() => {
		dispatch(fetchDiamondFiles(diamondId)).then((response) => {
			if (response.payload) {
				console.log('Fetched Certificates:', response);
				setCertificates(response.payload.Certificates);
			} else {
				console.log('No certificates found for diamond ID:', diamondId);
			}
		});
	}, [diamond, dispatch]);

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

	return (
		<>
			<div className="bg-gray-50 w-full mt-10 ">
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray">Giấy chứng nhận</span>
					<div>
						{certificates.length > 0 ? (
							certificates.map((certificate, index) => (
								<div key={index} className="flex items-center space-x-2 mb-2">
									<a
										href={certificate.MediaPath}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue hover:underline"
									>
										View Report
									</a>
								</div>
							))
						) : (
							<span className="text-gray">Không có</span>
						)}
					</div>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Mã Định Danh</span>
					<span className="text-gray-800">{diamond.SerialCode}</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Hình dạng</span>
					<span className="text-gray-800">{diamond.DiamondShape}</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Cut</span>
					<span className="text-gray-800 flex items-center">
						{diamond.Cut}{' '}
						<Popover placement="topLeft" title={textCut} content={contentCut}>
							<InfoCircleFilled />
						</Popover>
					</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Color</span>
					<span className="text-gray-800 flex items-center">
						{diamond.Color}{' '}
						<Popover placement="topLeft" title={textColor} content={contentColor}>
							<InfoCircleFilled />
						</Popover>
					</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Clarity</span>
					<span className="text-gray-800 flex items-center">
						{diamond.Clarity}{' '}
						<Popover placement="topLeft" title={textClarity} content={contentClarity}>
							<InfoCircleFilled />
						</Popover>
					</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Trọng lượng Carat</span>
					<span className="text-gray-800 flex items-center">
						{diamond.Carat}{' '}
						<Popover placement="topLeft" title={text} content={content}>
							<InfoCircleFilled />
						</Popover>
					</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Fluorescence</span>
					<span className="text-gray-800 flex items-center">
						{diamond.Fluorescence.replace('_', ' ')}
					</span>
				</div>
			</div>

			<div
				className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
					showMore ? 'max-h-screen' : 'max-h-0'
				}`}
			>
				<div className="bg-gray-50 rounded-lg shadow-md w-full ">
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Depth %</span>
						<span className="text-gray-800">{diamond.Depth}</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Table %</span>
						<span className="text-gray-800">{diamond.Table}</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Polish</span>
						<span className="text-gray-800">{diamond.Polish}</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Symmetry</span>
						<span className="text-gray-800">{diamond.Symmetry}</span>
					</div>
					<div className="flex justify-between px-4 border-b border-tintWhite py-2">
						<span className="text-gray-600">Girdle</span>
						<span className="text-gray-800">{diamond.Girdle}</span>
					</div>
					<div className="flex justify-between px-4 py-2">
						<span className="text-gray-600">Kích thước</span>
						<span className="text-gray-800">{diamond?.Measurement}</span>
					</div>
				</div>
			</div>
			<div
				className="border-y my-4 flex justify-between cursor-pointer"
				onClick={toggleShowMore}
			>
				<div className="text-black m-4 px-4 rounded-lg focus:outline-none">
					{showMore ? 'Hiện Ít Hơn' : 'Hiện Thêm'}
				</div>
				<div className="m-4 px-4 rounded-lg focus:outline-none">
					{showMore ? <MinusOutlined /> : <PlusOutlined />}
				</div>
			</div>
		</>
	);
};
