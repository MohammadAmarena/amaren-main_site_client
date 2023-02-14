import { useContext } from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss'
import { PageLogin } from './pages/PageLogin';
import { PageLogout } from './pages/PageLogout';
import { PageHome } from './pages/PageHome';
import { AppContext } from './AppContext';

function App() {
	const { adminIsLoggedIn } = useContext(AppContext);
	return (
		<div className="App">
			<h1>Page will arrive soon</h1>
			<nav>
				<NavLink to="/">Home</NavLink>
				{adminIsLoggedIn ? (
					<NavLink to="/logout">Logout</NavLink>
				) : (
					<NavLink to="/login">Login</NavLink>
				)}
			</nav>

			<Routes>
				<Route path="/" element={<PageHome />} />
				{adminIsLoggedIn ? (
					<Route path="/logout" element={<PageLogout />} />
				) : (
					<Route path="/login" element={<PageLogin />} />
				)}
				<Route path="/" element={<Navigate to="/" replace />} />
			</Routes>
		</div>
	);
}

export default App
