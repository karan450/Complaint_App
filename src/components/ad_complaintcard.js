import "../cssfiles/ad_complaintcard.css";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Adcomplaintcard(props) {
	const [toggle, setToggle] = useState(false);
	const container = useRef();
	const showmore = useRef();

	function handleShowmore() {
		setToggle(!toggle);
		if (toggle) {
			showmore.current.textContent = "(Show more)";
		} else {
			showmore.current.textContent = "(Show less)";
		}
		container.current.classList.toggle("active_cotainer");
	}
	function onhold() {
		axios
			.post(`${process.env.REACT_APP_API_URL}/onhold.php`, {
				table: props.table,
				status: "onhold",
				id: props.id,
			})
			.then((response) => {
				if (response.data.status === "1") {
					alert("SENT TO ON HOLD");
				}
			});
	}

	function sendtoworker() {
		console.log("sending to worker");
		axios
			.post(`${process.env.REACT_APP_API_URL}/onhold.php`, {
				table: props.table,
				status: "inprogress",
				id: props.id,
			})
			.then((response) => {
				if (response.data.status === "1") {
					alert("SENT TO PROGRESS");
				}
			});
	}

	function resolved() {
		axios
			.post(`${process.env.REACT_APP_API_URL}/onhold.php`, {
				table: props.table,
				status: "resolved",
				id: props.id,
			})
			.then((response) => {
				if (response.data.status === "1") {
					alert("SET AS RESOLVE");
				}
			});
	}

	function deletecomplaint() {
		axios
			.post(`${process.env.REACT_APP_API_URL}/delete.php`, {
				table: props.table,
				status: "inprogress",
				id: props.id,
			})
			.then((response) => {
				if (response.data.status === "1") {
					alert("DELETED SUCCESSFULLY");
				}
			});
	}

	let dateTimeStr = props.datetime;
	let [dateStr] = dateTimeStr.split(" ");
	let [year, month, day] = dateStr.split("-");
	let newDateStr = `${day}/${month}/${year}`;
	// special props can be userdatetime,streetlightnumber,electricity bill number, image for trash and pothole,
	return (
		<>
			<div
				className="complaint__card_container"
				ref={container}
				style={{ marginBottom: "20px" }}
			>
				<div className="header_complaint">
					<p>Complaint ID : #{props.id}</p>
					<p>Username : {props.username}</p>
					<p>
						<FontAwesomeIcon icon={faPhone} /> {props.phoneno}
					</p>
					<p>Registered At : {newDateStr}</p>
				</div>
				<p className="desc_complaint">Issue : {props.description}</p>
				<div className="body_complaint">
					<br />
					<p>Address : {props.address}</p>
					<br />
					{props.usertime
						? "Problem Since : " + props.usertime
						: props.billnumber
						? `\nElectricity Bill Number : ` + props.billnumber
						: props.streetlightno
						? `\nStreetLight No : ` + props.streetlightno
						: ``}
					{toggle && (
						<>
							<p style={{ marginTop: "5px" }}>Name : {props.fullname}</p>
							<p style={{ marginTop: "5px" }}>Pincode : {props.pincode}</p>
							<p style={{ marginTop: "5px" }}>
								<FontAwesomeIcon icon={faEnvelope} /> {props.email}
							</p>
							{props.image ? (
								<img
									src={props.image}
									className="adminImage"
									style={{
										height: "100px",
										position: "absolute",
										right: "0",
										bottom: "0",
										marginBottom: "20px",
										marginRight: "20px",
									}}
									// onClick={handleImage}
								/>
							) : (
								""
							)}
							{props.status == "sent" ? (
								<>
									{/* button of pending page */}
									<button className="onhold" onClick={onhold}>
										On HOLD
									</button>
									<button className="worker" onClick={sendtoworker}>
										Send To Worker
									</button>
								</>
							) : // button of on hold page
							props.status == "onhold" ? (
								<button className="worker" onClick={sendtoworker}>
									Send to WORKER
								</button>
							) : // button of in progress page
							props.status == "inprogress" ? (
								<button className="worker" onClick={resolved}>
									RESOLVE
								</button>
							) : props.status == "resolved" ? (
								// button of resolved page
								<button className="onhold" onClick={deletecomplaint}>
									DELETE
								</button>
							) : (
								""
							)}
						</>
					)}

					<span
						className="ad_logo"
						style={
							toggle
								? {
										marginBottom: "12px",
										marginLeft: "10px",
										marginTop: "30px",
								  }
								: { marginBottom: "12px", marginLeft: "10px" }
						}
						onClick={handleShowmore}
						ref={showmore}
					>
						(Show more)
					</span>
				</div>
			</div>
		</>
	);
}
