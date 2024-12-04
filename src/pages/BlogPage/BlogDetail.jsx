import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBlogDetail} from '../../redux/slices/blogSlice';
import {useParams} from 'react-router-dom';
import {GetBlogDetailSelector} from '../../redux/selectors';
import {Typography, Image, Card, Tag, Skeleton, Divider} from 'antd';
import {CalendarOutlined, TagsOutlined} from '@ant-design/icons';
import DOMPurify from 'dompurify';
import 'quill/dist/quill.snow.css';

const {Title, Paragraph, Text} = Typography;

const BlogDetail = () => {
	const {id} = useParams();
	const dispatch = useDispatch();
	const blogDetail = useSelector(GetBlogDetailSelector);

	const [blogs, setBlogs] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBlogDetail = async () => {
			try {
				setLoading(true);
				await dispatch(getBlogDetail(id));
			} catch (error) {
				console.error('Error fetching blog details:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchBlogDetail();
	}, [id, dispatch]);

	useEffect(() => {
		if (blogDetail) {
			setBlogs(blogDetail);
		}
	}, [blogDetail]);

	const sanitizeContent = (content) => {
		return DOMPurify.sanitize(content, {
			ALLOWED_TAGS: [
				'p',
				'strong',
				'em',
				'u',
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
				'ul',
				'ol',
				'li',
				'a',
				'img',
				'blockquote',
				'code',
			],
			ALLOWED_ATTR: ['href', 'src', 'alt', 'class'],
		});
	};

	if (loading) {
		return (
			<div className="p-4 max-w-4xl mx-auto">
				<Skeleton active paragraph={{rows: 4}} />
			</div>
		);
	}

	if (!blogs) {
		return (
			<div className="p-4 max-w-4xl mx-auto text-center">
				<Text type="secondary">No blog details found</Text>
			</div>
		);
	}

	return (
		<Card
			className="max-w-4xl mx-auto my-6 shadow-lg rounded-xl"
			cover={
				blogs?.Thumbnail?.MediaPath && (
					<Image
						preview={false}
						src={blogs.Thumbnail.MediaPath}
						alt={blogs.Title}
						className="w-auto max-h-40 object-cover rounded-t-xl" // Updated classes
					/>
				)
			}
		>
			<Typography>
				<Title level={2} className="text-center text-gray-800 mb-4 tracking-tight">
					{blogs.Title}
				</Title>

				{blogs?.Content && (
					<div
						className="ql-editor blog-content mb-6 prose max-w-none"
						dangerouslySetInnerHTML={{
							__html: sanitizeContent(blogs.Content),
						}}
					/>
				)}

				<Divider />

				<div className="flex flex-wrap justify-between items-center">
					{blogs?.Tags && (
						<div className="flex flex-wrap items-center gap-2">
							<TagsOutlined className="text-gray-500" />
							{blogs.Tags.map((tag, index) => (
								<Tag key={index} color="processing">
									{tag}
								</Tag>
							))}
						</div>
					)}

					{blogs?.CreatedDate && (
						<div className="flex items-center gap-2 text-gray-600">
							<CalendarOutlined />
							<Text type="secondary">
								{new Date(blogs.CreatedDate).toLocaleDateString('vi-VN')}
							</Text>
						</div>
					)}
				</div>
			</Typography>
		</Card>
	);
};

export default BlogDetail;
