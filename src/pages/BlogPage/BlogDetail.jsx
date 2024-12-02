import {Image, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBlogDetail} from '../../redux/slices/blogSlice';
import {useParams} from 'react-router-dom';
import {GetBlogDetailSelector} from '../../redux/selectors';
import parse from 'html-react-parser';
const {Title, Paragraph} = Typography;

const BlogDetail = () => {
	const {id} = useParams();
	const dispatch = useDispatch();
	const blogDetail = useSelector(GetBlogDetailSelector);

	const [blogs, setBlogs] = useState();

	useEffect(() => {
		dispatch(getBlogDetail(id));
	}, [id]);

	useEffect(() => {
		if (blogDetail) {
			setBlogs(blogDetail);
		}
	}, [blogDetail]);

	return (
		<div className="p-4 max-w-4xl my-5">
			{blogs?.Title && (
				<Title className="text-center" level={2}>
					{blogs.Title}
				</Title>
			)}

			{blogs?.Thumbnail?.MediaPath && (
				<div className="flex justify-center items-center">
					<Image
						preview={false}
						height={400}
						src={blogs.Thumbnail.MediaPath}
						alt={blogs.Title}
						className="w-full h-auto rounded-lg mb-4"
					/>
				</div>
			)}

			{blogs?.Content && <div className="blog-content my-5">{parse(blogs.Content)}</div>}

			{blogs?.Tags && (
				<div className="mt-4">
					<Title level={4}>Tags:</Title>
					<div className="flex gap-2">
						{blogs.Tags.map((tag, index) => (
							<span
								key={index}
								className="bg-gray-200 text-gray-800 px-2 py-1 rounded"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			)}

			{blogs?.CreatedDate && (
				<div className="mt-4">
					<Paragraph>
						<strong>Ngày tạo: </strong>
						{new Date(blogs.CreatedDate).toLocaleDateString('vi-VN')}
					</Paragraph>
				</div>
			)}
		</div>
	);
};

export default BlogDetail;
