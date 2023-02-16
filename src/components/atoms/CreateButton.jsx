import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useNavigate } from "react-router-dom";

function CreateButton() {
    const navigate = useNavigate()
    const destinyLocation = '/form'

    const handleClick = () => navigate(destinyLocation)
    
    return (
        <IconButton
            onClick={handleClick}
        >
            <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
    )
}

export default CreateButton;