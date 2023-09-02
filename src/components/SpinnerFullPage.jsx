import Spinner from "./Spinner";
import styles from "../cssmodules/SpinnerFullPage.module.css";

function SpinnerFullPage() {
	return (
		<div className={styles.spinnerFullpage}>
			<Spinner />
		</div>
	);
}

export default SpinnerFullPage;
