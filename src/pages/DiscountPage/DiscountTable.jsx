import React from 'react';

import {Table, Tag} from 'antd';

const DiscountTable = ({discounts}) => {
	const columns = [
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
			title: 'Thời gian hiệu lực',
			key: 'time',
			render: (_, record) => (
				<span>
					{record.StartDate} - {record.EndDate}
				</span>
			),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'IsActive',
			key: 'IsActive',
			render: (isActive) => (
				<Tag color={isActive ? 'green' : 'red'}>
					{isActive ? 'Hoạt động' : 'Không hoạt động'}
				</Tag>
			),
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
