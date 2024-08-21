import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import './App.css';
import {AppRouters} from './routes/AppRoutes';

function App() {
	return (
		<BrowserRouter>
			<AppRouters />
			<ToastContainer limit={3} />
		</BrowserRouter>
	);
}

export default App;
