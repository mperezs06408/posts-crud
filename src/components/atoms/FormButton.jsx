import Button from '@mui/material/Button'
import { COLORS_SCSS } from '@/assets/dictionary';

const BUTTON_STYLES = {
    submit: {
        backgroundColor: COLORS_SCSS.primary,
        color: COLORS_SCSS.secondary
    },
    button: {
        backgroundColor: COLORS_SCSS.white,
        color: COLORS_SCSS.primary
    },
    delete: {
        backgroundColor: COLORS_SCSS.warning,
        color: COLORS_SCSS.white
    }
}

function FormButton({id, type, label, onClick}){
    return(
        <Button
            id={id}
            type={type === 'submit' || type === 'delete' ? 'submit' : 'button'}
            variant={type === 'submit' || type === 'delete' ? 'contained' : 'text'}
            sx={BUTTON_STYLES[`${type}`]}
            onClick={onClick}
        >
            {label}
        </Button>
    )
}

export default FormButton;