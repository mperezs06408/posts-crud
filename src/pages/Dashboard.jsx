import PageLayout from '@components/templates/PageLayout'
import ToolsBar from '@components/molecules/ToolsBar'
import PostsTable from '@components/organisms/PostsTable'
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "@components/templates/Context";
import { DASHBOARD_PAGE as PAGE_DATA } from '@/assets/dictionary';

function Dashboard(){
    const {
        posts
    } = useContext(PostsContext)
    const [postsFiltered, setPostsFiltered] = useState(posts) 
    const [searchedItem, setSearchedItem] = useState('')

    useEffect(()=>{
        setPostsFiltered(posts)
    },[posts])
    useEffect(()=>{
        let newPostsList = posts
        if (searchedItem !== '') {
            newPostsList = newPostsList.filter(post => post.title.includes(searchedItem))
        }

        setPostsFiltered(newPostsList);
    },[searchedItem])

    return(
        <PageLayout
            title={ PAGE_DATA.title }
            subtitle={ PAGE_DATA.subtitle }
        >
            <ToolsBar
                label={ PAGE_DATA.ToolsBarLabel }
                searchedItem={searchedItem}
                handleChange={setSearchedItem}
            />
            <PostsTable 
                data={postsFiltered}
            />
        </PageLayout>
    )
}

export default Dashboard