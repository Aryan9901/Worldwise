import styles from "../cssmodules/City.module.css";

// import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
		weekday: "long",
	}).format(new Date(date));

// const [searchParams, setSearchParams] = useSearchParams();
// 	const lat = searchParams.get("lat");
// 	const lng = searchParams.get("lng");

function City() {
	const { id } = useParams();
	const { getCity, currentCity, flagemojiToPNG, isLoading } = useCities();

	useEffect(
		function () {
			getCity(id);
		},
		[id]
	);
	if (isLoading) return <Spinner />;

	const { cityName, emoji, date, notes } = currentCity;
	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<span>{flagemojiToPNG(emoji?.toLowerCase())}</span> {cityName}
				</h3>
			</div>

			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date || null)}</p>
			</div>

			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}

			<div className={styles.row}>
				<h6>Learn more</h6>
				<a href={`https://en.wikipedia.org/wiki/${cityName}`} target="_blank" rel="noreferrer">
					Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>

			<div>
				<BackButton>Back</BackButton>
			</div>
		</div>
	);
}

export default City;
