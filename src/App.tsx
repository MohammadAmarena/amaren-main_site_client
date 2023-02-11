import { useContext } from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss'
import { PageLogin } from './pages/PageLogin';
import { PageLogout } from './pages/PageLogout';
import { PageHome } from './pages/PageHome';
import { AppContext } from './AppContext';

function App() {
	return (
		<div className="App">
			<h1>Page will arrive soon</h1>
			<nav>
				<NavLink to="/home">Home</NavLink>
				<NavLink to="/logout">Logout</NavLink>
				<NavLink to="/login">Login</NavLink>
			</nav>

			<Routes>
				<Route path="/home" element={<PageHome />} />
				<Route path="/logout" element={<PageLogout />} />
				<Route path="/login" element={<PageLogin />} />
				<Route path="/" element={<Navigate to="/home" replace />} />
			</Routes>
		</div>
	);
}

export default App
