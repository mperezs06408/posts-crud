function Input({type, id, value, handleChange, className}) {
    return(
        <input id={id} name={id} type={type} value={value} onChange={handleChange} className={className} />
    )
}

export default Input;