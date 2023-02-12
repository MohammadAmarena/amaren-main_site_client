import { Key, useContext } from "react";
import { Helmet } from 'react-helmet';
import { AppContext } from "../AppContext";

export const PageHome = () => {
	const { routes } = useContext(AppContext)
	
	return (
		<div className="page pageHome">
			<Helmet>
				<title>Home Page</title>
			</Helmet>
			{
				routes.map((ele: any, i: Key) => {
					return (
						<div className="routes" key={i}>
							<h2 className="portfolio">Take a look at my <a href={ele.source}>//_{ele.name}</a></h2>
						</div>
					)
				})
			}
		</div>
	);
};