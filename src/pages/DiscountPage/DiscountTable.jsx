import React from 'react';
import {Image, Table, Tag} from 'antd';

const DiscountTable = ({discounts}) => {
	const statusMapping = {
		1: {label: 'Đã Lên Lịch', color: 'blue'},
		2: {label: 'Đang Hoạt Động', color: 'green'},
		3: {label: 'Đã Tạm Dừng', color: 'orange'},
		4: {label: 'Hết Hạn', color: 'red'},
		5: {label: 'Đã Hủy', color: 'gray'},
	};

	const columns = [
		{
			title: 'Hình ảnh',
			dataIndex: 'Thumbnail',
			key: 'Thumbnail',
			render: (url) => (
				<Image
					width={400}
					src={url?.MediaPath}
					alt=""
					fallback="https://via.placeholder.com/50" // Placeholder khi không có ảnh
				/>
			),
		},
		{
			title: 'Tên khuyến mãi',
			dataIndex: 'Name',
			key: 'Name',
		},
		{
			title: 'Mã giảm giá',
			dataIndex: 'DiscountCode',
			key: 'DiscountCode',
		},
		{
			title: 'Phần trăm giảm',
			dataIndex: 'DiscountPercent',
			key: 'DiscountPercent',
			render: (percent) => <strong>{percent}%</strong>,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'Status',
			key: 'Status',
			render: (status) => {
				const {label, color} = statusMapping[status] || {};
				return <Tag color={color || 'default'}>{label || 'Không xác định'}</Tag>;
			},
		},

		{
			title: 'Yêu cầu khuyến mãi',
			key: 'requirements',
			render: (_, record) => (
				<ul>
					{record.DiscountReq.map((req) => (
						<li key={req.Id}>
							{req.Name} (Carat: {req.DiamondRequirementSpec.CaratFrom} -{' '}
							{req.DiamondRequirementSpec.CaratTo})
						</li>
					))}
				</ul>
			),
		},
	];

	return (
		<Table columns={columns} dataSource={discounts} rowKey="Id" pagination={{pageSize: 5}} />
	);
};

export default DiscountTable;
