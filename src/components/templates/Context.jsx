import { getAllPosts } from '@/api/APIConsume';
import { useState, useEffect, createContext } from "react";

export const PostsContext = createContext()

const PostsProvider = ({children}) => {
  const [posts, setPosts] = useState([])
  const [postsFiltered, setPostsFiltered] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchBar, setSearchBar] = useState('')

  useEffect(() => {
    if (posts.length === 0) {
      setPostFromServer();
    }
    console.log('reload')
  }, []);

  useEffect(() => {
    let postsFiltered = posts

    if (searchBar) {
      postsFiltered = postsFiltered.filter(post => post.title.includes(searchBar) )
    }

    setPostsFiltered(postsFiltered);
  }, [posts, searchBar])

  const initRow = () => page * rowsPerPage;
  const finishRow = () => (rowsPerPage * page) + rowsPerPage;
  
  const setPostFromServer = async (page, rowsPerPage) => {
    const postsFromServer = await getAllPosts();

    setPosts(postsFromServer.data)
    setPostsFiltered(postsFromServer.data)
  }

  const handleSearchBarChange = (e) => {
    setSearchBar(e.target.value);
  }

  const context = {
    posts,
    postsFiltered,
    setPosts,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    initRow,
    finishRow,
    searchBar,
    handleSearchBarChange
  }
  return(
    <PostsContext.Provider value={context}>
      {children}
    </PostsContext.Provider>
  )
}

export default PostsProvider;