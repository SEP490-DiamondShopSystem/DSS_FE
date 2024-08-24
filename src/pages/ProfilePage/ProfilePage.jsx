import {Button} from 'antd';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Header} from '../../components/Navbar/Header';
import NavbarProfile from '../../components/NavbarProfile';
import {removeLocalStorage} from '../../utils/localstorage';
import LogoutModal from '../LogModal/LogoutModal';

const ProfilePage = () => {
	const navigate = useNavigate();
	const orderStatus = [
		{icon: '', name: 'Total Order', order: 1},
		{icon: '', name: 'Pending Order', order: 3},
		{icon: '', name: 'Processing Order', order: 4},
		{icon: '', name: 'Complete Order', order: 0},
	];

	const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

	const showLogoutModal = () => setIsLogoutModalVisible(true);
	const hideLogoutModal = () => setIsLogoutModalVisible(false);

	const handleLogout = () => {
		removeLocalStorage('user');
		hideLogoutModal();

		navigate('/');
	};

	return (
		<div>
			<Header />
			<div className="my-20 min-h-96 flex">
				<div className="mr-20">
					<NavbarProfile />
				</div>

				<div className="font-semibold w-full px-20 py-10 bg-white">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl ">Welcome Mr.Customer</h1>
						<Button className="bg-primary" onClick={showLogoutModal}>
							Logout
						</Button>
					</div>
					<div className="flex items-center font-medium justify-around mt-10">
						{orderStatus.map((status) => (
							<div className="flex items-center justify-around shadow-xl py-3 px-12 bg-white rounded-lg">
								<div className="">
									<img src={status.icon} alt="" className="w-14 h-14 mr-5" />
								</div>
								<div>{status.name}</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<LogoutModal
				visible={isLogoutModalVisible}
				onConfirm={handleLogout}
				onCancel={hideLogoutModal}
			/>
		</div>
	);
};

export default ProfilePage;
