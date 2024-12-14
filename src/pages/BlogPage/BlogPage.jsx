import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GetAllBlogSelector} from '../../redux/selectors';
import {getAllBlog} from '../../redux/slices/blogSlice';
import {Button, Card, Carousel, Col, Row, Typography, Tag} from 'antd';
import {ArrowRightOutlined, TagsOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {useMediaQuery} from '@mui/material';

const {Title} = Typography;

const BlogPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const blogList = useSelector(GetAllBlogSelector);
	const [blogs, setBlogs] = useState();
	const [visibleCount, setVisibleCount] = useState(3);

	// Media query to check screen size
	const isMobile = useMediaQuery('(max-width: 768px)'); // Adjust the value based on your screen size

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
		<div style={{padding: '16px'}}>
			<Title level={3} style={{textAlign: 'center', marginTop: '20px'}}>
				Bài Viết
			</Title>

			{/* Carousel for small screens (hidden on larger screens) */}
			{isMobile ? (
				<div className="lg:hidden">
					<Carousel autoplay>
						{Array.isArray(blogs) &&
							blogs.slice(0, visibleCount).map((item, index) => (
								<div key={index}>
									<Card
										hoverable
										cover={
											<img
												alt={item.Title}
												src={
													item?.Thumbnail?.MediaPath ||
													'https://via.placeholder.com/200x200'
												}
												style={{
													height: '160px',
													objectFit: 'cover',
													width: '100%',
													borderRadius: '8px',
												}}
											/>
										}
										style={{
											borderRadius: '8px',
											boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										<Card.Meta
											title={item.Title}
											style={{marginBottom: '16px'}}
										/>
										{item?.Tags && (
											<div className="flex flex-wrap items-center gap-2 ">
												<TagsOutlined className="text-gray-500" />
												{item.Tags.map((tag, index) => (
													<Tag key={index} color="processing">
														{tag}
													</Tag>
												))}
											</div>
										)}
										<Button
											type="primary"
											style={{
												marginTop: '2rem',
												backgroundColor: '#6a4ffc',
												borderColor: '#6a4ffc',
												color: '#fff',
											}}
											icon={<ArrowRightOutlined />}
											onClick={() => handleView(item?.Id)}
										>
											Đọc tiếp
										</Button>
									</Card>
								</div>
							))}
					</Carousel>
				</div>
			) : (
				// Grid view for larger screens (hidden on small screens)
				<Row gutter={[16, 16]} justify="start" style={{marginTop: '20px'}}>
					{Array.isArray(blogs) &&
						blogs.slice(0, visibleCount).map((item, index) => (
							<Col xs={24} sm={12} md={8} key={index}>
								<Card
									hoverable
									cover={
										<img
											alt={item.Title}
											src={
												item?.Thumbnail?.MediaPath ||
												'https://via.placeholder.com/200x200'
											}
											style={{
												height: '160px',
												objectFit: 'cover',
												width: '100%',
												borderRadius: '8px',
											}}
										/>
									}
									style={{
										borderRadius: '8px',
										boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
										display: 'flex',
										flexDirection: 'column',
										height: '100%',
									}}
								>
									<Card.Meta title={item.Title} style={{marginBottom: '16px'}} />
									{item?.Tags && (
										<div className="flex flex-wrap items-center gap-2 mb-3">
											<TagsOutlined className="text-gray-500" />
											{item.Tags.map((tag, index) => (
												<Tag key={index} color="processing">
													{tag}
												</Tag>
											))}
										</div>
									)}
									<Button
										type="primary"
										style={{
											marginTop: '2rem',
											backgroundColor: '#6a4ffc',
											borderColor: '#6a4ffc',
											color: '#fff',
										}}
										icon={<ArrowRightOutlined />}
										onClick={() => handleView(item?.Id)}
									>
										Đọc tiếp
									</Button>
								</Card>
							</Col>
						))}
				</Row>
			)}

			{/* Show More Button */}
			<div style={{textAlign: 'center', marginTop: '24px'}}>
				{Array.isArray(blogs) && visibleCount < blogs.length && (
					<Button
						type="primary"
						style={{
							backgroundColor: '#6a4ffc',
							borderColor: '#6a4ffc',
							color: '#fff',
						}}
						icon={<ArrowRightOutlined />}
						onClick={handleShowMore}
					>
						Xem thêm
					</Button>
				)}
			</div>
		</div>
	);
};

export default BlogPage;
