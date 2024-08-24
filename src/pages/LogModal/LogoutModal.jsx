import React from 'react';
import {Button, Modal} from 'antd';

const LogoutModal = ({visible, onConfirm, onCancel}) => {
	return (
		<Modal
			title="Confirm Logout"
			visible={visible}
			onCancel={onCancel}
			footer={[
				<Button key="back" onClick={onCancel}>
					Cancel
				</Button>,
				<Button key="submit" type="primary" onClick={onConfirm}>
					Logout
				</Button>,
			]}
		>
			Are you sure you want to log out?
		</Modal>
	);
};

export default LogoutModal;
