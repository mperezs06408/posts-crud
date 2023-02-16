import '@styles/components/Form.scss'

function Form({title, handleSubmit, buttons, children}) {
    return(
        <form className="form" onSubmit={handleSubmit}>
            <h3 className="form__title">{title}</h3>
            <div className="form__inputs">
                { children }
            </div>
            <div className="form__buttons">
                { buttons }
            </div>
        </form>
    )
}

export default Form;