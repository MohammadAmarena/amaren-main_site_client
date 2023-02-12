import { Helmet } from "react-helmet";

export const PageLogout = () => {
	return (
		<div className="page pageLogout">
			<Helmet>
				<title>Logout Page</title>
			</Helmet>
			<h2>This is the Logout page.</h2>
		</div>
	);
};