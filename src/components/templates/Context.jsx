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
    setPostFromServer();
    console.log('reload')
  }, []);

  useEffect(() => {
    const postsFilterByElement = posts.filter(post => post.title.includes(searchBar) )

    setPostsFiltered(postsFilterByElement);
  }, [searchBar])

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