import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "/styles/Auth.module.scss";
import { login } from "../api/NetworkApi";
import { useRouter } from "next/router";
import { Loader } from "/components/unit/Loader";

const SignUp = ({ apiURL }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    const validationErrors = validateFormData(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Submit form data to server
      console.log(formData);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const validationErrors = validateFormData(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(validationErrors);
    }
  }, [formData, errors]);

  const validateFormData = (data) => {
    const errors = {};
    if (!data.firstName) {
      errors.firstName = "Please enter your first name";
    }
    if (!data.lastName) {
      errors.lastName = "Please enter your last name";
    }
    if (!data.email) {
      errors.email = "Please enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!data.password) {
      errors.password = "Please enter a password";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (!data.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  return (
    <div className={styles.authContainer}>
      {loading && <Loader />}
      <div className={styles.authFormContainer}>
        <form onSubmit={handleSubmit} className={styles.authLeftContainer}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <span className={styles.error}>{errors.firstName}</span>
          )}

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <span className={styles.error}>{errors.lastName}</span>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword}</span>
          )}

          <button type="submit">Sign Up</button>
        </form>
        <p style={{ textAlign: "center", color: "#2F2F2F" }}>
          Already have an account?
          <Link href="/login">
            <a className={styles.forgotPassword}> Sign In</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

export async function getStaticProps(context) {
  const apiURL = process.env.API_URL;
  return {
    props: {
      apiURL,
    },
  };
}
