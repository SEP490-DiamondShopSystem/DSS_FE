import React from 'react';
import './App.css';

import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {Footer} from './components/Footer';
import {Header} from './components/Header/Header';
import {AppRouters} from './routes/AppRoutes';

function App() {
	return (
		// <section className="font-body">
		<BrowserRouter>
			<Header />
			<AppRouters />
			<ToastContainer limit={3} />
			<Footer />
		</BrowserRouter>
		// </section>
	);
}

export default App;
