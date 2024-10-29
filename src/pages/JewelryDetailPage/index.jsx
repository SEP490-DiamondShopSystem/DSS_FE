import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import LoginModal from '../../components/LogModal/LoginModal';
import {GetJewelryDetailSelector} from '../../redux/selectors';
import {getJewelryDetail} from '../../redux/slices/jewelrySlice';
import {data} from '../../utils/constant';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';

const JewelryDetailPage = () => {
	const {id} = useParams();
	const dispatch = useDispatch();

	const jewelryDetail = useSelector(GetJewelryDetailSelector);
	const storedUser = localStorage.getItem('user');
	const user = JSON.parse(storedUser);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [diamondJewelry, setDiamondJewelry] = useState(data);
	const [size, setSize] = useState('');
	const [jewelry, setJewelry] = useState();
	const [selectedMetal, setSelectedMetal] = useState(diamondJewelry.Metal.Name);
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

	useEffect(() => {
		dispatch(getJewelryDetail({id}));
	}, []);

	useEffect(() => {
		if (jewelryDetail) setJewelry(jewelryDetail);
	}, [jewelryDetail]);

	const hideLoginModal = () => setIsLoginModalVisible(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="mx-32">
			<div className="flex flex-col md:flex-row bg-white my-10 md:my-20 rounded-lg shadow-lg">
				<div className="w-full md:w-1/2 p-6">
					<ImageGallery />
					<InformationLeft diamondJewelry={jewelry} />
				</div>

				<div className="w-full md:w-1/2 p-6 md:pr-32">
					<InformationRight
						diamondJewelry={jewelry}
						setSelectedMetal={setSelectedMetal}
						selectedMetal={selectedMetal}
						setSize={setSize}
						size={size}
						setIsLoginModalVisible={setIsLoginModalVisible}
						user={user}
					/>
				</div>
			</div>
			<LoginModal isOpen={isLoginModalVisible} onClose={hideLoginModal} />
		</div>
	);
};

export default JewelryDetailPage;
