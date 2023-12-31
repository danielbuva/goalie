import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../store/session";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import LoginForm from "../LoginForm";
import Arrow from "../icons/Arrow";
import Input from "../Input";

import "./SignupForm.css";

function isValidEmail(email) {
  // Regular expression pattern for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Use the test() method to check if the email matches the pattern
  return emailRegex.test(email);
}

function SignupForm({ reroute }) {
  const formState = [
    {
      name: { value: "", msg: "name is required" },
      email: { value: "", msg: "email is required" },
    },
    { username: { value: "", msg: "username is required" } },
    {
      password: { value: "", msg: "password is required" },
      confirmPassword: { value: "", msg: "confirm password" },
    },
  ];

  const [formData, setFormData] = useState(formState);
  const [errors, setErrors] = useState({});
  const [pageIndex, setPageIndex] = useState(0);

  const { closeModal, setContent } = useModal();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let pass = true;
    if (!formData[2].password.value) {
      pass = false;
      setErrors({
        password: "password required",
      });
    }

    if (!formData[2].confirmPassword.value) {
      pass = false;
      return setErrors((prevState) => ({
        ...prevState,
        confirmPassword: "confirm your password",
      }));
    }

    if (formData[2].password.value !== formData[2].confirmPassword.value) {
      pass = false;
      return setErrors({
        confirmPassword: "passwords must match",
      });
    }

    if (pass) {
      const data = await dispatch(
        signUp({
          email: formData[0].email.value,
          name: formData[0].name.value,
          password: formData[2].password.value,
          username: formData[1].username.value,
        })
      );
      if (data) {
        setErrors(data);
      } else {
        if (reroute) {
          navigate("/home");
        }
        closeModal();
      }
    }
  };

  const pageLeft = (e) => {
    e.preventDefault();
    if (pageIndex > 0) {
      setErrors({});
      setPageIndex(pageIndex - 1);
    }
  };

  const pageRight = async (e) => {
    e.preventDefault();
    setErrors({});
    let pass = true;

    const currentPage = formData[pageIndex];
    for (const key in currentPage) {
      if (!formData[pageIndex][key]?.value) {
        pass = false;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [key]: currentPage[key].msg,
        }));
      }
    }

    const emailVal = formData[0].email.value;

    if (pageIndex === 0 && emailVal) {
      if (!isValidEmail(emailVal)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "invalid email",
        }));
        return;
      }

      const res = await fetch("/api/auth/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailVal,
        }),
      });

      if (res.status === 409) {
        pass = false;
        const data = await res.json();
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: data.email,
        }));
      }
    }

    if (pageIndex === 1 && formData[1].username.value) {
      const res = await fetch("/api/auth/username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData[1].username.value,
        }),
      });

      if (res.status === 409) {
        pass = false;
        const data = await res.json();
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: data.username,
        }));
      }
    }

    if (pass && pageIndex < formData.length - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleOnChange = (name, value) => {
    setErrors({});
    setFormData((prevState) => {
      const updatedFormState = [...prevState];
      updatedFormState[pageIndex] = {
        ...updatedFormState[pageIndex],
        [name]: { value, msg: updatedFormState[pageIndex][name]?.msg },
      };
      return updatedFormState;
    });
  };

  const header =
    pageIndex === 0
      ? "Create your account"
      : pageIndex === 1
      ? "What should we call you?"
      : "Secure your account";

  return (
    <form onSubmit={handleSubmit} className="signup">
      <div className="pages">
        <h2 id="signup-header">{header}</h2>
        {formData.map((fields, i) => {
          return i === pageIndex ? (
            <Fields
              key={i}
              formData={formData}
              errors={errors}
              page={fields}
              handleOnChange={handleOnChange}
              pageIndex={pageIndex}
            />
          ) : null;
        })}
        {pageIndex === 2 && (
          <button type="submit" id="signup-button">
            Sign Up
          </button>
        )}
      </div>
      <div className="page-buttons">
        <div className="signup-or">
          <p>or</p>
          <p onClick={() => setContent(<LoginForm />)} id="signup-login">
            Login
          </p>
        </div>
        <button
          onClick={pageLeft}
          disabled={pageIndex === 0}
          className="page-button"
          style={{ marginLeft: "51px" }}
        >
          <Arrow disabled={pageIndex === 0} className="has-background" />
        </button>
        <button
          onClick={pageRight}
          disabled={pageIndex === 2}
          className="page-button"
        >
          <Arrow
            dir="right"
            disabled={pageIndex === 2}
            className="has-background"
          />
        </button>
      </div>
    </form>
  );
}

function Fields({ formData, errors, page, handleOnChange, pageIndex }) {
  const fields = [];

  for (const key in page) {
    const handleFieldChange = (e) => {
      const { name, value } = e.target;
      handleOnChange(name, value);
    };
    const autoComplete =
      key === "confirmPassword" ? "new-password" : undefined;
    fields.push(
      <div key={key} style={{ position: "relative" }}>
        <Input
          id={key}
          placeholder={key[0].toUpperCase() + key.slice(1)}
          value={formData[pageIndex][key]?.value ?? ""}
          onChange={handleFieldChange}
          error={errors[key]}
          autoComplete={autoComplete}
        />
        {errors[key] && <p className="error">{errors[key]}</p>}
      </div>
    );
  }

  return fields.map((field, i) => (
    <React.Fragment key={i}>{field}</React.Fragment>
  ));
}

export default SignupForm;
