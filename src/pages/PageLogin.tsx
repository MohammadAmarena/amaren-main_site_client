import { Helmet } from "react-helmet";

export const PageLogin = () => {
	return (
		<div className="page pageLogin">
			<Helmet>
				<title>Login Page</title>
			</Helmet>
			<h2>This is the Login page.</h2>
		</div>
	);
};