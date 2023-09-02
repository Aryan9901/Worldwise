import Message from "./Message";
import Spinner from "./Spinner";
import styles from "../cssmodules/CountryList.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
	const { isLoading, cities } = useCities();
	if (isLoading) return <Spinner />;
	if (!cities.length) return <Message message="Add your first city by clicking on the map" />;
	const countries = cities.reduce((arr, city) => {
		if (!arr.map((el) => el.country).includes(city.country)) return [...arr, { country: city.country, emoji: city.emoji }];
		else return arr;
	}, []);
	return (
		<>
			<ul className={styles.countryList}>
				{countries.map((country) => (
					<CountryItem country={country} key={country.country} />
				))}
			</ul>
		</>
	);
}

export default CountryList;
