import styles from "../cssmodules/Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
	return (
		<Link to="/">
			<img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
		</Link>
	);
}

export default Logo;
