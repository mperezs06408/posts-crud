import { Alert } from "@mui/material";
import { Collapse } from "@mui/material";

const COLLAPSE_STYLES = {
    marginBottom: '10px'
}

function CollapseAlert({openAlert, setAlert, label}){
    const handleChange = () => {
        setAlert({
            value: !openAlert,
            label: ''
        })
    }
    
    return (
        <Collapse
            in={openAlert}
            sx={COLLAPSE_STYLES}
        >
            <Alert
                onClose={handleChange}
            >
                { label }
            </Alert>
        </Collapse>
    )
}

export default CollapseAlert;