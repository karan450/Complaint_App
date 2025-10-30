import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cssfiles/register.css";
import { useAuth } from "../Aunthentication";
import axios from "axios";

function Register() {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
		phoneno: 0,
	});
	const { login } = useAuth();

	useEffect(() => {
		document.querySelector(".validator").style.display = "none";
	}, [inputs]);
	// handling input change in form
	function handleChange(e) {
		setInputs((oldinputs) => ({
			...oldinputs,
			[e.target.name]: e.target.value,
		}));
	}
	// handling login button click
	function onSignUp(e) {
		e.preventDefault();

		// validations for our registration page
		const validator = document.querySelector(".validator");
		if (inputs.username === "") {
			validator.style.display = "block";
			validator.textContent = "PLEASE ENTER USERNAME";
		} else if (inputs.password === "") {
			validator.style.display = "block";
			validator.textContent = "PLEASE ENTER PASSWORD";
		} else if (inputs.phoneno === "") {
			validator.style.display = "block";
			validator.textContent = "PLEASE ENTER MOBILE NUMBER";
		} else if (inputs.phoneno.toString().length != 10) {
			validator.style.display = "block";
			validator.textContent = "INCORRECT MOBILE NUMBER";
		} else {
			//changing login text to loading spiner
			axios
				.post(`${process.env.REACT_APP_API_URL}/insert.php`, inputs)
				.then((response) => {
					//if the data inserted...
					if (response.data.status === "1") {
						login(inputs.username);
						navigate("/dashboard", {
							replace: true,
							state: {
								...inputs,
							},
						});
					} else if (response.data.status === "2") {
						validator.style.display = "block";
						validator.textContent = "USER ALREADY EXIST!!";
					}
				})
				.catch((error) => console.log(error));
		}
	}

	return (
		<div className="container">
			<div className="screen">
				<div className="screen__content">
					<img src={require("../images/logo.png")} className="loginlogo" />
					<form className="login" onSubmit={onSignUp}>
						<div className="login__field">
							<i className="login__icon fas fa-user">
								<img
									src={require("../images/user.png")}
									style={{ width: "13px" }}
								/>{" "}
							</i>
							<input
								type="text"
								className="login__input"
								placeholder="User name"
								autoComplete="off"
								onChange={handleChange}
								name="username"
							/>
						</div>
						<div className="login__field">
							<i className="login__icon fas fa-lock">
								<img
									src={require("../images/padlock.png")}
									style={{ width: "13px" }}
								/>{" "}
							</i>
							<input
								type="password"
								className="login__input"
								placeholder="Password"
								onChange={handleChange}
								name="password"
							/>
						</div>
						<div className="login__field">
							<i className="login__icon fas fa-lock">
								<img
									src={require("../images/call.png")}
									style={{ width: "13px" }}
								/>{" "}
							</i>
							<input
								type="number"
								className="login__input"
								autoComplete="off"
								placeholder="Moblie No."
								onChange={handleChange}
								name="phoneno"
							/>
						</div>
						<div className="validator"></div>
						<button className="button login__submit">
							<span className="button__text">Sign Up</span>
						</button>
						<div className="newaccount">
							Have an Account?{" "}
							<Link to="/" style={{ color: "blue", textDecoration: "none" }}>
								Log in{" "}
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Register;
