import React, { Component } from 'react'
import styles from '../styles/core.module.css'

interface Props {
    onClick: Function
}

export default class LoginModal extends Component<Props> {

    render() {
        return (
            <div className={styles.modal}>
                <button onClick={e => this.props.onClick()}>Click</button>
            </div>
        )
    }
}
