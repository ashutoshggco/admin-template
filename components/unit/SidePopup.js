import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import styles from "/styles/unit/SidePopup.module.scss";

/**
 * A popup that comes from right side of the screen. Opens and closes with an animation and needs its own
 * close function.
 * @author Rishav Pathania
 * @param {*} props {children, className, togglePopup, heading, saveBtn, dataChanged, onSaveClick}
 * - children are all the children passed to this component.
 * - className is the CSS class that can be used to customize the popup further and the togglePopup function is
 * used to toggle the popup.
 * - heading that is to be shown in the headSection of popup.
 * - saveBtn boolean to whether show the saveBtn or not.
 * - dataChanged boolean field that signifies whether the data in the modal has changed.
 * - onSaveClick handles the click on the button.
 * @returns A side popup modal.
 */
export default function SidePopup({
  children,
  className = "",
  togglePopup,
  heading,
  driverData,
  delayClose = true,
  saveBtn = false,
  dataChanged = false,
  onSaveClick = () => {},
  editBtn = false,
  onEditClick = () => {},
  loading = false,
  saveBtnText = "Save",
  firstInputRef,
  hide = false,
  startAutoClose = false,
}) {
  const [closeModal, setCloseModal] = useState(false);
  useEffect(() => {
    if (closeModal) {
      //delay the closing of pop-up to complete the close animation.
      if (delayClose) setTimeout(() => togglePopup(), 500);
      else togglePopup();
    }
  }, [closeModal, delayClose, togglePopup]);

  useEffect(() => {
    if (firstInputRef) firstInputRef.current.focus();
    else if (overlayRef) overlayRef.current.focus();
  }, [firstInputRef, overlayRef]);

  useEffect(() => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarCompensation}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  useEffect(() => {
    let timeout;
    if (!closeModal && startAutoClose) {
      timeout = setTimeout(() => togglePopup(), 500);
    }
    return () => clearTimeout(timeout);
  }, [startAutoClose, closeModal]);

  const handleCloseClick = () => {
    setCloseModal(true);
  };

  const saveRef = useRef();
  const overlayRef = useRef();

  return (
    <>
      <div
        className={`${styles.overlay} ${
          closeModal || hide || startAutoClose ? styles.disappear : ""
        } overlay `}
        onClick={loading ? () => {} : handleCloseClick}
        tabIndex={0}
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        onKeyDown={(e) => (e.key === "Enter" ? e.target.click() : "")}
      ></div>
      <div
        className={`${styles.sidePopUp} ${
          closeModal || hide || startAutoClose ? styles.closeAnim : ""
        } ${className}`}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.content}>
          <div className={styles.headSection}>
            <span style={{ display: "block" }}>
              {" "}
              {heading && <h2>{heading}</h2>}
              {driverData && <p>{driverData} Authorized drivers at Terminal</p>}
            </span>

            {/* {editBtn && (
              <button
                title="edit details"
                onClick={onEditClick}
                tabIndex={saveBtn ? 1 : 0}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )} */}
            {/* the close button */}
            <button
              title="close popup"
              disabled={loading}
              onClick={handleCloseClick}
              tabIndex={saveBtn ? 1 : 0}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            {/* used to trap tab Focus */}
            {/* {saveBtn && (
              <span
                tabIndex={1}
                onFocus={() => overlayRef.current.focus()}
              ></span>
            )} */}
          </div>
          {children}
        </div>

        {/* used to trap tab Focus */}
        {saveBtn ? (
          <span tabIndex={0} onFocus={() => saveRef.current.focus()}></span>
        ) : (
          <span tabIndex={0} onFocus={() => overlayRef.current.focus()}></span>
        )}
      </div>
    </>
  );
}
