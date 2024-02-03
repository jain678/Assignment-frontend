import React, { useState } from "react";
import classes from "./SignUpInvestor.module.css";
import Modal from "../UI/Modal";

function SignUpInvestor(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const investorData = {
      username: email,
      email: email,
      password: password,
    };

    fetch("http://127.0.0.1:8000/api/create_investor/", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(investorData),
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
  };

  return (
    <Modal>
      <form onSubmit={submitHandler}>
        <div className={classes["control-group"]}>
          <div className={classes["form-control"]}>
            <label htmlFor="userId">UserID: </label>
            <input
              type="email"
              id="userId"
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

export default SignUpInvestor;
