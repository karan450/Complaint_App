import React from "react";
import { useLocation, useNavigate, Link, NavLink } from "react-router-dom";
import "../cssfiles/dashboard.css";
import Slider from "../components/Slider";
import Navbar from "../components/navbar";

function Dashboard(props) {
	// we are receiving the props through the navigation param in the second args.
	// coming from the login.js
	const n_prop = useLocation();
	const navigate = useNavigate();

	function complaintwrapperClicked(e) {
		const clickedElement = e.target.closest(".complaint_wrapper");

		switch (clickedElement.getAttribute("data-complaint-type")) {
			case "water":
				navigate("/water_complaint");
				break;

			case "trash":
				navigate("/gar_complaint");
				break;

			case "electricity":
				navigate("/electicity_complaint");
				break;

			case "pothole":
				navigate("/pothole_complaint");
				break;

			case "streetlight":
				navigate("/streetlight_complaint");
				break;
			default:
				break;
		}
	}

	// handling complaint-images-buttons

	return (
		<div className="d_container">
			{/* BUTTON IMAGES  */}
			<div className="images_container">
				<div className="d_grid">
					<div
						className="complaint_wrapper"
						data-complaint-type="water"
						onClick={complaintwrapperClicked}
					>
						<img
							draggable={false}
							src={require("../images/drop.png")}
							name="water"
							alt="water"
							className="c_img"
						/>
						<span className="complaint_text">WATER COMPLAINT</span>
					</div>

					<div
						className="complaint_wrapper"
						data-complaint-type="trash"
						onClick={complaintwrapperClicked}
					>
						<img
							draggable={false}
							src={require("../images/dump.png")}
							alt="garbage"
							name="garbage"
							className="c_img"
						/>
						<span className="complaint_text">
							GARBAGE DISPOSAL
							<br /> COMPLAINT
						</span>
					</div>

					<div
						className="complaint_wrapper"
						data-complaint-type="electricity"
						onClick={complaintwrapperClicked}
					>
						<img
							draggable={false}
							src={require("../images/flash.png")}
							alt="electricity"
							name="electricity"
							className="c_img"
						/>
						<span className="complaint_text">ELECTRICITY COMPLAINT</span>
					</div>

					<div
						className="complaint_wrapper"
						data-complaint-type="pothole"
						onClick={complaintwrapperClicked}
					>
						<img
							draggable={false}
							src={require("../images/pothole.png")}
							alt="pothole"
							name="pothole"
							className="c_img"
						/>
						<span className="complaint_text">POTHOLE COMPLAINT</span>
					</div>

					<div
						className="complaint_wrapper"
						data-complaint-type="streetlight"
						onClick={complaintwrapperClicked}
					>
						<img
							draggable={false}
							src={require("../images/street.png")}
							alt="streetlight"
							name="streetlight"
							className="c_img"
						/>
						<span className="complaint_text">STREETLIGHT COMPLAINT</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
