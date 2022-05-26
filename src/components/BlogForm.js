import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleTitleChange = (value) => {
    setTitle(value)
  }

  const handleAuthorChange = (value) => {
    setAuthor(value)
  }

  const handleUrlChange = (value) => {
    setUrl(value)
  }

  const handleBlogCreation = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h3>create a new</h3>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <input type="text" value={title} id="title" onChange={({ target }) => handleTitleChange(target.value)}/>
        </div>
        <div>
          author:
          <input type="text" value={author} id="author" onChange={({ target }) => handleAuthorChange(target.value)}/>
        </div>
        <div>
          url:
          <input type="text" value={url} id="url" onChange={({ target }) => handleUrlChange(target.value)}/>
        </div>

        <button type="submit"id="create-button">create</button>
      </form>
    </>
  )
}

export default BlogForm