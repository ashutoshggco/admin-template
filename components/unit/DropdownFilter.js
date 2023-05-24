import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/unit/DropdownFilter.module.scss";
import FilterButtonIcon from "../../public/units/FilterButtonIcon";

const DropdownFilter = ({
  options,
  handleApplyFilter,
  handleRemoveFilter,
  selectedOptions,
  setSelectedOptions
}) => {
  const [isActive, setIsActive] = useState(false);
  // const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.filter((item) => item !== option)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  useEffect(() => {
    console.log("Selected options inside:", selectedOptions);
  }, [selectedOptions]);

  return (
    <div style={{ marginRight: "1rem" }}>
      <div
        className={`${styles.dropdown} ${
          isActive ? styles.dropdownBtnFilter : styles.multiSelectUnActive
        }`}
        style={{ overflow: "visible" }}
      >
        <div
          className={`${
            isActive ? styles.dropdownBtnFilterActive : styles.dropdownBtnFilter
          }`}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? (
            <FilterButtonIcon color="#599522" />
          ) : (
            <FilterButtonIcon />
          )}
          Filter
        </div>
        {isActive && (
          <div className={`${styles.dropdownContentMulti}`}>
            {options.map((option, index) => (
              <div className={styles.dropdownItem} key={index}>
                <input
                  type="checkbox"
                  id={option.key}
                  value={option.key}
                  checked={
                    selectedOptions.length > 0
                      ? selectedOptions.includes(option.key)
                      : null
                  }
                  onChange={() => handleOptionClick(option.key)}
                  key={index}
                />
                <label> {option.value}</label>
              </div>
            ))}
            <hr />
            <button
              onClick={handleApplyFilter}
              style={{
                backgroundColor: "#599522",
                marginBottom: "0.5rem",
                marginTop: "1.5rem",
                width: "100%",
                color: "#ffffff",
                padding: "1.5rem",
                fontSize: "14px",
              }}
            >
              Apply Filter
            </button>
            <button
              style={{
                width: "100%",
                fontSize: "14px",
                padding: "1.5rem",
              }}
              onClick={handleRemoveFilter}
            >
              Remove Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

DropdownFilter.propTypes = {
  options: PropTypes.array.isRequired,
  handleApplyFilter: PropTypes.func.isRequired,
  handleRemoveFilter: PropTypes.func.isRequired,
};

export default DropdownFilter;
