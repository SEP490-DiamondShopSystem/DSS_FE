import React, {useState} from 'react';

import {Button, Table, Tag} from 'antd';
import {Helmet} from 'react-helmet';
import NavbarProfile from '../../../components/NavbarProfile';
import {initialData} from '../../../utils/constant';
import {OrderDetailModal} from './OrderDetailModal';

const MyOrderPage = () => {
	const columns = [
		{
			title: () => <div className="text-center">Order Id</div>,
			dataIndex: 'orderId',
		},
		{
			title: () => <div className="text-center">Order Time</div>,
			dataIndex: 'orderTime',
		},
		{
			title: () => <div className="text-center">Product</div>,
			dataIndex: 'product',
		},
		{
			title: () => <div className="text-center">Price</div>,
			dataIndex: 'price',
		},
		{
			title: () => <div className="text-center">Status</div>,
			dataIndex: 'status',
			render: (status) => {
				let color = 'red';
				if (status === 'Completed') {
					color = 'green';
				} else if (status === 'Pending') {
					color = 'warning';
				} else if (status === 'Processing') {
					color = 'processing';
				}
				return (
					<div className="text-center">
						<Tag className="text-center" color={color}>
							{status.toUpperCase()}
						</Tag>
					</div>
				);
			},
		},
		{
			title: () => <div className="text-center">Action</div>,
			dataIndex: 'action',
			render: (_, record) =>
				dataSource.length >= 1 ? (
					<>
						<Button
							type="text"
							className="p-2 border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 mr-2"
							onClick={toggleDetailModal}
						>
							Detail
						</Button>

						{/* <Popconfirm
						title="Sure to delete?"
						onConfirm={() => handleDelete(record.id)}
					> */}
						<Button
							type="text"
							className="p-2 bg-primary border rounded-lg  transition-colors duration-300"
						>
							Invoice
						</Button>
						{/* </Popconfirm> */}
					</>
				) : null,
		},
	];
	const [dataSource, setDataSource] = useState(initialData);
	const [openDetail, setOpenDetail] = useState(false);

	const toggleDetailModal = () => {
		setOpenDetail(!openDetail);
	};

	return (
		<div>
			<Helmet>
				<title>My Order</title>
			</Helmet>
			<div className="my-20 min-h-96 flex z-50">
				<div className="mr-20">
					<NavbarProfile />
				</div>
				<div className="font-semibold w-full px-20 py-10 bg-white rounded-lg">
					<Table
						dataSource={dataSource}
						columns={columns}
						pagination={{pageSize: 5}}
						className="custom-table-header"
						rowKey="id"
					/>
				</div>
			</div>
			<OrderDetailModal toggleDetailModal={toggleDetailModal} openDetail={openDetail} />
		</div>
	);
};

export default MyOrderPage;
