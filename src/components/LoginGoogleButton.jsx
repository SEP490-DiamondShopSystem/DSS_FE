import React from 'react';

import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {GoogleLogin} from '@react-oauth/google';

export const GoogleLoginButton = ({onSuccess, onError}) => {
	return (
		<GoogleLogin
			onSuccess={onSuccess}
			onError={onError}
			render={(renderProps) => (
				<button
					onClick={renderProps.onClick}
					disabled={renderProps.disabled}
					className="flex items-center p-2 bg-white border rounded shadow-md hover:bg-gray-100"
				>
					<FontAwesomeIcon icon={faGoogle} className="mr-2 text-blue-600" />
				</button>
			)}
		/>
	);
};
