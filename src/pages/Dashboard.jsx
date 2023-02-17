import PageLayout from '@components/templates/PageLayout'
import ToolsBar from '@components/molecules/ToolsBar'
import CollapseAlert from '@components/molecules/CollapseAlert';
import PostsTable from '@components/organisms/PostsTable'
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "@components/templates/Context";
import { DASHBOARD_PAGE as PAGE_DATA } from '@/assets/dictionary';

function Dashboard(){
    const {
        posts,
        setPosts
    } = useContext(PostsContext)
    const [postsFiltered, setPostsFiltered] = useState(posts) 
    const [searchedItem, setSearchedItem] = useState('')
    const [alert, setAlert] = useState({
        value: false,
        label: ''
    })
    const [order,setOrder] = useState('asc')

    useEffect(()=>{
        setPostsFiltered(posts)
    },[posts])
    useEffect(()=>{
        let newPostsList = posts
        if (searchedItem !== '') {
            newPostsList = newPostsList.filter(post => post.title.toLowerCase().includes(searchedItem.toLowerCase()))
        }

        setPostsFiltered(newPostsList);
    },[searchedItem])

    const manageOrderTable = (orderBy) => {
        const newPostList = [...postsFiltered].sort((a,b) =>{
            if (orderBy === 'asc') {
                return a.id - b.id
            }
            return b.id - a.id
        });

        setPosts(newPostList);
    }

    const handleOrder = () => {
        const state = order === 'asc' ? 'desc' : 'asc';
  
        manageOrderTable(state);
        setOrder(state)
      }

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
                order={order}
                handleOrder={handleOrder}
                setAlert={setAlert}

            />
        </PageLayout>
    )
}

export default Dashboard