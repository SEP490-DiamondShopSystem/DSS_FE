import {
	CalendarOutlined,
	CheckCircleOutlined,
	ClockCircleFilled,
	CloseCircleFilled,
	CloseCircleOutlined,
	DeliveredProcedureOutlined,
	EyeOutlined,
	HourglassOutlined,
	OrderedListOutlined,
} from '@ant-design/icons';
import {Button, DatePicker, Space, Table, Tag, Tooltip, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import NavbarProfile from '../../components/NavbarProfile';
import {GetAllRequestCustomizeSelector} from '../../redux/selectors';
import {getAllRequestUser} from '../../redux/slices/customizeSlice';
import {convertToVietnamDate} from '../../utils';
import {enums} from '../../utils/constant';
import {OrderDetailModal} from './OrderDetailModal';

const {Text} = Typography;
const {RangePicker} = DatePicker;

const orderStatus = [
	{icon: <OrderedListOutlined />, name: 'Tổng đơn thiết kế', status: '', order: 1},
	{icon: <HourglassOutlined />, name: 'Đơn chờ xử lí', status: '1', order: 2},
	{icon: <HourglassOutlined />, name: 'Đã có giá', status: '2', order: 2},
	// {icon: <CheckCircleOutlined />, name: 'Đã đồng ý', status: '3', order: 3},
	{icon: <DeliveredProcedureOutlined />, name: 'Tạo Đơn Đặt Hàng', status: '4', order: 4},
	// {icon: <CloseCircleFilled />, name: 'Shop Từ Chối', status: '5', order: 5},
	// {icon: <CloseCircleOutlined />, name: 'Hủy Đơn', status: '6', order: 6},
];

const RequestCustomize = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestList = useSelector(GetAllRequestCustomizeSelector);
	const [dataSource, setDataSource] = useState([]);
	const [expandedRowKeys, setExpandedRowKeys] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [openDetail, setOpenDetail] = useState(false);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [status, setStatus] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [isLgScreen, setIsLgScreen] = useState(window.innerWidth >= 1024);

	useEffect(() => {
		const handleResize = () => {
			setIsLgScreen(window.innerWidth >= 1024);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		dispatch(
			getAllRequestUser({
				CurrentPage: currentPage,
				PageSize: pageSize,
				CreatedDate: startDate,
				ExpiredDate: endDate,
				Status: status,
			})
		);
	}, [startDate, endDate, currentPage, pageSize, status]);

	useEffect(() => {
		if (requestList) {
			setDataSource(requestList?.Values || []);
		}
	}, [requestList]);

	console.log('requestList', requestList?.TotalPage);

	const reverseEnum = (enumObj) => {
		return Object.fromEntries(
			Object.entries(enumObj).map(([key, value]) => [value, key.replace(/_/g, ' ')])
		);
	};
	const reversedEnums = {
		Clarity: reverseEnum(enums.Clarity),
		Color: reverseEnum(enums.Color),
		Culet: reverseEnum(enums.Culet),
		Cut: reverseEnum(enums.Cut),
		Girdle: reverseEnum(enums.Girdle),
		Polish: reverseEnum(enums.Polish),
		Symmetry: reverseEnum(enums.Symmetry),
		Status: reverseEnum(enums.CustomizeRequestStatus),
		Shapes: reverseEnum(enums.Shapes),
	};

	const statusColors = {
		1: 'orange', // Pending
		2: 'blue', // Priced
		3: 'purple', // Requesting
		4: 'green', // Accepted
		5: 'red', // Shop_Rejected
		6: 'volcano', // Customer_Rejected
		7: 'volcano', // Customer_Cancelled
	};

	const handleDateChange = (dates, dateStrings) => {
		setStartDate(dates[0]);
		setEndDate(dates[1]);
	};

	const toggleDetailModal = (order) => {
		setSelectedOrder(order);
		setOpenDetail(!openDetail);
	};

	const handleStatusClick = (newStatus) => {
		setStatus(newStatus);
		// setCurrentPage(1);
	};

	const mainColumns = [
		{
			title: 'Mã Yêu Cầu',
			dataIndex: 'RequestCode',
			key: 'requestCode',
			render: (text) => text,
		},
		{
			title: 'Ngày Tạo Đơn',
			dataIndex: 'CreatedDate',
			key: 'createdAt',
			render: (text) => text,
		},
		{
			title: 'Ngày Hết Hạn',
			dataIndex: 'ExpiredDate',
			key: 'expiredDate',
			responsive: ['md'],
			render: (text) => text,
		},
		{
			title: 'Ghi Chú',
			dataIndex: 'Note',
			key: 'Note',
			render: (text) => text,
			responsive: ['md'],
		},
		{
			title: 'Trạng Thái',
			dataIndex: 'Status',
			key: 'status',
			render: (status) => {
				const statusLabel = reversedEnums.Status[status] || 'Unknown';
				const color = statusColors[status] || 'default';
				return <Tag color={color}>{statusLabel.toUpperCase()}</Tag>;
			},
		},
		{
			title: '',
			key: 'actions',
			render: (record) => (
				<Space className="">
					<Tooltip title={'Xem Chi Tiết'}>
						<Button onClick={() => toggleDetailModal(record)}>
							<EyeOutlined />
						</Button>
					</Tooltip>
				</Space>
			),
		},
	];

	return (
		<>
			<Helmet>
				<title>Danh Sách Đơn Thiết Kế</title>
			</Helmet>
			<div className="my-20 min-h-96 flex z-50">
				{isLgScreen && (
					<div className="lg:mr-20 mb-10 lg:mb-0">
						<NavbarProfile />
					</div>
				)}

				<div className="font-semibold w-full px-5 sm:px-10 md:px-12 lg:px-20 py-10 bg-white rounded-lg lg:shadow-lg">
					<span className="text-xl sm:text-2xl font-semibold">
						Danh Sách Đơn Thiết Kế Đã Gửi
					</span>

					<div className="flex flex-wrap items-center font-medium justify-between mt-10 gap-5">
						{orderStatus.map((statusItem) => (
							<div
								key={statusItem.status}
								className={`flex flex-col sm:flex-row items-center justify-center sm:justify-around shadow-xl py-2 sm:py-3 px-4 sm:px-12 border-gray-300 hover:border-black w-full sm:w-auto ${
									status === statusItem.status ? 'bg-primary' : 'bg-white'
								} rounded-lg cursor-pointer border ${
									status === statusItem.status ? 'border-black' : 'border-white'
								} hover:border-black`}
								onClick={() => handleStatusClick(statusItem.status)}
							>
								<div className="p-2 sm:p-3 w-16 sm:w-20">{statusItem.icon}</div>
								<div className="ml-3 sm:ml-5 text-sm sm:text-base">
									{statusItem.name}
								</div>
							</div>
						))}
					</div>

					<div className="mt-5 sm:mt-8">
						<span className="mr-2 text-sm sm:text-base">Tìm theo ngày:</span>
						<RangePicker
							format="DD/MM/YYYY"
							suffixIcon={<CalendarOutlined />}
							style={{width: '100%', maxWidth: '300px'}}
							className="my-5"
							onChange={handleDateChange}
						/>
					</div>

					<div className="overflow-x-auto mt-5">
						<Table
							columns={mainColumns}
							dataSource={dataSource}
							pagination={{
								current: currentPage,
								total: requestList?.TotalPage * pageSize,
								pageSize: pageSize,
								onChange: (page) => setCurrentPage(page),
								onShowSizeChange: (current, size) => setPageSize(size),
							}}
						/>
					</div>

					<OrderDetailModal
						toggleDetailModal={toggleDetailModal}
						openDetail={openDetail}
						selectedOrder={selectedOrder}
					/>
				</div>
			</div>
		</>
	);
};

export default RequestCustomize;
