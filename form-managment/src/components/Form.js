import React, { useState, useEffect } from "react";
import "./form.css";
import * as Yup from "yup";

const Form = (props) => {
  console.log("form prop: ", props);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  const changeHandler = (e) => {
    console.log(e.target.value);
    console.log("user: ", user);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.addNewUser(user);
    console.log("submitted");
    setUser({ name: "", email: "", password: "" });
  };

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email adress peep.")
      .required("Must include yo email please."),
    password: Yup.string()
      .min(6, "Yo, passwords must be at least 6 characters long.")
      .required("Password is required"),
    terms: Yup.boolean().oneOf([true], "You must accept Validation"),
  });
    

    
  useEffect(() => {
      formSchema.isValid(user).then(valid => {
        setUser(!valid);
      });
    },
    [user]);

  const inputChange = (e) => {
    e.persist();

    Yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    terms: "",
  });
  
  return (
    <form className="form" onSubmit={submitForm}>
      {/* <label className="name labels" htmlFor="name">
        Name
      </label> */}
      <input
        id="nameInput"
        type="text"
        name="name"
        placeholder="Name"
        value={user.name}
        onChange={changeHandler}
      />
      {/* <label className="email labels" htmlFor="email">
        Email
      </label> */}
      <input
        id="emailInput"
        type="email"
        name="email"
        placeholder="Email"
        {...(errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null)}
        // value={user.email}
        // onChange={changeHandler}
      />
      {/* <label className="role labels" htmlFor="password">
        Password
      </label> */}
      <input
        id="passInput"
        type="pasword"
        name="password"
        placeholder="Password"
        {...(errors.password.length > 6 ? (
          <p className="error">{errors.email}</p>
        ) : null)}
        // value={user.password}
        // onChange={changeHandler}
      />
      <lable htmlFor="Validation">
        Validate here
        <input
          id="termsInput"
          type="checkbox"
          name="terms"
          onChange={changeHandler}
        />
      </lable>
      <button className="button" type="submit">
        Set up New Login
      </button>
    </form>
  );
};
export default Form;
