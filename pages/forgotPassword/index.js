import React, { useState, useEffect } from "react";
import styles from "/styles/Auth.module.scss";
import Loader from "/components/unit/Loader";
import { login } from "../api/NetworkApi";
import { useRouter } from "next/router";
import { getParameterByName } from "../../helper/getParams";
import PasswordInputWithLabel from "../../components/unit/PasswordInputWithLabel";

const ForgotPassword = ({ apiURL }) => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [codeSent, setCodeSent] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [otp, setOtp] = useState();
  const router = useRouter();
  const handleForgot = async () => {
    const obj = {
      email: email,
    };
    const respone = await login(`${apiURL}admin/sendForgetPassEmail`, obj);
    if (respone.statusCode == 201) {
      setCodeSent(true);
    }
  };
  const handleReset = async () => {
    if (password == confirmPassword) {
      const obj = {
        otp: otp,
        newPassword: password,
        email: email,
      };
      const respone = await login(`${apiURL}/admin/resetPassword`, obj);
      if (respone.statusCode == 200) {
        router.push("/login");
        console.log("respone", respone);
      } else if (respone.statusCode == 400) {
        setErrorText(respone.data);
      }
    } else {
      setErrorText("Password and Confirm Password Should be same");
    }
  };
  useEffect(() => {
    const o = getParameterByName("otp", router.asPath);
    const e = getParameterByName("email", router.asPath);
    console.log("emai", e);
    setOtp(o);
    setEmail(e);
  }, []);

  return (
    <div className={styles.authContainer}>
      {loading && <Loader />}
      <div className={styles.authFormContainer}>
        {otp ? (
          <div
            className={styles.authLeftContainer}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <p className={styles.heading}>Enter new password</p>
            {/* <label htmlFor="email" style={{ width: "100%", marginLeft: "35%" }}>
              New Password
            </label>
            <input
              type="password"
              required
              onChange={(e) => {
                errorText && setErrorText("");
                setPassword(e.target.value);
              }}
              value={password}
            /> */}
            <PasswordInputWithLabel
              id="newPassword"
              label="New Password"
              onChange={(e) => {
                errorText && setErrorText("");
                setPassword(e.target.value);
              }}
              value={password}
            />
            <PasswordInputWithLabel
              id="confirmPassword"
              label="Confirm Password"
              onChange={(e) => {
                errorText && setErrorText("");
                setConfirmPassword(e.target.value);
              }}
              value={confirmPassword}
            />
            {errorText && <p className={styles.error}>{errorText}</p>}
            <p className={styles.condition}>
              Please make sure you have 1 capital letter, 1 special character, 1
              numberic and length of 8 in your password.
            </p>
            <button
              type="submit"
              onClick={handleReset}
              style={{ width: "80%" }}
            >
              Reset Password
            </button>
          </div>
        ) : (
          <div className={styles.authLeftContainer}>
            <p className={styles.heading}>Forgot your password?</p>
            <p className={styles.subHeading}>
              Enter you Email to reset the password!
            </p>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            {codeSent && (
              <p>Email Successfully sent. Please check your Email</p>
            )}
            <button type="submit" onClick={handleForgot}>
              Send Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ForgotPassword;

export async function getStaticProps(context) {
  const apiURL = process.env.API_URL;
  return {
    props: {
      apiURL,
    },
  };
}
