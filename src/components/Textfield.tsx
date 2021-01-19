import React, { ReactElement } from 'react'
import styles from '../styles/core.module.css'

interface Props {
    title: string,
    value: string | undefined,
    type: string,
    fieldValid?: boolean,
    errorMessage?: string,
    onChange: (newValue: string) => void
}


const Textfield: React.FC<Props> = (props) => {
    return (
        <div className={styles.textInputContainer}>
            <div className={styles.label}>{props.title}</div>
            <input 
                type={props.type} 
                value={props.value} 
                onChange={e => props.onChange(e.target.value)} 
                className={props.fieldValid ? styles.textInput : styles.textInputInvalid}/>
            
                <div className={styles.errorLabel}>{props.fieldValid ? null: props.errorMessage}</div>
        </div>
    )
}

Textfield.defaultProps = {
    fieldValid: true,
    errorMessage: ""
}

export default Textfield
