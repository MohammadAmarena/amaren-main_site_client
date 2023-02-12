import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Routes } from './interfaces.js'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log(BACKEND_URL);

interface IAppContext {
    routes: Routes[]
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
    const [routes, setRoutes] = useState<Routes[]>([])

    useEffect(() => {
		(async () => {
			setRoutes((await axios.get(`${BACKEND_URL}/routes`)).data);
		})();
	}, []);
    
    return (
        <AppContext.Provider value={{routes}}>
            {children}
        </AppContext.Provider>
    )
}