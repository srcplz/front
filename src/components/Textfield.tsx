import React, { ReactElement } from 'react'
import styles from '../styles/core.module.css'

interface Props {
    title: string,
    value: string | undefined,
    type: string,
    onChange: (newValue: string) => void
}

function Textfield(props: Props): ReactElement {
    return (
        <div className={styles.textInputContainer}>
            <div className={styles.label}>{props.title}</div>
            <input type="text" value={props.value} onChange={e => props.onChange( e.target.value)} className={styles.textInput}/>
        </div>
    )
}

export default Textfield
