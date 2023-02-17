import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useNavigate } from "react-router-dom";
import { COLORS_SCSS } from "@/assets/dictionary";

const ICON_STYLES = {
    fill: COLORS_SCSS.warning
}

function CreateButton() {
    const navigate = useNavigate()
    const destinyLocation = '/form'

    const handleClick = () => navigate(destinyLocation)
    
    return (
        <IconButton
            onClick={handleClick}
        >
            <AddCircleOutlineIcon fontSize="large" sx={ICON_STYLES} />
        </IconButton>
    )
}

export default CreateButton;