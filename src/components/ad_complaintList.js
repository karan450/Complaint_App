import { useEffect, useState } from "react";
import axios from "axios";
import Adcomplaintcard from "./ad_complaintcard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faInbox } from "@fortawesome/free-solid-svg-icons";

export default function ComplaintList({ table, status }) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchData = () => {
		setLoading(true);
		axios
			.post(`${process.env.REACT_APP_API_URL}/fetchdata.php`, {
				table,
				status,
			})
			.then((res) => setData(res.data))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		fetchData();
	}, [table]);

	if (loading)
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "60vh",
					fontSize: "2rem",
					color: "#444",
				}}
			>
				<FontAwesomeIcon icon={faSpinner} spin />
			</div>
		);

	if (!data || data.length === 0)
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					height: "60vh",
					color: "#777",
				}}
			>
				<FontAwesomeIcon
					icon={faInbox}
					style={{ fontSize: "3rem", marginBottom: "0.5rem" }}
				/>
				<p style={{ fontSize: "1.1rem" }}>No complaints found</p>
			</div>
		);

	return (
		<div className="mainContainerOfCards">
			{data.map((c, i) => (
				<Adcomplaintcard
					key={c.id}
					number={i + 1}
					address={c.address}
					datetime={c.datetime}
					description={c.description}
					email={c.email}
					fullname={c.fullname}
					id={c.id}
					phoneno={c.phonenumber}
					pincode={c.pincode}
					status={c.status}
					username={c.username}
					usertime={c.usertime}
					image={c.image}
					billnumber={c.billnumber}
					streetlightno={c.streetlightno}
					table={table}
					onStatusChange={fetchData}
				/>
			))}
		</div>
	);
}
