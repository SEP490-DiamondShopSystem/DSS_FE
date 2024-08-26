import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import './App.css';
import {AppRouters} from './routes/AppRoutes';
import {Header} from './components/Navbar/Header';
import {Footer} from './components/Footer';

function App() {
	return (
		<section className="font-[body]">
			<BrowserRouter>
				<Header />
				<AppRouters />
				<ToastContainer limit={3} />
				<Footer />
			</BrowserRouter>
		</section>
	);
}

export default App;
