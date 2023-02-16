import Router from "@/router/Router";
import PostsProvider from "./components/templates/Context";
import { BrowserRouter, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <PostsProvider>
        <Router />
      </PostsProvider>
    </BrowserRouter>
  )
}

export default App
