import { useEffect, useState } from "react";
import styles from "/styles/unit/Dropdown.module.scss";

export const Dropdown = ({
  selected,
  setSelected,
  setDataChanged,
  options,
  isOpenDrop,
  setisOpenDrop,
  inputClassName,
  type,
  togglePopup,
  showCheckInList,
  setMultiSelectFilter,
  multiSelectFilter,
}) => {
  const [isActive, SetIsActive] = useState(false);

  const handleChange = (key) => {
    if (event.target.checked) {
      console.log("event", event.target.checked, key);
      setMultiSelectFilter([...multiSelectFilter, key]);
      key == "showDriver" && togglePopup();
      setSelected(key);
    } else {
      setMultiSelectFilter((state) => state.filter((data) => data != key));
      selected === "showDriver" && togglePopup();
      setSelected("");
    }
  };

  useEffect(() => {
    // type === "surveyDropdown" && selected && setSelectedText(selected);
    SetIsActive(isOpenDrop);
  }, [isOpenDrop]);
  return (
    <div
      className={`
        ${styles.dropdown} 
              ${
                type === "multiselect" &&
                (isActive
                  ? styles.multiSelectActive
                  : styles.multiSelectUnActive)
              }`}
      style={{ overflow: "visible" }}
    >
      <div
        className={`${styles.dropdownBtn}, ${inputClassName}`}
        onClick={(e) => SetIsActive(!isActive)}
      >
        <span
          style={{ display: "flex", alignItems: "center", padding: "0.5rem" }}
        >
          {type != "multiselect" &&
            (selected !== "" ? selected?.value : "Please select a option")}
        </span>
        {!inputClassName && (
          <img
            decoding="async"
            loading="lazy"
            src={
              type === "multiselect"
                ? "mutiSelect-dropdown.svg"
                : "down-arrow.svg"
            }
            alt="drop-down arrow"
          />
        )}
      </div>
      {isActive && (
        <div
          className={`${styles.dropdownContent}  ${
            type === "multiselect" && styles.dropdownContentMulti
          }`}
        >
          {options.map((option, index) => (
            <span key={index}>
              {type === "multiselect" ? (
                <div className={styles.dropdownItem}>
                  <input
                    type="checkbox"
                    // checked={
                    //   option.key == "showDriver" ? showCheckInList : false
                    // }
                    onChange={() => handleChange(option.key)}
                  />
                  <label> {option.value}</label>
                </div>
              ) : (
                <div
                  onClick={(e) => {
                    setSelected(option);
                    // setSelectedText(option.value);
                    SetIsActive(false);
                    setDataChanged(true);
                    isOpenDrop && setisOpenDrop(false);
                  }}
                  className={styles.dropdownItem}
                >
                  {option.value}
                </div>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
