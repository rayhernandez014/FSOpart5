const Login = ({ handleLogin, password, username, handleUsernameChange, handlePasswordChange }) => {
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} id="username" onChange={({ target }) => handleUsernameChange(target.value)}/>
        </div>
        <div>
          password
          <input type="password" value={password} id="password" onChange={({ target }) => handlePasswordChange(target.value)}/>
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </>
  )
}

export default Login