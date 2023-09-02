import styles from "../cssmodules/Button.module.css";
function Button({ children, onClick, type }) {
	return (
		<button type="submit" onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
			{children}
		</button>
	);
}

export default Button;
