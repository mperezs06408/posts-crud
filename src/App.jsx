import Router from "@/router/Router";
import PostsProvider from "./components/templates/Context";
import { BrowserRouter, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <PostsProvider>
        <Link to='/form'>FOrm</Link>
        <Link to='/'>home</Link>
        <Router />
      </PostsProvider>
    </BrowserRouter>
  )
}

export default App
