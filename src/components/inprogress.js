import { useEffect, useState } from "react";
import axios from "axios";
import Adcomplaintcard from "./ad_complaintcard";

export default function Inprogress(props) {
	const number = 0;
	const [data, setData] = useState([]);
	useEffect(() => {
		axios
			.post(`${process.env.REACT_APP_API_URL}/fetchdata.php`, {
				table: props.table,
				status: "inprogress",
			})
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	});

	const complaitscard = data.map((c) => {
		return (
			<Adcomplaintcard
				key={c.id}
				address={c.address}
				number={number + 1}
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
				table={props.table}
			/>
		);
	});

	return <>{complaitscard}</>;
}
