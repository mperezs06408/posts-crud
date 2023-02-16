import Label from '@components/atoms/Label'
import Input from '@components/atoms/Input'
import CreateButton from '@components/atoms/CreateButton'
import InputContainer from '@components/molecules/InputContainer'
import { useContext } from 'react'
import { PostsContext } from '@components/templates/Context'

const COMPONENTS_PROPERTIES = {
    label: {
        className: 'toolsbar__label'
    },
    input: {
        type: 'text',
        className: 'toolsbar__input'
    }
}

function ToolsBar({id, label}){
    const {
        searchBar,
        handleSearchBarChange
    } = useContext(PostsContext);

    return(
        <section className="toolsbar">
            <InputContainer>
                <Label 
                    htmlFor={id}
                    label={label}
                    className={COMPONENTS_PROPERTIES.label.className}
                />
                <Input 
                    type={COMPONENTS_PROPERTIES.input.type}
                    id={id}
                    value={searchBar}
                    handleChange={handleSearchBarChange}
                    className={COMPONENTS_PROPERTIES.input.className}
                />
            </InputContainer>
            <CreateButton />
        </section>
    )
}

export default ToolsBar;