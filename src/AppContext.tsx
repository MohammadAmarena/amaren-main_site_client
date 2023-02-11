import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log(BACKEND_URL);

interface IAppContext {
    data: any
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
    const [data, setData] = useState<any>([])

    useEffect(() => {
		(async () => {
			setData((await axios.get(`${BACKEND_URL}/data`)).data);
		})();
	}, []);
    
    console.log(data);
    
    
    return (
        <AppContext.Provider value={{data}}>
            {children}
        </AppContext.Provider>
    )
}