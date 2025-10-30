import ComplaintList from "./ad_complaintList.js";
export default function Resolved({ table }) {
	return <ComplaintList table={table} status="resolved" />;
}
