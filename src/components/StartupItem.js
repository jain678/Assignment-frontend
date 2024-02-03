import React from 'react'
import classes from "./StartupItem.module.css"

function StartupItem(props) {

  const clickHandler = () => {
    fetch('')
  }

  return (
    <div className={classes.container}>
    <div className={classes.column}>
      <h3>{props.company_name}</h3>
    </div>
    <div className={classes.column}>
      <p>{props.description}</p>
    </div>
    <div className={classes.column}>
      <h4>{props.revenue}</h4>
    </div>
    <div className={classes.column}>
      <button onClick={clickHandler}>Interested</button>
    </div>
  </div>
  
  )
}

export default StartupItem