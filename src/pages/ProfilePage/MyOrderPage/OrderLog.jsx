import {Button, Image, Modal, Timeline, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GetOrderChildLogsSelector} from '../../../redux/selectors';
import {getProcessingDetail} from '../../../redux/slices/logSlice';

const {Title} = Typography;

export const OrderLog = ({orderLogs}) => {
	const dispatch = useDispatch();
	const orderChildLogList = useSelector(GetOrderChildLogsSelector);

	const [childLogs, setChildLogs] = useState();
	const [logs, setLogs] = useState();
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		if (logs?.OrderId && logs?.Id) {
			dispatch(getProcessingDetail({orderId: logs.OrderId, logId: logs.Id}));
		}
	}, [logs?.OrderId, logs?.Id, dispatch]);

	useEffect(() => {
		if (orderChildLogList) {
			setChildLogs(orderChildLogList);
		}
	}, [orderChildLogList]);

	const handleViewDetails = (log) => {
		setLogs(log);
		setModalVisible(true);
	};

	const handleCloseModal = () => {
		setModalVisible(false);
	};

	return (
		<div>
			<Title level={3} className="">
				Trạng Thái Đơn Hàng
			</Title>
			<Timeline className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-7">
				{orderLogs
					?.slice()
					?.reverse()
					?.map((log) => (
						<Timeline.Item
							key={log.Id}
							color={
								log?.Status === 4 || log?.Status === 3 || log?.Status === 7
									? 'red'
									: 'blue'
							}
						>
							<div>
								<p>{log.Message}</p>
								<p>{log.CreatedDate}</p>
								{log?.Status === 2 || log?.Status === 6 ? (
									<Button
										type="link"
										className="text-primary"
										onClick={() => handleViewDetails(log)}
									>
										Xem Chi Tiết
									</Button>
								) : null}
							</div>
						</Timeline.Item>
					))}
			</Timeline>
			<Modal
				title="Chi tiết trạng thái"
				visible={modalVisible}
				onCancel={handleCloseModal}
				footer={null}
			>
				<Timeline mode="left">
					{Array.isArray(childLogs?.ChildLogs) && childLogs?.ChildLogs.length > 0 ? (
						childLogs.ChildLogs.map((log) => (
							<Timeline.Item key={log?.Id}>
								<div className="font-semibold">{log?.CreatedDate}</div>
								<div>{log?.Message}</div>
								{log?.LogImages?.map((image, index) => (
									<Image
										key={index}
										src={image?.MediaPath}
										height={50}
										width={50}
										style={{marginRight: 10, marginTop: 5}}
									/>
								))}
							</Timeline.Item>
						))
					) : (
						<Timeline.Item>
							<div>Chưa có thông báo trạng thái đơn hàng</div>
						</Timeline.Item>
					)}
				</Timeline>
			</Modal>
		</div>
	);
};
