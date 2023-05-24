import { useCallback } from "react";
import styles from "/styles/Search.module.scss";
import debounce from "lodash.debounce";

export const Search = ({
  setSearchTerm,
  placeholder = `Search for Driver’s Name or TruckID`,
  value,
}) => {
  const changeUrl = (val) => {
    setSearchTerm(val);
  };
  const debounceFunction = useCallback(
    debounce((changedVal) => changeUrl(changedVal), 600),
    []
  );
  const inputChangeHandler = (e) => {
    const changedVal = e.target.value;
    debounceFunction(changedVal);
  };
  return (
    <div className={styles.search}>
      <input
        placeholder={placeholder}
        onChange={inputChangeHandler}
        defaultValue={value}
      />
      <img src="/searchIcon.svg" className={styles.icon} alt="search icon" />
    </div>
  );
};
