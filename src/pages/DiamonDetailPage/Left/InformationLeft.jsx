import React, {useState, useEffect} from 'react';

import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {fetchDiamondFiles} from '../../../redux/slices/fileSlice';
import GIA_logo from '../../../assets/GIA/GIA_logo.png';

export const InformationLeft = ({diamond, diamondId}) => {
	const dispatch = useDispatch();
	const [showMore, setShowMore] = useState(false);
	const [certificates, setCertificates] = useState([]);

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

	console.log('diamond', diamond);

	return (
		<>
			<div className="bg-gray-50 rounded-lg shadow-md w-full mt-10 ">
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
										{certificate.MediaName || `Certificate ${index + 1}`}
									</a>
								</div>
							))
						) : (
							<span className="text-gray-800">Không có</span>
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
					<span className="text-gray-800 flex items-center">{diamond.Cut}</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Color</span>
					<span className="text-gray-800 flex items-center">{diamond.Color}</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Clarity</span>
					<span className="text-gray-800 flex items-center">{diamond.Clarity}</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Trọng lượng Carat</span>
					<span className="text-gray-800 flex items-center">{diamond.Carat}</span>
				</div>
				<div className="flex justify-between px-4 border-b border-tintWhite py-2">
					<span className="text-gray-600">Fluorescence</span>
					<span className="text-gray-800 flex items-center">{diamond.Fluorescence}</span>
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
