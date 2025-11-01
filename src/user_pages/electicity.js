import "../cssfiles/trash.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Aunthentication";
import Showdialougue from "../components/showdialougue";
import axios from "axios";
import Loader from "../components/Loader";

export default function Electicity() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		fullName: "",
		billnumber: "",
		email: "",
		phoneNo: "",
		pincode: "",
		address: "",
		usertime: "",
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
			.post(`${process.env.REACT_APP_API_URL}/electricity.php`, formData)

			.then((res) => {
				if (res.data.status === "1") {
					setShowModal(true);
				} else if (res.data.status === "2") {
					navigate("/");
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
			billnumber: "",
			email: "",
			phoneNo: "",
			pincode: "",
			address: "",
			usertime: "",
			description: "",
			username: user,
		});
	};

	return (
		<>
			{loading && <Loader />}
			<button onClick={back_btn} className="back_btn">
				<FontAwesomeIcon icon={faChevronLeft} />
			</button>
			<div className="trash_container">
				<div className="form-wrapper">
					<h1 className="trash_title">Report Electricity Issues</h1>
					<hr />
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="billnumber" className="firstLabel">
								Electicity Bill Number
							</label>
							<input
								type="text"
								className="form-control"
								id="billnumber"
								value={formData.billnumber}
								name="billnumber"
								maxLength={10}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="fullName">Full Name</label>
							<input
								type="text"
								className="form-control"
								id="fullName"
								name="fullName"
								value={formData.fullName}
								onChange={handleInputChange}
								maxLength={20}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								className="form-control"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								maxLength={20}
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
								name="pincode"
								value={formData.pincode}
								onChange={handleInputChange}
								maxLength={10}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="address">Address</label>
							<textarea
								className="form-control"
								id="address"
								name="address"
								maxLength={200}
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
								name="description"
								maxLength={200}
								value={formData.description}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="usertime">
								When did the problem occur? (select date and time)
							</label>
							<input
								type="datetime-local"
								id="usertime"
								value={formData.usertime}
								name="usertime"
								className="form-control"
								onChange={handleInputChange}
								required
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
