import {Button, Modal} from 'antd';
import React from 'react';

export const Popup = ({closeModal, isModalVisible}) => {
	return (
		<div>
			<Modal
				title="Đơn hàng đã được thanh toán thành công!"
				visible={isModalVisible}
				onCancel={closeModal}
				footer={[
					<Button key="close" type="primary" onClick={closeModal}>
						Close
					</Button>,
				]}
			>
				<p>Thank you for your purchase with us.</p>
			</Modal>
		</div>
	);
};
