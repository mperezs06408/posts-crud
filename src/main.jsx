import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { useState, createContext } from "react";

const app = document.getElementById('root');
const root = ReactDOM.createRoot(app);


export const PostsContext = createContext()

const PostsProvider = ({children}) => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const context = {
    posts,
    setPosts,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage
  }
  return(
    <PostsContext.Provider value={context}>
      {children}
    </PostsContext.Provider>
  )
}


root.render(
  <PostsProvider>
    <App />
  </PostsProvider>
)