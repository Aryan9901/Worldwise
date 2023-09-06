import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return {
				...state,
				isLoading: true,
			};
		case "cities/loaded":
			return {
				...state,
				isLoading: false,
				cities: action.payload,
			};
		case "city/loaded":
			return {
				...state,
				isLoading: false,
				currentCity: action.payload,
			};
		case "city/created":
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};
		case "city/deleted":
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter((city) => city.id !== action.payload),
				currentCity: {},
			};
		case "rejected":
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			throw new Error("Unknown action types!");
	}
}

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);

	useEffect(function () {
		async function fetchCities() {
			dispatch({ type: "loading" });
			try {
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				dispatch({ type: "cities/loaded", payload: data });
			} catch {
				dispatch({ type: "rejected", payLoad: "There was an error loading cities..." });
			}
		}

		fetchCities();
	}, []);

	async function getCity(id) {
		if (Number(id) === currentCity.id) return;
		dispatch({ type: "loading" });
		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			dispatch({ type: "city/loaded", payload: data });
		} catch {
			dispatch({ type: "rejected", payload: "There was an error loading city..." });
		}
	}
	async function createCity(newCity) {
		dispatch({ type: "loading" });
		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			dispatch({ type: "city/created", payload: data });
		} catch {
			dispatch({ type: "rejected", payLoad: "There was an error creating the city" });
		} finally {
			toast.success("🦄 Wow Cities Added Success!", {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: "colored",
			});
		}
	}
	async function deleteCity(id) {
		dispatch({ type: "loading" });
		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});
			dispatch({ type: "city/deleted", payload: id });
			toast.success("Cities Deleted Successfully!", {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: "colored",
			});
		} catch {
			toast.error("there was an error in deleting city!", {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: "colored",
			});
			dispatch({ type: "rejected", payLoad: "There was an error deleting city" });
		}
	}
	const flagemojiToPNG = (flag) => {
		return <img src={`https://flagcdn.com/24x18/${flag}.png`} alt={flag} />;
	};

	return (
		<>
			<CitiesContext.Provider
				value={{
					cities,
					isLoading,
					currentCity,
					getCity,
					flagemojiToPNG,
					createCity,
					deleteCity,
					error,
				}}
			>
				{children}
			</CitiesContext.Provider>
		</>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined) throw new Error("CitiesContext was used out of Scope of the CitiesProvider❗❗");
	return context;
}

export { CitiesProvider, useCities };
