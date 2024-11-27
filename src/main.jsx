import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App.jsx';
import './index.css';
import {persistor, store} from './redux/store.js';
import {Toast} from './utils/toast.jsx';
import {GoogleOAuthProvider} from '@react-oauth/google';
import locale from 'antd/locale/vi_VN';
import {ConfigProvider} from 'antd';

const NEXT_PUBLIC_GOOGLE_CLIENT_ID =
	'650110277911-jg73184eijpoumv7v5t5prd58056586s.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
	<GoogleOAuthProvider clientId={NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
		<Provider store={store}>
			<ConfigProvider
				locale={locale}
				theme={{
					token: {
						colorPrimary: '#dec986',
					},
					components: {
						Button: {
							colorPrimary: '#dec986',
							colorPrimaryHover: '#ffed99',
						},
						Table: {
							rowHoverBg: '#f3f3f3',
							headerBg: '#dec986',
							opacityLoading: '#dec986',
						},
						Slider: {
							trackBg: '#dec986', // Màu nền của track slider
							trackHoverBg: '#ffed99', // Màu nền khi hover
							dotActiveBorderColor: '#000000', // Màu viền của dot đang active (màu đen)
							dotBorderColor: '#666666', // Màu viền của dot không active (màu xám)
							dotActiveColor: '#FF0000', // Màu của dot khi active (đỏ)
							dotColor: '#00FF00', // Màu của dot khi chưa active (xanh lá cây)
							colorPrimary: '#dec986', // Màu chính
						},

						Steps: {
							colorPrimary: '#dec986',
							colorIcon: '#dec986',
							colorFillAlter: '#dec986',
						},
						Radio: {
							colorPrimary: '#dec986',
						},
					},
				}}
			>
				<PersistGate persistor={persistor}>
					<Toast />
					<App />
				</PersistGate>
			</ConfigProvider>
		</Provider>
	</GoogleOAuthProvider>
);
