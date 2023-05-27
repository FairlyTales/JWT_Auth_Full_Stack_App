import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// this hook will be needed if we want to add protected routes based on
// user authentication and its role (i.e. admin, user, etc.)
const useAuth = () => {
	return useContext(AuthContext);
}

export default useAuth;
