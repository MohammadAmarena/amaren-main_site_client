import { Key, useContext } from "react";
import { AppContext } from "../AppContext";

export const PageHome = () => {
	const { data } = useContext(AppContext)
	return (
		<div className="page pageHome">
			{
				data.map((ele: any, i: Key) => ele.routes.map((e: any, i: Key) => {
					return (
						<div className="routes" key={i}>
							<h2 className="portfolio">Take a look at my <a href={e.portfolio}>//Portfolio</a></h2>
						</div>
					)
				}))
			}
		</div>
	);
};