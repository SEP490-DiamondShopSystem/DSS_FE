import React, {useState} from 'react';
import {
	Card,
	Rate,
	List,
	Avatar,
	Typography,
	Button,
	Pagination,
	Popover,
	Modal,
	Image,
	Select,
} from 'antd';
import {convertToVietnamDate} from '../../../utils';

const {Text} = Typography;

const ProductReviews = ({reviewLength, reviewList, averageRating, setOrderBy, orderBy}) => {
	const [visibleReviews, setVisibleReviews] = useState(3);
	const [showModal, setShowModal] = useState(false);

	const handlePageChange = (page) => {
		const reviewsPerPage = 3; // Hiển thị 3 review mỗi trang
		setVisibleReviews(reviewsPerPage * page);
	};

	const handleShowAll = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const popoverContent = (
		<div style={{textAlign: 'center'}}>
			<Rate disabled value={averageRating} allowHalf />
			<Text className="font-semibold">{averageRating?.toFixed(1)}/5</Text>
			<Button type="link" onClick={handleShowAll}>
				Xem Tất Cả
			</Button>
		</div>
	);

	return (
		<div>
			<Popover content={popoverContent} title="Phản Hồi Sản Phẩm" trigger="hover">
				<span className="ml-5 underline md:cursor-pointer">{reviewLength} Đánh Giá</span>
			</Popover>

			<Modal
				title="Ý Kiến Khách Hàng"
				visible={showModal}
				onCancel={handleCloseModal}
				footer={null}
				width={600}
			>
				<Select
					value={orderBy}
					onChange={(value) => setOrderBy(value)}
					style={{marginBottom: 16}}
				>
					<Select.Option value={false}>Mới nhất</Select.Option>
					<Select.Option value={true}>Cũ nhất</Select.Option>
				</Select>
				<List
					dataSource={reviewList}
					renderItem={(review) => (
						<List.Item>
							<Card style={{width: '100%'}}>
								<List.Item.Meta
									title={`${review.Account?.FirstName} ${review.Account?.LastName}`}
								/>
								<Rate disabled defaultValue={review.StarRating} allowHalf />

								<div style={{display: 'flex', gap: '8px', marginTop: 16}}>
									{review.Medias?.map((media, index) => (
										<Image
											key={index}
											src={media.MediaPath}
											alt={`Review Media ${index + 1}`}
											width={100}
											style={{borderRadius: 4}}
										/>
									))}
								</div>
								<p className="font-semibold">Đã Đánh Giá: {review?.CreatedDate}</p>

								<p>{review.Content}</p>
							</Card>
						</List.Item>
					)}
				/>

				{/* Phân trang trong Modal */}
				<Pagination
					current={Math.ceil(visibleReviews / 3)} // Tính trang hiện tại
					pageSize={3}
					total={reviewLength}
					onChange={handlePageChange}
					style={{marginTop: 16, textAlign: 'center'}}
				/>
			</Modal>
		</div>
	);
};

export default ProductReviews;
