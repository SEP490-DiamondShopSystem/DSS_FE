import React, {useEffect, useState} from 'react';

import {Steps} from 'antd';
import {ImageGallery} from './Left/ImageGallery';
import {InformationLeft} from './Left/InformationLeft';
import {InformationRight} from './Right/InformationRight';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getJewelryDetail} from '../../redux/slices/jewelrySlice';
import {GetJewelryDetailSelector} from '../../redux/selectors';
import {data} from '../../utils/constant';

const JewelryDetailPage = () => {
	const {id} = useParams();
	const dispatch = useDispatch();

	const jewelryDetail = useSelector(GetJewelryDetailSelector);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [diamondJewelry, setDiamondJewelry] = useState(data);
	const [size, setSize] = useState('');
	const [jewelry, setJewelry] = useState();
	const [selectedMetal, setSelectedMetal] = useState(diamondJewelry.Metal.Name);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	useEffect(() => {
		dispatch(getJewelryDetail({id}));
	}, []);

	useEffect(() => {
		if (jewelryDetail) setJewelry(jewelryDetail);
	}, [jewelryDetail]);

	console.log('jewelry', jewelry);

	return (
		<div className="mx-32">
			<div className="flex flex-col md:flex-row mx-6 md:mx-32 bg-white my-10 md:my-20 rounded-lg shadow-lg">
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
					/>
				</div>
			</div>
		</div>
	);
};

export default JewelryDetailPage;
