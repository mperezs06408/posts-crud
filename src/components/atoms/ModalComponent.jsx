import ReactDOM from "react-dom"
import Modal from "@mui/material/Modal"
import Card from "@mui/material/Card"
import '@styles/components/Modal.scss';

function ModalComponent({isOpen, title, subtitle, buttons}){
    const element = document.getElementById('modal')
    return(
        ReactDOM.createPortal(
            <Modal
                open={isOpen}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:'center'
                }}
            >
                    <Card
                        variant="outlined"
                        sx={{
                            maxHeight: '400px'
                        }}
                    >
                        <div className="modal__content">
                            <h2 className="modal__title">{title}</h2>
                            <h3 className="modal__subtitle">{subtitle}</h3>
                        </div>
                        <div className="modal__btns">
                            {buttons}                    
                        </div>
                    </Card>
            </Modal>,
            element
        )
    )
}

export default ModalComponent