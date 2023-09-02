// import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import React from "react";

import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<>
			<CitiesProvider>
				<BrowserRouter>
					<Routes>
						<Route index element={<HomePage />} />
						<Route path="product" element={<Product />} />
						<Route path="pricing" element={<Pricing />} />
						<Route path="login" element={<Login />} />
						<Route path="app" element={<AppLayout />}>
							<Route index element={<Navigate replace to="cities" />} />
							<Route path="cities" element={<CityList />} />
							<Route path="cities/:id" element={<City />} />
							<Route path="countries" element={<CountryList />} />
							<Route path="form" element={<Form />} />
						</Route>
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
				<ToastContainer
					position="bottom-right"
					autoClose={3000}
					limit={1}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
				/>
			</CitiesProvider>
		</>
	);
}

export default App;
