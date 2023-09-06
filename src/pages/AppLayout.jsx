// import React from "react";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from "../cssmodules/AppLayout.module.css";

const AppLayout = () => {
	return (
		<div className={styles.app}>
			<Sidebar />
			<Map />
			<User />
		</div>
	);
};

export default AppLayout;
