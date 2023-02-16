function Label({htmlFor, label, className}){
    return(
        <label htmlFor={htmlFor} className={className}>{label}</label>
    )
}

export default Label;