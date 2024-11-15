import React, {useEffect, useState} from 'react';
import {EyeOutlined, StarOutlined} from '@ant-design/icons';
import {Button, Form, Image, Input, message, Modal, Rate, Table, Tag, Upload} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import logo from '../../assets/logo-short-ex.png';
import '../../css/antd.css';
import {GetAllOrderDetailSelector, GetRequestCustomizeDetailSelector} from '../../redux/selectors';
import {getUserOrderDetail, handleOrderCancel} from '../../redux/slices/orderSlice';
import {handleReviewOrder} from '../../redux/slices/reviewSlice';
import {convertToVietnamDate, formatPrice} from '../../utils';
import {OrderStatus} from './OrderStatus';
import {
	getRequestCustomizeDetail,
	handleOrderCustomizeCancel,
} from '../../redux/slices/customizeSlice';
import {enums} from '../../utils/constant';

export const OrderDetailModal = ({openDetail, toggleDetailModal, selectedOrder}) => {
	const dispatch = useDispatch();
	const orderDetail = useSelector(GetRequestCustomizeDetailSelector);

	const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
	const [expandedRowKeys, setExpandedRowKeys] = useState([]);
	const [order, setOrder] = useState(null);
	const orderStatus = order?.Status;

	console.log('orderStatus', orderStatus);

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
			title: 'Mẫu',
			dataIndex: 'JewelryModel',
			key: 'jewelryName',
			render: (text) => {
				return text?.Name || 'No name available';
			},
		},
		{
			title: 'Vật Liệu',
			dataIndex: 'Metal',
			key: 'metalName',
			render: (text) => {
				return text?.Name || 'No name available';
			},
		},
		{
			title: 'Chữ Khắc',
			dataIndex: 'EngravedText',
			key: 'engravedText',
			render: (text) => text || 'No text',
		},
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
			title: 'Trạng Thái',
			dataIndex: 'Status',
			key: 'status',
			render: (status) => {
				const statusLabel = reversedEnums.Status[status] || 'Không';
				const color = statusColors[status] || 'default';
				return <Tag color={color}>{statusLabel.toUpperCase()}</Tag>;
			},
		},
	];

	const subColumns = [
		{
			title: 'Từ Ly (Carat)',
			dataIndex: 'CaratFrom',
			key: 'caratFrom',
		},
		{
			title: 'Đến Ly (Carat)',
			dataIndex: 'CaratTo',
			key: 'caratTo',
		},
		{
			title: 'Độ Trong (Clarity)',
			dataIndex: 'Clarity',
			key: 'clarity',
			render: (clarity) => reversedEnums.Clarity[clarity] || 'Không',
		},
		{
			title: 'Màu Sắc (Color)',
			dataIndex: 'Color',
			key: 'color',
			render: (color) => reversedEnums.Color[color] || 'Không',
		},
		{
			title: 'Chế Tác (Cut)',
			dataIndex: 'Cut',
			key: 'cut',
			render: (cut) => reversedEnums.Cut[cut] || 'Không',
		},
		{
			title: 'Chóp Đáy (Culet)',
			dataIndex: 'Culet',
			key: 'culet',
			render: (culet) => reversedEnums.Culet[culet] || 'Không',
		},
		{
			title: 'Viền Cạnh (Girdle)',
			dataIndex: 'Girdle',
			key: 'girdle',
			render: (girdle) => reversedEnums.Girdle[girdle] || 'Không',
		},
		{
			title: 'Độ Bóng (Polish)',
			dataIndex: 'Polish',
			key: 'polish',
			render: (polish) => reversedEnums.Polish[polish] || 'Không',
		},
		{
			title: 'Độ đối xứng (Symmetry)',
			dataIndex: 'Symmetry',
			key: 'symmetry',
			render: (symmetry) => reversedEnums.Symmetry[symmetry] || 'Không',
		},
		{
			title: 'Hình Dạng',
			dataIndex: 'DiamondShapeId',
			key: 'shape',
			render: (shape) => reversedEnums.Shapes[shape] || 'Không',
		},
		{
			title: 'Nguồn Gốc',
			dataIndex: 'IsLabGrown',
			key: 'IsLabGrown',
			render: (shape) => (shape ? 'Nhân Tạo' : 'Tự Nhiên'),
		},
	];

	const handleExpand = (expanded, record) => {
		setExpandedRowKeys(expanded ? [record.Id] : []);
	};

	const expandedRowRender = (record) => (
		<Table
			columns={subColumns}
			dataSource={record.DiamondRequests}
			pagination={false}
			rowKey={(item) => item.DiamondRequestId}
		/>
	);

	useEffect(() => {
		if (selectedOrder) {
			dispatch(getRequestCustomizeDetail(selectedOrder.Id));
		}
	}, [selectedOrder, dispatch]);

	useEffect(() => {
		if (orderDetail) {
			setOrder(orderDetail);
		}
	}, [orderDetail]);

	const handleCancelOrder = () => {
		setIsCancelModalVisible(true);
	};

	const submitCancelOrder = async (values) => {
		const res = await dispatch(handleOrderCustomizeCancel(selectedOrder.Id));
		if (res.payload !== undefined) {
			message.success('Hủy đơn thành công!');
		} else {
			message.error('Lỗi hệ thống!');
		}
		setIsCancelModalVisible(false);
	};

	return (
		<>
			{openDetail && (
				<div
					onClick={toggleDetailModal}
					className="fixed inset-0 bg-black bg-opacity-50 z-10"
				></div>
			)}
			{openDetail && (
				<div
					className="fixed top-1/2 right-1/2 bg-white transform transition-transform duration-300 ease-in-out z-50 translate-x-1/2 -translate-y-1/2 p-10"
					style={{width: 1200, maxHeight: '80vh', overflowY: 'auto'}}
				>
					<div className="flex justify-between items-center">
						<div>
							<Image
								src={logo}
								alt="Logo"
								preview={false}
								className="max-h-10 max-w-10 mb-2"
							/>
							<p>Thủ Đức, TP.Hồ Chí Minh, VietNam</p>
						</div>
						<div className="text-end">
							<h2 className="uppercase text-2xl font-semibold">
								Trạng thái đơn hàng
							</h2>
							{/* <p>Hóa đơn: #{order?.OrderCode}</p> */}
							<p>Ngày: {convertToVietnamDate(order?.CreatedDate)}</p>
						</div>
					</div>

					{/* <div className="mt-5">
						<h2 className="text-2xl font-semibold">Địa chỉ giao hàng</h2>
						<p>{order?.ShippingAddress}</p>
					</div> */}
					<OrderStatus
						order={orderDetail}
						orderStatus={orderStatus}
						orderDetail={orderDetail}
					/>

					<div className="flex justify-between">
						<h1 className="text-xl font-semibold">Chi tiết đơn hàng</h1>
						{orderStatus === 2 && (
							<Button
								type="text"
								className="bg-red text-white"
								onClick={handleCancelOrder}
							>
								Hủy Đơn
							</Button>
						)}
					</div>
					<div className="mt-10">
						<Table
							columns={mainColumns}
							dataSource={order ? [order] : []}
							pagination={false}
							rowKey="Id"
							expandedRowRender={expandedRowRender}
							expandedRowKeys={expandedRowKeys}
							onExpand={handleExpand}
						/>
					</div>
				</div>
			)}

			<Modal
				title="Hủy đơn hàng"
				visible={isCancelModalVisible}
				onCancel={() => setIsCancelModalVisible(false)}
				footer={null}
			>
				<Form onFinish={submitCancelOrder}>
					{/* <Form.Item
						name="reason"
						rules={[{required: true, message: 'Vui lòng cung cấp lý do hủy!'}]}
					>
						<Input.TextArea placeholder="Lý Do Hủy" rows={3} />
					</Form.Item> */}
					<Button type="primary" htmlType="submit" block>
						Submit
					</Button>
				</Form>
			</Modal>
		</>
	);
};
