import { Link } from "react-router-dom";
import styles from "../cssmodules/Homepage.module.css";
import PageNav from "../components/PageNav";
export default function Homepage() {
	return (
		<main className={styles.homepage}>
			<PageNav />
			<section>
				<h1>WORLDWISE</h1>
				<h2>
					You travel the world.
					{/* <br /> */}
					WorldWise keeps track of your adventures.
				</h2>
				<h3>
					A world map that tracks your footsteps into every city you can think of. Never forget your wonderful experiences, and show your
					friends how you have wandered the world.
				</h3>
				<Link to="/login" className="cta">
					Start Tracking Now
				</Link>
			</section>
		</main>
	);
}
