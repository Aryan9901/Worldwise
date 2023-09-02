import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	useEffect(function () {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				setCities(data);
			} catch {
				throw new Error("There was an error loading data...");
			} finally {
				setIsLoading(false);
			}
		}

		fetchCities();
	}, []);

	async function getCity(id) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			setCurrentCity(data);
		} catch {
			throw new Error("There was an error loading data...");
		} finally {
			setIsLoading(false);
		}
	}
	async function createCity(newCity) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			setCities((cities) => [...cities, data]);
		} catch {
			throw new Error("There was an error creating the city");
		} finally {
			setIsLoading(false);
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
		try {
			setIsLoading(true);
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE",
			});
			setCities((cities) => cities.filter((city) => city.id !== id));
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
			throw new Error("There was an error deleting city");
		} finally {
			setIsLoading(false);
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
					setCurrentCity,
					setCities,
					setIsLoading,
					getCity,
					flagemojiToPNG,
					createCity,
					deleteCity,
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
