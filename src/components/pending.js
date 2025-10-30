import ComplaintList from "./ad_complaintList.js";
export default function Pending({ table }) {
	return <ComplaintList table={table} status="sent" />;
}
