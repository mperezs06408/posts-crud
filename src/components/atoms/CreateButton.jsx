import { useNavigate } from "react-router-dom";

function CreateButton() {
    const navigate = useNavigate()
    const destinyLocation = '/form'

    const handleClick = () => navigate(destinyLocation)
    
    return (
        <button
            onClick={handleClick}
        ></button>
    )
}

export default CreateButton;