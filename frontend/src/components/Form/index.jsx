import React, { useState } from "react";
import Input from "../Input";
import "./Form.css";

const FormPage = ({ children }) => {
  const hasMoreThanOneChild = children.length > 1;
  return (
    <div>
      {hasMoreThanOneChild
        ? children.map((child, i) => {
            return <React.Fragment key={i}>{child}</React.Fragment>;
          })
        : children}
    </div>
  );
};

const GetBody = (
  formData,
  setFormData,
  errors,
  setErrors,
  page = formData
) => {
  const items = [];
  let i = 0;
  for (const key in page) {
    const handleOnChange = (e) => {
      if (e.target) {
        const { name, value } = e.target;
        setErrors({});
        setFormData((prevState) => ({
          ...prevState,
          [name]: { value },
        }));
      }
    };

    items.push(
      <div key={key} style={{ position: "relative" }}>
        <Input
          id={key}
          placeholder={key[0].toUpperCase() + key.slice(1)}
          value={formData[key]?.value ?? ""}
          onChange={handleOnChange}
          error={errors[key]}
        />
        {errors[key] && <p className="error">{errors[key]}</p>}
      </div>
    );
    i++;
  }

  return <FormPage key={i}>{items}</FormPage>;
};

const Form = ({ formState }) => {
  const [formData, setFormData] = useState(formState);
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(0);
  const hasPages = formData.pages && formData.pages.length > 1;
  let body = [];

  if (hasPages) {
    for (const page of formData.pages) {
      body.push(GetBody(formData, setFormData, errors, setErrors, page));
    }
  } else {
    body.push(GetBody(formData, setFormData, errors, setErrors));
  }

  const pageLeft = (e) => {
    e.preventDefault();
    if (page > 0) {
      setErrors({});
      setPage(page - 1);
    }
  };

  const pageRight = (e) => {
    e.preventDefault();
    setErrors({});
    let pass = true;

    const body = formData.pages[page];
    for (const key in body) {
      if (body[key].msg) {
        if (!formData[key]?.value) {
          pass = false;
          setErrors((prevErrors) => ({
            ...prevErrors,
            [key]: body[key].msg,
          }));
        }
      }
    }

    if (pass && page < formData.pages.length - 1) {
      setPage(page + 1);
    }
  };

  return (
    <form>
      {body.map((child, i) => (
        <React.Fragment key={i}>{i === page && child}</React.Fragment>
      ))}
      {hasPages && (
        <>
          <button onClick={pageLeft}>{"<"}</button>
          <button onClick={pageRight}>{">"}</button>
        </>
      )}
    </form>
  );
};

export default Form;
