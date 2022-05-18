const BlogForm = ({title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange, handleBlogCreation}) => {
  return (
    <>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <input type="text" value={title} name="title" onChange={({ target }) => handleTitleChange(target.value)}/>
        </div>
        <div>
          author:
          <input type="text" value={author} name="author" onChange={({ target }) => handleAuthorChange(target.value)}/>
        </div>
        <div>
          url:
          <input type="text" value={url} name="url" onChange={({ target }) => handleUrlChange(target.value)}/>
        </div>
      
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm