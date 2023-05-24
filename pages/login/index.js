import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "/styles/Auth.module.scss";
import { login } from "../api/NetworkApi";
import { useRouter } from "next/router";
import { Loader } from "/components/unit/Loader";
import PasswordInputWithLabel from "../../components/unit/PasswordInputWithLabel";

const Login = ({ apiURL }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongCred, setWrongCred] = useState(false);
  const [errorText, setErrorText] = useState();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const obj = {
      email: email,
      password: password,
    };
    console.log(true);
    if (email.length > 0 && password.length > 0) {
      setLoading(true);
      const respone = await login(`${apiURL}/admin/login`, obj);
      console.log("response-->", respone);
      if (respone.statusCode == 200) {
        localStorage.setItem("token", respone.data.token);
        router.push("/");
      } else if (respone.statusCode >= 400) {
        respone.message.includes("WRONG_PASSWORD")
          ? setErrorText("Wrong Password")
          : setErrorText("User does not exist");
        setWrongCred(true);
      }
      setLoading(false);
    } else {
      console.log(true);
      setErrorText("Please enter credentials");
      setWrongCred(true);
    }
  };

  return (
    <div className={styles.authContainer}>
      {loading && <Loader />}
      <div className={styles.authFormContainer}>
        <div className={styles.authLeftContainer}>
          <p className={styles.heading}>Login</p>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            required
            onChange={(e) => {
              errorText && setErrorText("");
              setEmail(e.target.value);
            }}
            value={email}
          />
          <PasswordInputWithLabel
            id="Password"
            label="Password"
            onChange={(e) => {
              errorText && setErrorText("");
              setPassword(e.target.value);
            }}
            value={password}
          />

          {wrongCred && <p className={styles.error}>{errorText}</p>}

          <button type="submit" onClick={handleLogin}>
            Login
          </button>

          <p style={{ textAlign: "center", color: "#2F2F2F" }}>
            Forgot Password?{" "}
            <Link href="/forgotPassword">
              <a className={styles.forgotPassword}>Reset here</a>
            </Link>
          </p>
          <p style={{ textAlign: "center", color: "#2F2F2F" }}>
           New Here?
            <Link href="/signUp">
              <a className={styles.forgotPassword}> Sign Up</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

export async function getStaticProps(context) {
  const apiURL = process.env.API_URL;
  return {
    props: {
      apiURL,
    },
  };
}
