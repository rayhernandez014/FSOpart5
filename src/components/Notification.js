const Notification = ({ message, type }) => {
  if (!message || !type) {
    return null
  }

  else{
    const notificationStyle = {
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    if (type === 'error'){
      notificationStyle.color = 'red'
    }
    else if (type === 'information'){
      notificationStyle.color = 'green'
    }
    return (
      <div style={notificationStyle} className="notification">
        {message}
      </div>
    )
  }
}

export default Notification