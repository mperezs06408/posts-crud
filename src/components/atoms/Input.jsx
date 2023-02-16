function Input({type, id, value, handleChange, className, refs = {}}) {
    return(
        <input id={id} name={id} type={type} value={value} onChange={handleChange} className={`input ${className}`} {...refs} />
    )
}

export default Input;