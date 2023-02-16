import PageLayout from '@components/templates/PageLayout'
import ToolsBar from '@components/molecules/ToolsBar'
import PostsTable from '@components/organisms/PostsTable'

const PAGE_DATA = {
    title: 'Posts Published',
    ToolsBarLabel: 'Search by Title'
}
function Dashboard(){
    return(
        <PageLayout
            title={ PAGE_DATA.title }
        >
            <ToolsBar
                label={ PAGE_DATA.ToolsBarLabel }
            />
            <PostsTable />
        </PageLayout>
    )
}

export default Dashboard