import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
	user: null,
	isAuthenticated: false,
};
function reducer(state, action) {
	switch (action.type) {
		case "login":
			return { ...state, user: action.payload, isAuthenticated: true };
		case "logout":
			return {
				...state,
				user: null,
				isAuthenticated: false,
			};
		default:
			throw new Error("Unknown action types!");
	}
}

const FAKE_USER = {
	name: "Aryan",
	email: "911aaryan@gmail.com",
	password: "qwerty",
	avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({ type: "login", payload: FAKE_USER });
		} else alert("user not found 😠");
	}
	function logout() {
		dispatch({ type: "logout" });
	}

	return (
		<AuthContext.Provider
			value={{
				login,
				user,
				logout,
				isAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) throw new Error("Authcontext was used outside of the AuthProvider!!");
	return context;
}

export { AuthProvider, useAuth };
