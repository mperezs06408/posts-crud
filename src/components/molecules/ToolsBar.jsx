import Input from '@mui/material/Input'
import CreateButton from '@components/atoms/CreateButton'
import '@styles/components/Toolsbar.scss'
import { COLORS_SCSS } from '@/assets/dictionary'

const Input_Styles = {backgroundColor: COLORS_SCSS.white, width: '100%'}

function ToolsBar({id, searchedItem, handleChange, label}){

    const onChange = (e) => {
        handleChange(e.target.value)
    }

    return(
        <section className="toolsbar">
            <Input 
                id={id}
                placeholder={label}
                value={searchedItem}
                onChange={onChange}
                variant='standard'
                sx={Input_Styles}
            />
            <CreateButton />
        </section>
    )
}

export default ToolsBar;