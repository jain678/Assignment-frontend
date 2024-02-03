import React, { useState } from "react";
import classes from "./SignUpStartup.module.css";
import Modal from "../UI/Modal";

function SignUpStartup(props) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [revenue, setRevenue] = useState(0);
  const [password, setPassword] = useState('');

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const companyNameHandler = (event) => {
    setCompanyName(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  }
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const revenueHandler = (event) => {
    setRevenue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const companyData = {
      username: email,
      email: email,
      password: password,
      company_name: companyName,
      business_description: description,
      revenue: revenue,
    };

    fetch("http://127.0.0.1:8000/api/create_startup/", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(companyData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data posted successfully: ", data);
      })
      .catch((error) => {
        console.log("Error posting data", error);
      });

    setEmail("");
    setPassword("");
    setCompanyName("");
    setDescription("");
    setRevenue(0);
  };
  return (
    <Modal>
      <form onSubmit={submitHandler}>
        <div className={classes["control-group"]}>
          <div className={classes["form-control"]}>
            <label htmlFor="username">Username </label>
            <input
              type="email"
              id="username"
              onChange={emailHandler}
              value={email}
            />

            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              onChange={passwordHandler}
              value={password}
            />

            <label htmlFor="name">Company Name</label>
            <input
              type="text"
              id="name"
              onChange={companyNameHandler}
              value={companyName}
            />


            <label htmlFor="desc">Business Description</label>
            <input
              type="text"
              id="desc"
              onChange={descriptionHandler}
              value={description}
            />

            <label htmlFor="revenue">Revenue</label>
            <input
              type="number"
              id="revenue"
              min="0"
              step="any"
              onChange={revenueHandler}
              value={revenue}
            />

            <div className={classes["form-actions"]}>
              <button type="submit">Sign Up</button>
              <button onClick={props.onClose}>Close</button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default SignUpStartup;
