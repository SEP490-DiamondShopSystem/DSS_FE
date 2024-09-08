import {Rate} from 'antd';

export const StarRating = ({rating}) => {
	return (
		<>
			<Rate
				allowHalf
				defaultValue={rating}
				style={{fontSize: 20, color: '#F9A825'}}
				disabled
			/>
		</>
	);
};
