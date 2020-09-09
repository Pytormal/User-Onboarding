import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
  name: yup.string().required("Name required"),
  email: yup.string().email("email needed").required("must include email"),
  password: yup
    .string()
    .min(6, "passwrod needs to be more than 6 characters long")
    .required("password needed"),
  terms: yup.boolean().oneOf([true], "please validate"),
});
export default function Form() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const [errState, setErrState] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  const validate = (e) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrState({
          ...errState,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrState({
          ...errState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    e.persist();
    validate(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted for review");
    axios
      .post("https://reqres.in/api/users", formState)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          value={formState.name}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="email">
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={inputChange}
        />
        {errState.email.length < 0 ? (
          <p ClassName="error">{errState.email}</p>
        ) : null}
      </label>
      <label htmlFor="password">
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={inputChange}
        />
        {errState.password.length > 6 ? (
          <p ClassName="error">{errState.password}</p>
        ) : null}
      </label>
      <label htmlFor="validate">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
        Validate Here
        {errState.terms.length > 0 ? (
          <p className="error">{errState.terms}</p>
        ) : null}
      </label>
      <button disabled={buttonDisabled}>Submit</button>
    </form>
  );
}
