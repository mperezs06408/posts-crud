import Dashboard from "@/pages/Dashboard";
import PostForm from "@/pages/PostForm";
import { Routes, Route } from "react-router-dom";

function Router(){
    return(
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/form" element={<PostForm />} />
            <Route path="/form/:slug" element={<PostForm />} />
            <Route path="*" element={<h1>404 error</h1>} />
        </Routes>
    )
}

export default Router;