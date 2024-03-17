import scss from "./Header.module.scss";
import logo from "../../../assets/logo.svg";
import save from "../../../assets/save.svg";
import logOut from "../../../assets/logOut.svg";
import basket from "../../../assets/basket.svg";
import { useNavigate } from "react-router-dom";
const Header = () => {
	const navigate = useNavigate();

	const handleLogOut = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};
	return (
		<header className={scss.Header}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.logo}>
						<img src={logo} alt="logo" />
					</div>
					<div>
						<img src={logOut} onClick={handleLogOut} alt="" />
						<img src={save} alt="" />
						<img src={basket} alt="" />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
