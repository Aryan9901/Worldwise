import styles from "../cssmodules/CountryItem.module.css";

const flagemojiToPNG = (flag) => {
	return <img src={`https://flagcdn.com/24x18/${flag}.png`} alt={flag} />;
};

function CountryItem({ country }) {
	return (
		<li className={styles.countryItem}>
			<span>{flagemojiToPNG(country.emoji.toLowerCase())}</span>
			<span>{country.country}</span>
		</li>
	);
}

export default CountryItem;
