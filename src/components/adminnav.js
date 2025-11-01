import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faXmark,
	faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";
import "../cssfiles/adminnav.css";
import { useRef, useState } from "react";
import { useAuth } from "../Aunthentication";

export default function Adminnav(props) {
	const adminc = useRef();
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const { logout } = useAuth();
	const navigate = useNavigate();

	function handleToggle() {
		setSidebarOpen((prev) => !prev);
	}

	function handlelogout() {
		logout();
		navigate("/", { replace: true });
	}

	return (
		<div className={`layout ${sidebarOpen ? "sidebar-active" : ""}`}>
			{/* top-left controls (toggler + logout) */}
			<div className="topControls">
				<button
					className="toggler"
					onClick={handleToggle}
					aria-label="Toggle sidebar"
				>
					<FontAwesomeIcon icon={sidebarOpen ? faXmark : faBars} />
				</button>

				<button
					onClick={handlelogout}
					className="logouticon"
					aria-label="Logout"
				>
					<FontAwesomeIcon icon={faArrowRightFromBracket} />
				</button>
			</div>

			{/* sidebar column */}
			<nav className="ad_navbar" aria-hidden={!sidebarOpen && false}>
				<div className="navitem_warpper">
					<NavLink
						to="/admin/water"
						className={({ isActive }) =>
							isActive ? `ad_active ad_navitems` : `ad_navitems`
						}
					>
						Water Complaints
					</NavLink>
				</div>

				<div className="navitem_warpper">
					<NavLink
						to="/admin/waste"
						className={({ isActive }) =>
							isActive ? `ad_active ad_navitems` : `ad_navitems`
						}
					>
						Waste Management Complaints
					</NavLink>
				</div>

				<div className="navitem_warpper">
					<NavLink
						to="/admin"
						end
						className={({ isActive }) =>
							isActive ? `ad_active ad_navitems` : `ad_navitems`
						}
					>
						Electricity Complaints
					</NavLink>
				</div>

				<div className="navitem_warpper">
					<NavLink
						to="/admin/pothole"
						className={({ isActive }) =>
							isActive ? `ad_active ad_navitems` : `ad_navitems`
						}
					>
						Pothole Complaints
					</NavLink>
				</div>

				<div className="navitem_warpper">
					<NavLink
						to="/admin/streetlight"
						className={({ isActive }) =>
							isActive ? `ad_active ad_navitems` : `ad_navitems`
						}
					>
						Streetlight Complaints
					</NavLink>
				</div>

				<div className="navitem_warpper">
					<NavLink
						to="/admin/createadmin"
						end
						className={({ isActive }) =>
							isActive ? `ad_active ad_navitems` : `ad_navitems`
						}
					>
						Create Admin
					</NavLink>
				</div>
			</nav>

			{/* main content column */}
			<main
				className={`adminContent ${sidebarOpen ? "admincontent_active" : ""}`}
				ref={adminc}
			>
				<Outlet />
			</main>
		</div>
	);
}
