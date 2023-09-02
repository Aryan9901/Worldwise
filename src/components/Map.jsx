import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../cssmodules/Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import Button from "./Button";
import { useUrlPosition, useGeolocation } from "../hooks";

function SetViewOnClick({ animateRef }) {
	const map = useMapEvent("click", (e) => {
		map.setView(e.latlng, map.getZoom(), {
			animate: animateRef?.current || true,
		});
	});

	return null;
}

function Map() {
	const { cities, flagemojiToPNG } = useCities();
	const [mapPosition, setMapPosition] = useState([23.2599, 77.4126]);
	const { isLoading: isLoadingPosition, position: geoLocationPosition, getPosition } = useGeolocation();
	const [mapLat, mapLng] = useUrlPosition();

	useEffect(
		function () {
			if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
		},
		[mapLat, mapLng]
	);
	useEffect(
		function () {
			if (geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
		},
		[geoLocationPosition]
	);
	return (
		<>
			<div className={styles.mapContainer}>
				{!geoLocationPosition && (
					<Button type="position" onClick={getPosition}>
						{isLoadingPosition ? "Loading..." : "your position"}
					</Button>
				)}
				<MapContainer className={styles.map} center={mapPosition} zoom={5} scrollWheelZoom={true}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
					/>
					{cities.map((city) => (
						<Marker position={[city.position.lat, city.position.lng]} key={city.id}>
							<Popup>
								<span>{flagemojiToPNG(city.emoji.toLowerCase())}</span> {city.cityName}
								<p>{city.notes}</p>
							</Popup>
						</Marker>
					))}
					<SetViewOnClick />
					<ChangeCenter position={mapPosition} />
					<DetectClick />
				</MapContainer>
			</div>
		</>
	);
}

function ChangeCenter({ position }) {
	const { currentCity } = useCities();
	const map = useMap();
	map.setView(position, 12);
	return null;
}
function DetectClick() {
	const navigate = useNavigate();
	useMapEvent({
		click: (e) => {
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
}

export default Map;
