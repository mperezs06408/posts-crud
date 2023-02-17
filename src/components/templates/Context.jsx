import { getAllPosts } from '@/api/APIConsume';
import { useState, useEffect, createContext } from "react";

export const PostsContext = createContext()

const PostsProvider = ({children}) => {
  const [posts, setPosts] = useState([])
  const [postsDeleted, setPostsDeleted] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  
  useEffect(() => {
      setPostFromServer();
    console.log('reload')
  }, []);

  const initRow = () => page * rowsPerPage;
  const finishRow = () => (rowsPerPage * page) + rowsPerPage;
  
  const setPostFromServer = async () => {
    try {
      const postsFromServer = await getAllPosts();
  
      setPosts(postsFromServer.data)
    } catch(e) {
      console.error(`Error during fetching posts: ${e}`)
    }
  }

  const setPost = (newPost) => {
    newPost.id = posts.length + postsDeleted + 1;
    const postListCopy = [...posts]

    postListCopy.unshift(newPost)
    setPosts(postListCopy)

    return newPost.id
  }
  const updatePost = (idPost, postContent) => {
    const post = posts.find(post => post.id === parseInt(idPost))

    if (post) {
      const postIndexOf = posts.indexOf( post )
      const postListCopy = [...posts]
      const newPost = {
          ...post,
          ...postContent
      }
      postListCopy[postIndexOf] = newPost
      setPosts(postListCopy) 
      return true
    }
    return false
  }
  const dropPostFromList = (id) => {
    const postListCopy = [...posts]

    setPosts(postListCopy.filter( post => post.id !== id));
    setPostsDeleted(postsDeleted + 1)

    return id
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const context = {
    posts,
    setPosts,
    setPost,
    updatePost,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    initRow,
    finishRow,
    handleChangePage,
    handleChangeRowsPerPage,
    dropPostFromList
  }
  return(
    <PostsContext.Provider value={context}>
      {children}
    </PostsContext.Provider>
  )
}

export default PostsProvider;