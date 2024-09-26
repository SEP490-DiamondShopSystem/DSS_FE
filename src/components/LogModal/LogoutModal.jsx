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
				<Button
					key="submit"
					type="text"
					className="bg-primary text-white hover:bg-primary"
					onClick={onConfirm}
				>
					Đăng xuất
				</Button>,
			]}
		>
			Bạn có chắc chắn muốn đăng xuất không?
		</Modal>
	);
};

export default LogoutModal;
