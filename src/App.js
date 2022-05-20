import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect( () => {
    const fetchData = async () => {
      const returned_blogs = await blogService.getAll()
      setBlogs( returned_blogs )
    }

    fetchData()

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
      const receivedUser = await loginService.login({ username, password })

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

  const createBlog = async (newBlog) => {

    try{

      blogFormRef.current.toggleVisibility()

      const returnedBlog = await blogService.create(newBlog)

      setNotificationMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} has been added`)
      setNotificationType('information')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 5000)

      setBlogs(blogs.concat(returnedBlog))

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

  const increaseLikes = async (id) => {

    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes+1 }

    try {
      const retunedBlog = await blogService.update(id,changedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : retunedBlog))
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

  const removeBlog = async (id) => {

    const foundBlog = blogs.find((blog) => {
      return blog.id === id
    })

    if (window.confirm(`are you sure you want to remove ${foundBlog.title} by ${foundBlog.author}?`)){

      try{
        await blogService.remove(id)
        setBlogs(blogs.filter(b => b.id !== id))
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
  }

  const displayBlogs = () => {
    const temp_blogs = [...blogs]
    temp_blogs.sort((item1, item2) => {
      if (item1.likes > item2.likes){
        return -1
      }
      else if (item1.likes < item2.likes){
        return 1
      }
      return 0
    })

    return (
      temp_blogs.map(blog =>
        <Blog key={blog.id} blog={blog} increaseLikes={() => increaseLikes(blog.id)} removeBlog={() => removeBlog(blog.id)} isOwner={blog.user?.username === user.username}/>
      )
    )
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
      <Togglable buttonLabel = 'new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog}/>
      </Togglable>
      {displayBlogs()}
    </div>
  )
}

export default App
