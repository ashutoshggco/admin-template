import React from "react";
import styles from "/styles/ConfirmModal.module.scss";
export const ConfirmModal = ({ onConfirm, ban, onCancel, message }) => {
  return (
    <>
      <div className={styles.overlay} onClick={onCancel}></div>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button
            className={`${ban ? styles.unbanBtn : styles.banBtn}`}
            autoFocus={true}
            onClick={onConfirm}
          >
            {ban ? "Unban" : "Ban"}
          </button>
        </div>
      </div>
    </>
  );
};
