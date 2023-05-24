import React, { useEffect, useState } from "react";
import styles from "/styles/Header.module.scss";

export const Header = ({ setToken, token }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? setLoggedIn(true) : setLoggedIn(false);
  }, [token]);
  return (
    <div className={styles.headerContainer}>
      <img src="Logo.svg" alt=" logo" />
      {loggedIn && (
        <a
          onClick={() => {
            localStorage.clear();
            setToken(null);
          }}
        >
          {" "}
          Logout
        </a>
      )}
    </div>
  );
};
