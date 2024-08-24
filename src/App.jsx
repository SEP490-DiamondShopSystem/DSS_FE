import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import './App.css';
import {AppRouters} from './routes/AppRoutes';

function App() {
	return (
		<section className="font-[body]">
			<BrowserRouter>
				<AppRouters />
				{/* <AdminRouters /> */}
				<ToastContainer limit={3} />
			</BrowserRouter>
		</section>
	);
}

export default App;
