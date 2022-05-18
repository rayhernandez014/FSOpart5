import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationType, setNotificationType] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')    
    if (loggedUserJSON) {      
      const storedUser = JSON.parse(loggedUserJSON)      
      blogService.setToken(storedUser.token)
      setUser(storedUser)      
    }  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const receivedUser = await loginService.login({username, password})

      setNotificationMessage(`you logged in as ${receivedUser.name}!`)
      setNotificationType('information')
      setTimeout(() => {          
        setNotificationMessage(null)
        setNotificationType(null)        
      }, 5000)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(receivedUser))
      blogService.setToken(receivedUser.token)
      setUser(receivedUser)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setNotificationMessage(exception.response.data.error)
      setNotificationType('error')
      setTimeout(() => {          
        setNotificationMessage(null)
        setNotificationType(null)        
      }, 5000)
    }
    
  }

  const handleUsernameChange = (value) => {
    setUsername(value)
  }

  const handlePasswordChange = (value) => {
    setPassword(value)
  }

  const handleLogout = () => {

    setNotificationMessage(`user ${user.name} has logged out!`)
    setNotificationType('information')
    setTimeout(() => {          
      setNotificationMessage(null)
      setNotificationType(null)        
    }, 5000)

    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleTitleChange = (value) => {
    setTitle(value)
  } 

  const handleAuthorChange = (value) => {
    setAuthor(value)
  }

  const handleUrlChange = (value) => {
    setUrl(value)
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try{
      const returnedBlog = await blogService.create(newBlog)

      setNotificationMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} has been added`)
      setNotificationType('information')
      setTimeout(() => {          
        setNotificationMessage(null)
        setNotificationType(null)        
      }, 5000)

      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    }
    catch (exception){

      setNotificationMessage(exception.response.data.error)
      setNotificationType('error')
      setTimeout(() => {          
        setNotificationMessage(null)
        setNotificationType(null)        
      }, 5000)

    }

  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} type={notificationType} />
        <Login handleLogin={handleLogin} password={password} username={username} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <p>{user.name} logged in <button type='button' onClick={handleLogout}>log out</button></p>
      <h3>create a new</h3>
      <BlogForm title={title} author={author} url={url} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} handleBlogCreation={handleBlogCreation}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}    
    </div>
  )
}

export default App
