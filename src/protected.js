import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Aunthentication";

export default function Protected(props) {
	const { Component } = props;
	const { user } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (user === "admin") {
			navigate("/admin");
		}
		if (!user) {
			navigate("/");
		}
	}, []);

	return (
		<>
			<Component />
		</>
	);
}
