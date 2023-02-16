import PageLayout from '@components/templates/PageLayout'
import ToolsBar from '@components/molecules/ToolsBar'
import PostsTable from '@components/organisms/PostsTable'

function Dashboard(){
    return(
        <PageLayout
            title='Posts published'
        >
            <ToolsBar
                label='Search by title'
            />
            <PostsTable>

            </PostsTable>
        </PageLayout>
    )
}

export default Dashboard