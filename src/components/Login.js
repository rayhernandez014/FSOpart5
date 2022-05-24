const Login = ({ handleLogin, password, username, handleUsernameChange, handlePasswordChange }) => {
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="Username" onChange={({ target }) => handleUsernameChange(target.value)}/>
        </div>
        <div>
          password
          <input type="password" value={password} name="Password" onChange={({ target }) => handlePasswordChange(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default Login