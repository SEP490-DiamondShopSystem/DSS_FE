import React, {useEffect, useState} from 'react';
import './App.css';

import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {Footer} from './components/Footer';
import {Header} from './components/Header/Header';
import {AppRouters} from './routes/AppRoutes';

function App() {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
	const [collapse, setCollapsed] = useState(false);
	// Responsive handling
	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth <= 768;
			setIsMobile(mobile);

			// Auto-collapse sidebar on mobile
			if (mobile) {
				setCollapsed(true);
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		// <section className="font-body">
		<BrowserRouter>
			<Header />
			<div style={isMobile ? {paddingTop: '4rem'} : {padding: '0'}}>
				<AppRouters />

				<ToastContainer limit={3} />
			</div>
			<Footer />
		</BrowserRouter>
		// </section>
	);
}

export default App;
