import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
	faArrowUpRightFromSquare,
	faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Aunthentication";

export default function Navbar() {
	let d_navbar = useRef();
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	function hamburgerClicked() {
		setIsOpen((prev) => !prev);
	}

	function handleNavClick() {
		setIsOpen(false);
	}

	function handlelogout() {
		logout();
		navigate("/", { replace: true });
	}

	return (
		<nav className="navbar_cotainer">
			<div className="hamburger" onClick={hamburgerClicked}>
				<div className="bar"></div>
				<div className="bar"></div>
				<div className="bar"></div>
			</div>
			<img src="/images/dashlogo.png" className="d_img" alt="dashlogo" />
			<ul className={`d_navbar ${isOpen ? "d_active_nav" : ""}`} ref={d_navbar}>
				<div className="nav-items">
					<NavLink
						to="/dashboard"
						className={({ isActive }) => (isActive ? `u_active` : ``)}
						onClick={handleNavClick}
						end
					>
						Home
					</NavLink>
				</div>
				<div className="nav-items">
					<NavLink
						to="/dashboard/status"
						className={({ isActive }) => (isActive ? `u_active ` : ``)}
						onClick={handleNavClick}
					>
						Check Status
					</NavLink>
				</div>
				<div className="nav-items">
					<NavLink
						to="/dashboard/contact"
						className={({ isActive }) => (isActive ? `u_active ` : ``)}
						onClick={handleNavClick}
					>
						Contact
					</NavLink>
				</div>
				<div className="nav-items">
					<a
						href="https://pgportal.gov.in/"
						target="_blank"
						onClick={handleNavClick}
						rel="noreferrer"
					>
						Resources <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
					</a>
				</div>
				<div className="nav-items">
					<NavLink
						to="/dashboard/profile"
						className={({ isActive }) => (isActive ? `u_active ` : ``)}
						onClick={handleNavClick}
					>
						Profile
					</NavLink>
				</div>
			</ul>
			<button className="logoutIcon" onClick={handlelogout}>
				Log Out <FontAwesomeIcon icon={faArrowRightFromBracket} />
			</button>
		</nav>
	);
}
