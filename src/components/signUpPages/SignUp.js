import React, { useState } from "react";
// import Button from '../UI/Button'
import classes from "./SignUp.module.css";
import Modal from "../UI/Modal";
import SignUpInvestor from "./SignUpInvestor";
import SignUpStartup from "./SignUpStartup";

function SignUp(props) {
  const [showInvestorPage, setShowInvestorPage] = useState(false);
  const [showStartupPage, setShowStartupPage] = useState(false);

  const showInvestorPageHandler = () => {
    setShowStartupPage(false);
    setShowInvestorPage(true);
  };
  const hideInvestorPageHandler = () => {
    setShowInvestorPage(false);
  };
  const showStartupPageHandler = () => {
    setShowInvestorPage(false);
    setShowStartupPage(true);
  };
  const hideStartupPageHandler = () => {
    setShowStartupPage(false);
  };

  return (
    <Modal>
      <div className={classes.container}>
      {showInvestorPage && <SignUpInvestor onClose={hideInvestorPageHandler} />}
      <div className={classes.button1}>
        <button onClick={showInvestorPageHandler}>Sign up as Investor</button>
      </div>
      {showStartupPage && <SignUpStartup onClose={hideStartupPageHandler} />}
      <div className={classes.button1}>
        <button onClick={showStartupPageHandler}>Sign up as Startup</button>
      </div>
      <div className={classes.button3}>
        <button onClick={props.onClose}>Close</button>
      </div>
      </div>
    </Modal>
  );
}

export default SignUp;
