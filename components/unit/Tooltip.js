import React, { useState } from "react";
import styles from "/styles/unit/Tooltip.module.scss";

const Tooltip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      props?.setShowToolTip({ [props.driverId]: true });
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    props?.setShowToolTip({ [props.driverId]: false });
    setActive(false);
  };

  return (
    <div
      className={styles.TooltipWrapper}
      // When to show the tooltip
      onClick={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div className={`${styles.TooltipTip} ${styles.left}`}>
          {/* Content */}
          {props.content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
