import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { IOriginalEditFields, Routes, blankNewRoute } from './interfaces.js'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
interface IAppContext {
    routes: Routes[];
    loginAsAdmin: (onSuccess: () => void, onFailure: () => void) => void;
	password: string;
	setPassword: (password: string) => void;
	adminIsLoggedIn: boolean;
	logoutAsAdmin: () => void;
	handleDeleteRoute: (route: Routes) => void;
	handleRouteFieldChange: (
		fieldIdCode: string,
		book: Routes,
		value: string
	) => void;
	handleEditRoute: (roure: Routes) => void;
	handleCancelEditRoute: (route: Routes) => void;
	handleSaveEditRoute: (route: Routes) => void;
	isAdding: boolean;
	handleToggleAddRoute: () => void;
	newRoute: IOriginalEditFields;
	handleAddRouteFieldChange: (
		fieldIdCode: string,
		route: IOriginalEditFields,
		value: string
	) => void;
	handleSaveNewRoute: () => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
    const [routes, setRoutes] = useState<Routes[]>([])
    const [password, setPassword] = useState('');
	const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [newRoute, setNewRoute] = useState<IOriginalEditFields>(blankNewRoute);
	
	const loadRoutes = () => {
			(async () => {
				let _routes: Routes[] = [];
				const response = await axios.get(`${BACKEND_URL}/routes`);
				let rawRoute: Routes[] = response.data;
				rawRoute.forEach((rawRoute: any) => {
					const _route: Routes = {
						isBeingEdited: false,
						...rawRoute,
						originalEditFields: {
							name: rawRoute.name,
							source: rawRoute.source,
						},
					};
					_routes.push(_route);
				});
				setRoutes(_routes);
			})();
	}
		
    useEffect(() => {
		(async () => {
			try {
				const user = (
					await axios.get(`${BACKEND_URL}/get-current-user`, {
						withCredentials: true,
					})
				).data;
				if (user === 'admin') {
					setAdminIsLoggedIn(true);
				}
			} catch (e: any) {
				console.log('GENERAL ERROR');
			}
		})();
	}, []);

	useEffect(() => {
		loadRoutes();
	}, []);

	const handleToggleAddRoute = () => {
		setNewRoute({ ...blankNewRoute });
		setIsAdding(!isAdding);
	};

	const handleAddRouteFieldChange = (
		fieldIdCode: string,
		newRoute: IOriginalEditFields,
		value: string
	) => {
		newRoute[fieldIdCode as keyof IOriginalEditFields] = value;
		setNewRoute({ ...newRoute });
	};

	const handleSaveNewRoute = async () => {
		try {
			// save in backend
			await axios.post(
				`${BACKEND_URL}/routes`,
				{
					name: newRoute.name,
					source: newRoute.source,
				},
				{
					withCredentials: true,
				}
			);
			// if it saved in backend, then update on frontend
			loadRoutes();
			setIsAdding(false);
			setNewRoute({ ...blankNewRoute });
		} catch (e: any) {
			console.log('GENERAL ERROR');
		}
	};
	
    const handleCancelEditRoute = (route: Routes) => {
		route.isBeingEdited = false;
		//reset any values that were changed
		route.originalEditFields = {
			name: route.name,
			source: route.source
		}
		setRoutes([...routes]);
	};

    const resetAllRoutes = () => {
		for (const route of routes) {
			route.isBeingEdited = false;
		}
		setRoutes([...routes]);
	};

    const loginAsAdmin = async (
		onSuccess: () => void,
		onFailure: () => void
	) => {
		try {
			await axios.post(
				`${BACKEND_URL}/login`,
				{
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);
			setAdminIsLoggedIn(true);
			resetAllRoutes();
			onSuccess();
		} catch (e: any) {
			switch (e.code) {
				case 'ERR_BAD_REQUEST':
					onFailure();
					break;
				default:
					break;
			}
			setAdminIsLoggedIn(false);
		}
		setPassword('');
	};

    const handleSaveEditRoute = async (route: Routes) => {
		try {
			// save in backend
			await axios.put(
				`${BACKEND_URL}/routes/${route._id}`,
				{
					name: route.name,
					source: route.source,
				},
				{
					withCredentials: true,
				}
			);
			// if it saved in backend, then update in frontend
			route.name = route.originalEditFields.name;
			route.source = route.originalEditFields.source;
			setRoutes([...routes]);
			route.isBeingEdited = false;
		} catch (e: any) {
			switch (e.code) {
				case 'ERR_BAD_REQUEST':
					console.log('BAD REQUEST');
					break;
				default:
					console.log('GENERAL ERROR');
					break;
			}
			setAdminIsLoggedIn(false);
		}
	};

    const handleRouteFieldChange = (
        fieldIdCode: string,
		route: Routes,
		value: string
	) => {
		route.originalEditFields[fieldIdCode as keyof IOriginalEditFields] =
			value;
		setRoutes([...routes]);
	};

    const handleDeleteRoute = async (route: Routes) => {
		try {
			await axios.delete(`${BACKEND_URL}/routes/${route._id}`, {
				withCredentials: true,
			});
			const _routes = routes.filter((m: Routes) => m._id !== route._id);
			setRoutes(_routes);
		} catch (e: any) {
			switch (e.code) {
				case 'ERR_BAD_REQUEST':
					console.log('BAD REQUREST');
					break;
				default:
					console.log('GENERAL ERROR');
					break;
			}
			setAdminIsLoggedIn(false);
		}
	};

    const handleEditRoute = (route: Routes) => {
		route.isBeingEdited = true;
		setRoutes([...routes]);
	};

    const logoutAsAdmin = () => {
		(async () => {
			try {
				resetAllRoutes();
				setAdminIsLoggedIn(false);
				await axios.get(`${BACKEND_URL}/logout`, {
					withCredentials: true,
				});
			} catch (e: any) {
				console.log('GENERAL ERROR');
			}
		})();
	};
    
    return (
        <AppContext.Provider value={{
                routes,
                loginAsAdmin,
                password,
                setPassword,
                adminIsLoggedIn,
                logoutAsAdmin,
                handleDeleteRoute,
                handleRouteFieldChange,
                handleEditRoute,
                handleCancelEditRoute,
                handleSaveEditRoute,
				isAdding,
				handleToggleAddRoute,
				newRoute,
				handleAddRouteFieldChange,
				handleSaveNewRoute,
            }}>
            {children}
        </AppContext.Provider>
    )
}