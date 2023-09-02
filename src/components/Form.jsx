// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "../cssmodules/Form.module.css";
import Button from "./Button";
import Message from "./Message";
// import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";

function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
	const { flagemojiToPNG, cities, createCity, isLoading } = useCities();
	const navigate = useNavigate();
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [lat, lng] = useUrlPosition();
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [emoji, setEmoji] = useState("");
	const [geocodingError, setGeocodingError] = useState("");

	useEffect(
		function () {
			if (!lat && !lng) return;
			async function fetchCityData() {
				try {
					setIsLoadingGeocoding(true);
					setGeocodingError("");
					const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
					const data = await res.json();
					if (!data.countryCode) throw new Error("doesn't seem to be a city. Click somewhere else ❗");
					setCityName(data.city || data.locality || "not found! ⛔ ");
					setCountry(data.countryName);
					setEmoji(data.countryCode);
				} catch (err) {
					setGeocodingError(err.message);
				} finally {
					setIsLoadingGeocoding(false);
				}
			}
			fetchCityData();
		},
		[lat, lng]
	);

	async function handleSubmit(e) {
		e.preventDefault();
		if (!cityName || !date) return;

		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
		};
		let isDuplicatesPresent = false;
		cities.map((city) => {
			if (city.cityName === cityName) isDuplicatesPresent = true;
		});
		console.log(isDuplicatesPresent);
		if (!isDuplicatesPresent) {
			await createCity(newCity);
			navigate("/app");
		} else {
			toast.error("There was an error while creating the city", {
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

	if (isLoadingGeocoding) return <Spinner />;
	if (geocodingError) return <Message message={geocodingError} />;
	if (!lat && !lng) return <Message message="Start by clicking somewhere on the map 😃😃" />;
	return (
		<form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
				<span className={styles.flag}>{flagemojiToPNG(emoji.toLowerCase())}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<DatePicker id="date" onChange={(date) => setDate(date)} selected={date} dateFormat="dd/MM/yyyy" />
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
			</div>
			<div className={styles.buttons}>
				<Button
					type="primary"
					onClick={() => {
						// e.preventDefault();
						// navigate("/app/cities");
						// navigate(-1);
					}}
				>
					Add
				</Button>
				<Button
					type="back"
					onClick={(e) => {
						e.preventDefault();
						navigate("/app/cities");
					}}
				>
					&larr; Back
				</Button>
			</div>
		</form>
	);
}

export default Form;
