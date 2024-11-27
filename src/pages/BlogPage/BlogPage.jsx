import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {GetAllBlogSelector} from '../../redux/selectors';
import {getAllBlog} from '../../redux/slices/blogSlice';
import {Button, Card, Typography} from 'antd';
import {ArrowRightOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';

const {Title} = Typography;

const BlogPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const blogList = useSelector(GetAllBlogSelector);

	const [blogs, setBlogs] = useState();
	const [visibleCount, setVisibleCount] = useState(3);

	useEffect(() => {
		dispatch(getAllBlog());
	}, []);

	useEffect(() => {
		if (blogList) {
			setBlogs(blogList?.Values);
		}
	}, [blogList]);

	const handleShowMore = () => {
		setVisibleCount((prevCount) => prevCount + 3);
	};

	const handleView = (id) => {
		navigate(`/blog/${id}`);
	};

	return (
		<div className="">
			<div className=" p-4">
				<Title level={3} className="text-center mt-5">
					Bài Viết
				</Title>
				<div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-tintWhite p-5">
					{Array.isArray(blogs) &&
						blogs.slice(0, visibleCount).map((item, index) => (
							<Card
								key={index}
								hoverable
								cover={
									<img
										alt="example"
										src={
											item?.Thumbnail?.MediaPath ||
											'https://via.placeholder.com/200x20'
										}
									/>
								}
								className="rounded-lg shadow-md"
							>
								<Card.Meta title={item.Title} />
								<Button
									type="primary"
									className="mt-4 bg-purple-500 text-white hover:bg-purple-700"
									icon={<ArrowRightOutlined />}
									onClick={() => handleView(item?.Id)}
								>
									Đọc tiếp
								</Button>
							</Card>
						))}
				</div>
				<div className="flex justify-center mt-6">
					{Array.isArray(blogs) && visibleCount < blogs.length && (
						<Button
							type="primary"
							className="bg-purple-500 text-white hover:bg-purple-700 px-8"
							icon={<ArrowRightOutlined />}
							onClick={handleShowMore}
						>
							Xem thêm
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default BlogPage;
