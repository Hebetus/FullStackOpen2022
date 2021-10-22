import React from 'react'


const Button = (props) => {
    return(
      <button onClick={props.handleClick} id={props.id} >{props.text}</button>
    )
  }

  export default Button