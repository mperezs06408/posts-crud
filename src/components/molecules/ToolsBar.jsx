import CreateButton from '@components/atoms/CreateButton'
import Input from '@mui/material/Input'
import { useContext } from 'react'
import { PostsContext } from '@components/templates/Context'
import '@styles/components/Toolsbar.scss'


function ToolsBar({id, label}){
    const {
        searchBar,
        handleSearchBarChange
    } = useContext(PostsContext);

    return(
        <section className="toolsbar">
            <Input 
                id={id}
                placeholder={label}
                value={searchBar}
                onChange={handleSearchBarChange}
                variant='standard'
                sx={{backgroundColor: '#ffffff', width: '100%'}}
            />
            <CreateButton />
        </section>
    )
}

export default ToolsBar;