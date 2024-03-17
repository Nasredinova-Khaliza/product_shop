import { Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import HomePage from "../pages/home/Home";
import LoginPage from "../pages/login/Login";
import Registration from "../pages/register/Registration";
import scss from "./Layout.module.scss";
import Product from "../pages/product/Product";
import Footer from "./footer/Footer";

const Layout = () => {
	return (
		<>
			<div className={scss.Layout}>
				<Header />
				<main>
					<Routes>
						<Route
							path="/"
							element={
								<HomePage
									handleClose={function (): void {
										throw new Error("Function not implemented.");
									}}
								/>
							}
						/>
						<Route path="/product/:productId" element={<Product />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<Registration />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</>
	);
};

export default Layout;
