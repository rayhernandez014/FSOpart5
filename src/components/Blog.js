import { useState } from 'react'

const Blog = ({ blog, increaseLikes, removeBlog, isOwner }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenOwner = { display: isOwner ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='main'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}> view </button>
      </div>
      <div style={showWhenVisible} className='details'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}> hide </button>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={increaseLikes}> like </button></p>
        <p> {blog.user?.name}</p>
        <button style={showWhenOwner} onClick={removeBlog}> remove </button>
      </div>

    </div>
  )
}

export default Blog