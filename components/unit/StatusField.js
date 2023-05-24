import React from "react";
import styles from "/styles/StatusField.module.scss";

function StatusField({ type }) {
  return (
    <div>
      {type === "OPEN" ? (
        <span className={styles.open}>Requested</span>
      ) : type === "COMPLETED" ? (
        <span className={styles.used}>Completed</span>
      ): type === "REQUESTED" ? (
        <span className={styles.requested}>Requested</span>
      ) : type === "IN USE" ? (
        <span className={styles.inUse}>In Use</span>
      ) : type === "CONFIRMED" ? (
        <span className={styles.confirmed}>Confirmed</span>
      ) : type === "EXPIRED" ? (
        <span className={styles.expired}>Expired</span>
      ) : type === "CANCELLED" ? (
        <span className={styles.cancelled}>Cancelled</span>
      ) : type === "REQUEST FAILED" ? (
        <span className={styles.expired}>Request Failed</span>
      ) : type === "CANCELLATION REQUESTED" ? (
        <span className={styles.cancellationRequested}>Cancellation Requested</span>
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default StatusField;
