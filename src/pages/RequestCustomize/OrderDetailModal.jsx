import {Button, Form, Image, message, Modal, Space, Table, Tag, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import logo from '../../assets/logo-short-ex.png';
import {
	GetLoadingCustomizeSelector,
	GetRequestCustomizeDetailSelector,
} from '../../redux/selectors';
import {
	getRequestCustomizeDetail,
	handleOrderCustomizeCancel,
	handleOrderCustomizeProceed,
	handleOrderCustomizeReject,
} from '../../redux/slices/customizeSlice';
import {enums} from '../../utils/constant';
import {OrderStatus} from './OrderStatus';
import {formatPrice} from '../../utils';
import InformationUser from './InformationUser';

const {Title, Text} = Typography;

export const OrderDetailModal = ({openDetail, toggleDetailModal, selectedOrder}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const orderDetail = useSelector(GetRequestCustomizeDetailSelector);
	const loading = useSelector(GetLoadingCustomizeSelector);

	const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
	const [expandedRowKeys, setExpandedRowKeys] = useState([]);
	const [order, setOrder] = useState(null);
	const orderStatus = order?.Status;

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
		1: 'orange',
		2: 'blue',
		3: 'purple',
		4: 'green',
		5: 'red',
		6: 'volcano',
		7: 'volcano',
	};

	const mainColumns = [
		{
			title: 'Mẫu',
			dataIndex: 'JewelryModel',
			key: 'jewelryName',
			render: (text) => {
				return text?.Name;
			},
		},
		{
			title: 'Vật Liệu',
			dataIndex: 'Metal',
			key: 'metalName',
			render: (text) => {
				return text?.Name;
			},
		},
		{
			title: 'Chữ Khắc',
			dataIndex: 'EngravedText',
			key: 'engravedText',
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
			render: (text) => text,
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
			title: 'Ly (Carat)',
			dataIndex: 'CaratFrom',
			key: 'caratRange',
			render: (CaratFrom, record) => `${CaratFrom} - ${record.CaratTo}`,
		},

		{
			title: 'Độ Trong (Clarity)',
			key: 'clarityRange',
			render: (record) => {
				const clarityFrom = reversedEnums.Clarity[record.ClarityFrom] || 'Không';
				const clarityTo = reversedEnums.Clarity[record.ClarityTo] || 'Không';
				return `${clarityFrom} - ${clarityTo}`;
			},
		},
		{
			title: 'Màu Sắc (Color)',
			key: 'colorRange',
			render: (record) => {
				const colorFrom = reversedEnums.Color[record.ColorFrom] || 'Không';
				const colorTo = reversedEnums.Color[record.ColorTo] || 'Không';
				return `${colorFrom} - ${colorTo}`;
			},
		},
		{
			title: 'Chế Tác (Cut)',
			key: 'cutRange',
			render: (record) => {
				const cutFrom = reversedEnums.Cut[record.CutFrom] || 'Không';
				const cutTo = reversedEnums.Cut[record.CutTo] || 'Không';
				return `${cutFrom} - ${cutTo}`;
			},
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

	const sub2Columns = [
		{
			title: 'Ly (Carat)',
			dataIndex: 'Carat',
			key: 'carat',
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
		{
			title: 'Giá',
			dataIndex: 'TruePrice',
			key: 'TruePrice',
			align: 'center',
			render: (TruePrice) => formatPrice(TruePrice),
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
			expandedRowRender={expandedRow2Render}
			summary={() => (
				<Table.Summary.Row>
					<Table.Summary.Cell colSpan={subColumns.length}>
						<Text strong>Thông tin đơn yêu cầu của khách</Text>
					</Table.Summary.Cell>
				</Table.Summary.Row>
			)}
		/>
	);

	const expandedRow2Render = (record) => (
		<Table
			columns={sub2Columns}
			dataSource={record.Diamond ? [record.Diamond] : []}
			pagination={false}
			rowKey={(item) => item.Id}
			summary={() => (
				<Table.Summary.Row>
					<Table.Summary.Cell colSpan={subColumns.length}>
						<Text strong>Thông tin kim cương đã thêm cho đơn</Text>
					</Table.Summary.Cell>
				</Table.Summary.Row>
			)}
		/>
	);

	const handleProceedConfirmation = () => {
		Modal.confirm({
			title: 'Đồng ý đơn thiết kế này',
			content: 'Bạn có chắc chắn muốn tiếp tục?',
			okText: 'Đồng Ý',
			cancelText: 'Hủy Bỏ',
			onOk: handleProceed,
		});
	};

	const handleProceed = () => {
		dispatch(handleOrderCustomizeProceed(selectedOrder.Id))
			.unwrap()
			.then((res) => {
				message.success(`Bạn đã xác nhận đơn thiết kế ${selectedOrder.Id}!`);
			})
			.catch((error) => {
				message.error(error?.data?.detail || error?.detail);
			});
	};

	const handleCancelOrder = () => {
		Modal.confirm({
			title: 'Hủy đơn đơn thiết kế này',
			content: 'Bạn có chắc chắn muốn tiếp tục?',
			okText: 'Xác nhận',
			cancelText: 'Hủy Bỏ',
			onOk: submitCancelOrder,
		});
	};

	const submitCancelOrder = () => {
		dispatch(handleOrderCustomizeCancel(selectedOrder.Id))
			.unwrap()
			.then(() => {
				message.success('Hủy yêu cầu thành công!');
				setIsCancelModalVisible(false);
			})
			.catch((error) => {
				message.error(error?.data?.detail || error?.detail);
			});
	};

	const handleRejectOrder = () => {
		Modal.confirm({
			title: 'Từ chối đơn thiết kế này',
			content: 'Bạn có chắc chắn muốn tiếp tục?',
			okText: 'Xác nhận',
			cancelText: 'Hủy Bỏ',
			onOk: submitRejectOrder,
		});
	};

	const submitRejectOrder = () => {
		dispatch(handleOrderCustomizeReject(selectedOrder.Id))
			.unwrap()
			.then(() => {
				message.success('Hủy yêu cầu thành công!');
				setIsRejectModalVisible(false);
			})
			.catch((error) => {
				message.error(error?.data?.detail || error?.detail);
			});
	};

	const handleCheckout = () => {
		navigate(`/checkout`, {state: {order}});
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
					style={{width: '95%', maxHeight: '80vh', overflowY: 'auto'}}
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
								Trạng thái đơn thiết kế
							</h2>

							<p>Ngày: {order?.CreatedDate}</p>
						</div>
					</div>

					<OrderStatus
						order={orderDetail}
						orderStatus={orderStatus}
						orderDetail={orderDetail}
					/>
					<div className="my-5">
						<Title level={3} className="mb-5">
							Thông Tin Khách Hàng
						</Title>
						<InformationUser order={order} />
					</div>
					<div className="flex justify-between">
						<Title level={3}>Chi tiết đơn thiết kế</Title>
						{orderStatus === 1 && (
							<Space>
								<Button danger className="" onClick={handleCancelOrder}>
									Hủy Đơn
								</Button>
							</Space>
						)}
						{orderStatus === 2 && (
							<Space>
								<Button
									type="text"
									className="bg-primary "
									onClick={handleProceedConfirmation}
									loading={loading}
								>
									Đồng Ý Đơn
								</Button>
								<Button danger className="" onClick={handleRejectOrder}>
									Từ Chối Đơn
								</Button>
							</Space>
						)}
						{orderStatus === 3 && (
							<Space>
								<Button danger className="" onClick={handleCancelOrder}>
									Hủy Đơn
								</Button>
							</Space>
						)}
						{orderStatus === 4 && order?.Order === null && (
							<Space>
								<Button
									type="text"
									className="bg-primary text-white"
									onClick={handleCheckout}
								>
									Thanh Toán
								</Button>
								<Button danger className="" onClick={handleCancelOrder}>
									Hủy Đơn
								</Button>
							</Space>
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
				title="Hủy đơn thiết kế"
				visible={isCancelModalVisible}
				onCancel={() => setIsCancelModalVisible(false)}
				footer={null}
			>
				<Form onFinish={submitCancelOrder}>
					<Button type="primary" htmlType="submit" block>
						Xác Nhận Hủy
					</Button>
				</Form>
			</Modal>
		</>
	);
};
