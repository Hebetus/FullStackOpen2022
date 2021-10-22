import React from 'react'
import { useSelector } from 'react-redux'

const Notification = ({ visibility }) => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }


  return (visibility ? 
    <div style={style}>
      {notification}
    </div>
    :
    <div>

    </div>
  )
}

export default Notification