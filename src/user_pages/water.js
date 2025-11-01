import "../cssfiles/trash.css";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Showdialougue from "../components/showdialougue";
import { useAuth } from "../Aunthentication";
import Loader from "../components/Loader";

export default function Water() {
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phoneNo: "",
		pincode: "",
		usertime: "",
		address: "",
		description: "",
		username: user,
	});

	function back_btn() {
		navigate(-1);
	}

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);
		axios
			.post(`${process.env.REACT_APP_API_URL}/water.php`, formData)

			.then((res) => {
				if (res.data.status === "1") {
					setShowModal(true);
				} else if (res.data.status === "2") {
					navigate("/");
					console.log("USER WAS NOT FOUND couldn't insert complaint");
				} else {
					navigate("/error", {
						state: {
							error: res.data.result,
						},
					});
				}
			})

			.catch((error) => {
				console.log(error);
				navigate("/error", {
					state: {
						error: error.message,
					},
				});
			})
			.finally(() => {
				setLoading(false);
			});

		setFormData({
			fullName: "",
			email: "",
			phoneNo: "",
			pincode: "",
			usertime: "",
			address: "",
			description: "",
			username: user,
		});
	};

	return (
		<>
			<button onClick={back_btn} className="back_btn">
				<FontAwesomeIcon icon={faChevronLeft} />
			</button>
			<div className="trash_container">
				<div className="form-wrapper">
					<h1 className="trash_title">Report a Water Issue</h1>
					<hr />
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="fullName" className="firstLabel">
								Full Name
							</label>
							<input
								type="text"
								className="form-control"
								id="fullName"
								name="fullName"
								maxLength={20}
								value={formData.fullName}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								className="form-control"
								id="email"
								maxLength={35}
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="phoneNo">Phone Number</label>
							<input
								type="tel"
								className="form-control"
								id="phoneNo"
								name="phoneNo"
								minLength={10}
								maxLength={10}
								value={formData.phoneNo}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="pincode">Pincode</label>
							<input
								type="text"
								className="form-control"
								id="pincode"
								maxLength={10}
								name="pincode"
								value={formData.pincode}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="dateTime">
								When did the problem occur? (select date and time)
							</label>
							<input
								type="datetime-local"
								id="dateTime"
								name="usertime"
								className="form-control"
								value={formData.usertime}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="address">Address</label>
							<textarea
								className="form-control"
								id="address"
								maxLength={200}
								name="address"
								value={formData.address}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="description">Description</label>
							<textarea
								className="form-control"
								id="description"
								maxLength={200}
								name="description"
								value={formData.description}
								onChange={handleInputChange}
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
						<Showdialougue showModal={showModal} setShowModal={setShowModal} />
					</form>
				</div>
			</div>
		</>
	);
}
