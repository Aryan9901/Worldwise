import { useEffect } from "react";
import { useAuth } from "../contexts";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(
		function () {
			if (!isAuthenticated) navigate("/");
		},
		[isAuthenticated, navigate]
	);

	return <>{isAuthenticated ? children : null}</>;
}
export default ProtectedRoutes;
