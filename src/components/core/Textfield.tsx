import React, { CSSProperties } from 'react'
import styles from '../../styles/core.module.css'

interface Props {
    title: string,
    value: string | undefined,
    type?: string,
    fieldValid?: boolean,
    errorMessage?: string,
    onChange: (newValue: string) => void,
    styles?: TextfieldStyles
}

interface TextfieldStyles {
    container?: CSSProperties | undefined,
    input?: CSSProperties | undefined,
    label?: CSSProperties | undefined,
    error?: CSSProperties | undefined
}

const Textfield: React.FC<Props> = (props) => {
    return (
        <div className={styles.textInputContainer}
        style={props.styles?.container}>
            <div className={styles.label}
            style={props.styles?.label}>
                {props.title}
            </div>
            <input 
                type={props.type} 
                value={props.value} 
                onChange={e => props.onChange(e.target.value)} 
                className={props.fieldValid ? styles.textInput : styles.textInputInvalid}
                style={props.styles?.input}/>
            
                <div className={styles.errorLabel}
                    style={props.styles?.error}>
                    {props.fieldValid ? null: props.errorMessage}
                </div>
        </div>
    )
}

Textfield.defaultProps = {
    fieldValid: true,
    errorMessage: "",
    type: 'text'
}

export default Textfield
