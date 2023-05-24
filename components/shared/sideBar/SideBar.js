import { sideBarObj } from "../../../helper/data/SideBarData";
import styles from "/styles/shared/SideBar.module.scss";
import ListItemWithIcon from "./ListItemWithIcon";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

export default function SideBar({ isSidebarCollapsed }) {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <aside
      className={`${styles.sideBar} ${
        isSidebarCollapsed ? styles.collapsed : ""
      }`}
    >
      
        <div className={styles.logo}>
          <img src="Logo.svg" alt="Logo Logo" />
        </div>
        <div>
          <nav className={styles.sideNav}>
            <ul>
              {sideBarObj.map((item, index) => (
                <ListItemWithIcon
                  key={item.link + index}
                  href={item.link}
                  icon={item.icon}
                  text={item.name}
                  isSidebarCollapsed={isSidebarCollapsed}
                />
              ))}
            </ul>
          </nav>
        </div>
     
      <button
        title="logout from the site"
        className={styles.logoutBtn}
        onClick={handleLogout}
      >
        <FontAwesomeIcon icon={faSignOutAlt} />
        {!isSidebarCollapsed && <span>Logout</span>}
      </button>
    </aside>
  );
}
