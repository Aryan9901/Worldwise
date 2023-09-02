import PageNav from "../components/PageNav";
import styles from "../cssmodules/Login.module.css";
import { useState } from "react";

export default function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<main className={styles.login}>
			<PageNav />
			<form className={styles.form}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input placeholder="jack@example.com" type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input placeholder="qwerty" type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
				</div>

				<div>
					<button>Login</button>
				</div>
			</form>
		</main>
	);
}
