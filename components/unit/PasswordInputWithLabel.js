import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "/styles/unit/controlledFormElements.module.scss";
export default function PasswordInputWithLabel({
  className = "",
  id = "",
  label = "",
  value,
  onChange,
  placeholder = "",
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={`${styles.labelWithInput} ${className}`}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.passwordInput}>
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      <span
        className={`${styles.icon} ${styles.pswdIcon}`}
        onClick={() => setShowPassword((state) => !state)}
      >
        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
      </span>
    </div>
  );
}
