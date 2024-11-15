import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, DatePicker, message, Modal, Space, Table, Tag, Tooltip, Typography} from 'antd';
import {GetAllRequestCustomizeSelector} from '../../redux/selectors';
import {
	getAllRequestUser,
	handleOrderCustomizeCheckout,
	handleOrderCustomizeProceed,
} from '../../redux/slices/customizeSlice';
import {enums} from '../../utils/constant';
import {
	CalendarOutlined,
	CheckCircleFilled,
	DeliveredProcedureOutlined,
	EyeOutlined,
	TransactionOutlined,
} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {OrderDetailModal} from './OrderDetailModal';
import {convertToVietnamDate} from '../../utils';

const {Text} = Typography;
const {RangePicker} = DatePicker;

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
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
	});

	useEffect(() => {
		dispatch(
			getAllRequestUser({
				CurrentPage: pagination.current,
				PageSize: pagination.pageSize,
				CreatedDate: startDate,
				ExpiredDate: endDate,
			})
		);
	}, [startDate, endDate, pagination]);

	useEffect(() => {
		if (requestList) {
			setDataSource(requestList?.Values || []);
		}
	}, [requestList]);

	const handleDateChange = (dates, dateStrings) => {
		setStartDate(dates[0]);
		setEndDate(dates[1]);
	};

	const toggleDetailModal = (order) => {
		setSelectedOrder(order);
		setOpenDetail(!openDetail);
	};

	const handleProceedConfirmation = (id) => {
		Modal.confirm({
			title: 'Xác nhận đơn thiết kế này',
			content: 'Bạn có chắc chắn muốn tiếp tục?',
			okText: 'Xác nhận',
			cancelText: 'Hủy',
			onOk: () => handleProceed(id),
		});
	};

	const handleCheckout = (id) => {
		navigate(`/checkout`, {state: {id}});
	};

	const handleProceed = (id) => {
		dispatch(handleOrderCustomizeProceed(id)).then((res) => {
			console.log('res', res);
			if (res.payload) {
				message.success(`Bạn đã xác nhận đơn thiết kế ${id}!`);
			} else {
				message.error('Có lỗi khi xác nhận');
			}
		});
	};

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
	};

	const mainColumns = [
		{
			title: 'Ngày Tạo Đơn',
			dataIndex: 'CreatedDate',
			key: 'createdAt',
			render: (text) => convertToVietnamDate(text),
		},
		{
			title: 'Ngày Hết Hạn',
			dataIndex: 'ExpiredDate',
			key: 'expiredDate',
			render: (text) => convertToVietnamDate(text),
		},
		{
			title: 'Ghi Chú',
			dataIndex: 'Note',
			key: 'Note',
			render: (text) => text,
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
					{record?.Status === 2 && (
						<Button onClick={() => handleProceedConfirmation(record.Id)}>
							<CheckCircleFilled />
						</Button>
					)}
					{record?.Status === 4 && (
						<Tooltip title={'Tạo Đơn Đặt Hàng'}>
							<Button
								className="bg-primary"
								onClick={() => handleCheckout(record.Id)}
							>
								<DeliveredProcedureOutlined />
							</Button>
						</Tooltip>
					)}
					<Tooltip title={'Xem Chi Tiết'}>
						<Button onClick={() => toggleDetailModal(record)}>
							<EyeOutlined />
						</Button>
					</Tooltip>
				</Space>
			),
		},
	];

	console.log('dataSource', dataSource);

	return (
		<div className="mx-40 my-20 flex flex-col">
			<span className="text-2xl font-semibold ">Danh Sách Đơn Thiết Kế Đã Gửi</span>
			<div>
				<span className="mr-2">Tìm theo ngày:</span>
				<RangePicker
					format="DD/MM/YYYY"
					suffixIcon={<CalendarOutlined />}
					style={{width: '30%'}}
					className="my-5"
					onChange={handleDateChange}
				/>
			</div>
			<Table
				columns={mainColumns}
				dataSource={dataSource}
				pagination={{
					current: pagination.current,
					pageSize: pagination.pageSize,
					total: requestList?.TotalPage,
				}}
			/>
			<OrderDetailModal
				toggleDetailModal={toggleDetailModal}
				openDetail={openDetail}
				selectedOrder={selectedOrder}
			/>
		</div>
	);
};

export default RequestCustomize;
