// import {
//   faAngleDoubleLeft,
//   faAngleDoubleRight,
//   faAngleLeft,
//   faAngleRight,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import styles from "/styles/PaginationWidget.module.scss";

/**
 * displays a pagination div where you can show a page div, some more things.
 * @param {*} props {pageNumber,setPageNumber,itemsPerPage,setItemPerPage,itemCount,totalItems,totalPages}
 * @returns a page number component.
 */
export default function PaginationWidget({
  pageNumber,
  setPageNumber,
  itemsPerPage,
  setItemPerPage,
  itemCount,
  totalItems,
  totalCountUI = true,
  totalPages,
}) {
  //used to decide how many page number to show
  const showPageNumbers = 4;
  const addVal = useRef(1);
  if (addVal.current + showPageNumbers <= pageNumber)
    addVal.current = pageNumber;
  else if (addVal.current > pageNumber) addVal.current -= showPageNumbers;

  const add = addVal.current;

  return (
    //TODO: currently both the components below are being floated so be sure to change
    //TODO: that before designing for mobile*/
    <>
      <div className={styles.pageNumberContainer}>
        <div className={styles.perPageContainer}>
          <span>Items per page:</span>
          <select
            onChange={(e) => setItemPerPage(e.target.value)}
            value={itemsPerPage}
            style={{ cursor: "pointer" }}
          >
            {[10, 12, 15, 20].map((item, index) => (
              <option key={"itemsPerPage" + index}>{item}</option>
            ))}
          </select>
        </div>
        <div className={styles.productsShown}>
          {pageNumber} of {totalPages}
          <img
            src="/pagination/xLeft.svg"
            alt="xLeftArrow"
            onClick={() => setPageNumber(1)}
          />
          <img
            src="/pagination/left.svg"
            alt="leftArrow"
            onClick={() => {
              pageNumber > 1 && setPageNumber((state) => state - 1);
            }}
          />
          <img
            src="/pagination/right.svg"
            alt="rightArrow"
            onClick={() =>
              pageNumber < totalPages && setPageNumber(pageNumber + 1)
            }
          />
          <img
            src="/pagination/xRight.svg"
            alt="xRighttArrow"
            onClick={() => setPageNumber(totalPages)}
          />
        </div>
      </div>
      {totalCountUI && (
        <div className={styles.pageNumberContainer}>
          <div className={styles.perPageContainer}>
            <span>Total Items : </span>
            <span style={{ fontWeight: "400", color: "black" }}>
              {totalItems}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
