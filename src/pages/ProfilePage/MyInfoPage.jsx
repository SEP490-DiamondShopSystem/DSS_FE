import React, {useEffect, useState} from 'react';

import {Helmet} from 'react-helmet';
import NavbarProfile from '../../components/NavbarProfile';
import {Form, Input, Button, message} from 'antd';

const MyInfoPage = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [userInfo, setUserInfo] = useState({
		username: 'John Doe',
		email: 'johndoe@example.com',
		phone: '123456789',
	});

	useEffect(() => {
		// Giả lập lấy thông tin người dùng từ server
		form.setFieldsValue(userInfo);
	}, [form, userInfo]);

	const handleSubmit = (values) => {
		setUserInfo(values);
		console.log('Info: ', values);
	};
	return (
		<div>
			<Helmet>
				<title>Thông Tin Của Tôi</title>
			</Helmet>
			<div className="my-20 min-h-96 flex">
				<div className="mr-20">
					<NavbarProfile />
				</div>
				<div className="font-semibold w-full px-20 py-10 bg-white rounded-lg"></div>
			</div>
		</div>
	);
};

export default MyInfoPage;
