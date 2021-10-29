import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  const message = notification[1]
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }


  return (notification[0] ? 
    <div style={style}>
      {message}
    </div>
    :
    <div>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification