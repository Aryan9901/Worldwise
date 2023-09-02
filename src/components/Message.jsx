import styles from "../cssmodules/Message.module.css";

function Message({ message }) {
	return (
		<p className={styles.message}>
			<span role="img">👋</span> {message}
		</p>
	);
}

export default Message;
