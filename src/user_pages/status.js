import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Aunthentication";
import Complaintcard from "../components/Complaintcard";
import "../cssfiles/status.css";
import Loader from "../components/Loader";

export default function Checkstatus() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useAuth();
	useEffect(() => {
		setLoading(true);
		axios
			.post(`${process.env.REACT_APP_API_URL}/getuserComplaint.php`, {
				username: user,
			})
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	const myElements = data.map((element) => (
		<Complaintcard
			key={element.id + " " + element.type}
			type={element.type}
			status={element.status}
			date={element.datetime}
			description={element.description}
			id={element.id}
		/>
	));

	return (
		<>
			{loading && <Loader />}
			<div className="complaint_container">
				{data.length ? (
					myElements
				) : (
					<>
						<div className="status_image">
							<p>
								NOTHING TO <br />
								SHOW YET....
							</p>
						</div>
					</>
				)}
			</div>
		</>
	);
}
