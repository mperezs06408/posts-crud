import PageLayout from '@components/templates/PageLayout'
import ToolsBar from '@components/molecules/ToolsBar'
import CollapseAlert from '@components/molecules/CollapseAlert';
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
    const [alert, setAlert] = useState({
        value: false,
        label: ''
    })

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
            <CollapseAlert 
                openAlert={alert.value}
                setAlert={setAlert}
                label={alert.label}
            />
            <PostsTable 
                data={postsFiltered}
                setAlert={setAlert}
            />
        </PageLayout>
    )
}

export default Dashboard