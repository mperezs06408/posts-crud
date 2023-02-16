function Form({title, handleSubmit, buttons, children}) {
    return(
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form__title">{title}</h2>
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