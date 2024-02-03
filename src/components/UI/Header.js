import React, { useState } from "react";
import classes from "./Header.module.css";
import SignUp from "../signUpPages/SignUp";
import logo from '../../fundrev.png'

function Header() {
  const [showSignUpPage, setShowSignUpPage] = useState(false);

  const showPageHandler = () => {
    setShowSignUpPage(true);
  };
  const hidePageHandler = () => {
    setShowSignUpPage(false);
  };

  return (
    <>
      <div className={classes.container}>
        <h1>Fundrev</h1>
        {showSignUpPage && <SignUp onClose={hidePageHandler} />}
        <button className={classes.btn} onClick={showPageHandler}>
          Sign up
        </button>
      </div>
      <div className={classes.image}>
        <img src={logo} alt="fundrev"/>
      </div>
    </>
  );
}

export default Header;
