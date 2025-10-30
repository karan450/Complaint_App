import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleUp,
	faAngleDown,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";

function ComplaintCard(props) {
	let activeComplaint = useRef();
	const [expanded, setExpanded] = useState(false);

	const handleToggle = () => {
		setExpanded(!expanded);
		activeComplaint.current.classList.toggle("activecomplaint");
	};

	function cancelComplaint() {}

	function getStatusValue() {
		switch (props.status) {
			case "sent":
				return (
					<>
						Your request has been sent to the {props.type} Department Of INDIA.
						We will notify you on the further progress.{" "}
					</>
				);
			case "onhold":
				return (
					<>
						Your Complaint has been seen by the {props.type} Department Of
						INDIA. It may take some time to resolve the Issue.
					</>
				);
			case "inprogress":
				return (
					<>
						Your complaint is being resolved by the {props.type} Department Of
						INDIA. It may take some time.
					</>
				);
			case "resolved":
				return (
					<>
						Your complaint has been resolved. If you have any query or
						suggestions you can contact the Department Of {props.type} through
						the contact page.
					</>
				);
			default:
				return <>Your complaint isn't sent...try again</>;
		}
	}

	let dateTimeStr = props.date;
	let [dateStr] = dateTimeStr.split(" ");
	let [year, month, day] = dateStr.split("-");
	let newDateStr = `${day}/${month}/${year}`;

	return (
		<div
			className="complaint-card"
			ref={activeComplaint}
			onClick={handleToggle}
		>
			<div className="complaint-card-header">
				<h3>
					{props.type.charAt(0).toUpperCase() + props.type.slice(1)} Complaint
					on {newDateStr}
				</h3>
				<span></span>
				<div className="updownicon">
					<FontAwesomeIcon icon={expanded ? faAngleUp : faAngleDown} />
				</div>
				<p>
					{props.description
						? "Complaint : " + props.description
						: "Complaint : (not described)"}
				</p>
				<br />
			</div>
			{expanded && (
				<div className="complaint-card-content">
					<p className="complaintid">Complaint ID : {props.id}</p>
					<p className="statuswrapper">
						<p className="status">
							Status:{" "}
							{props.status.charAt(0).toUpperCase() + props.status.slice(1)}
						</p>
						<p className="statusvalue page">{getStatusValue()}</p>
					</p>
					<button onClick={cancelComplaint} className="cancelBtn">
						<FontAwesomeIcon icon={faXmark} className="cancelIcon" /> Cancel
					</button>
				</div>
			)}
		</div>
	);
}

export default ComplaintCard;
