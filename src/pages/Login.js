import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cssfiles/login.css";
import axios from "axios";
import { useAuth } from "../Aunthentication";
import Admin from "../admin/admin";

export default function Login() {
	const navigate = useNavigate();
	const { login } = useAuth();

	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});

	// handling input change in form
	function handleChange(e) {
		setInputs((oldinputs) => ({
			...oldinputs,
			[e.target.name]: e.target.value,
		}));
	}
	// handling login button click
	function onLogin(e) {
		e.preventDefault();
		//changing login text to loading spiner
		const validator = document.querySelector(".validator");
		if (inputs.username === "admin" && inputs.password === "admin") {
			login(inputs.username);
			navigate("/admin");
		}
		if (inputs.username === "") {
			validator.style.display = "block";
			validator.textContent = "PLEASE ENTER USERNAME";
		} else if (inputs.password === "") {
			validator.style.display = "block";
			validator.textContent = "PLEASE ENTER PASSWORD";
		} else {
			console.log(process.env.REACT_APP_API_URL);
			axios
				.post(`${process.env.REACT_APP_API_URL}/login.php`, inputs)
				.then((response) => {
					if (response.data.status === "1") {
						login(inputs.username);
						navigate("/dashboard", {
							replace: true,
							state: {
								...inputs,
							},
						});
					} else {
						validator.style.display = "block";
						validator.textContent = "USERNAME OR PASSWORD DOES NOT MATCH";
					}
				})
				.catch((error) => {
					navigate("./error", {
						state: {
							error: error.message,
						},
					});
				});
		}
	}
	return (
		<>
			<div className="l_container">
				<div className="l_screen">
					<div className="l_screen__content">
						<img
							src={require("../images/logo.png")}
							className="l_loginlogo"
							alt="logo"
						/>
						<form className="l_login" onSubmit={onLogin}>
							<div className="l_login__field">
								<i className="l_login__icon">
									<img
										src={require("../images/user.png")}
										style={{ width: "13px" }}
										alt="usericon"
									/>{" "}
								</i>
								<input
									type="text"
									className="l_login__input"
									placeholder="User name"
									onChange={handleChange}
									name="username"
								/>
							</div>
							<div className="l_login__field">
								<i className="l_login__icon fas fa-lock">
									<img
										src={require("../images/padlock.png")}
										style={{ width: "13px" }}
										alt="padlocklogo"
									/>{" "}
								</i>
								<input
									type="password"
									className="l_login__input"
									placeholder="Password"
									onChange={handleChange}
									name="password"
								/>
							</div>
							<div className="validator"></div>
							<button className="l_button l_login__submit">
								<span className="l_button__text">Log In</span>
							</button>
							<div
								className="l_newaccount"
								onClick={() => navigate("/register")}
							>
								<Link to="/register">Create new account!</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
