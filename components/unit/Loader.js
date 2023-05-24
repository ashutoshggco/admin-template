import React from "react";
import styles from "/styles/Loader.module.scss";
export const Loader = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
};
