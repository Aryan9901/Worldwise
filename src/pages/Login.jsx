import { useEffect } from "react";
import PageNav from "../components/PageNav";
import styles from "../cssmodules/Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts";
import Button from "../components/Button";

export default function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { login, isAuthenticated } = useAuth();

	function handleSubmit(e) {
		e.preventDefault();
		if (email && password) {
			login(email, password);
		}
	}

	useEffect(
		function () {
			if (isAuthenticated) navigate("/app", { replace: true });
		},
		[isAuthenticated, navigate]
	);
	return (
		<main className={styles.login}>
			<PageNav />
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input placeholder="911aaryan@gmail.com" type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input placeholder="qwerty" type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
				</div>

				<div>
					<Button type="primary">Login</Button>
				</div>
			</form>
		</main>
	);
}
