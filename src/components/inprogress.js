import ComplaintList from "./ad_complaintList.js";
export default function Inprogress({ table }) {
	return <ComplaintList table={table} status="inprogress" />;
}
