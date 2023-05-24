import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../../styles/shared/SideBar.module.scss";

/**
 * Makes a list item that contains a link with icon and text, this is highlighted.
 * when current route is same as href.
 * @param {Object} props {href, icon, text}
 * @returns a list item component with a link with icon and text.
 */
export default function ListItemWithIcon({
  href,
  icon,
  text,
  notificationVal = 0,
  isSidebarCollapsed,
}) {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <li title={text + " link"}>
      <Link href={href}>
        <a className={currentPath === href ? styles.active : ""}>
          <img src={icon} alt="icon" />
          {!isSidebarCollapsed && <span>{text}</span>}
          {notificationVal > 0 && (
            <span className={styles.notificationDot}>{notificationVal}</span>
          )}
        </a>
      </Link>
    </li>
  );
}
