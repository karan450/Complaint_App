import ComplaintList from "./ad_complaintList.js";
export default function Onhold({ table }) {
	return <ComplaintList table={table} status="onhold" />;
}
