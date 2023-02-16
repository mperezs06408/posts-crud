import Button from '@mui/material/Button'

function FormButton({id, type, label, onClick}){
    return(
        <Button
            id={id}
            type={type}
            variant={type === 'submit' ? 'contained' : 'text'}
            onClick={onClick}
        >
            {label}
        </Button>
    )
}

export default FormButton;