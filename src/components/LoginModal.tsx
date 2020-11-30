import React, { Component } from 'react'
import styles from '../styles/core.module.css'
import modalStyles from '../styles/modal.module.css'
import Modal from './Modal'
import Textfield from './Textfield'

interface Props {
    onClickOutside: Function
}

interface LoginModalState {
    email: string|undefined,
    password:string|undefined,
}

export default class LoginModal extends Component<Props, LoginModalState> {
    public state: LoginModalState = {
        email: undefined,
        password: undefined
    }

    componentDidMount() {
        this.setEmail = this.setEmail.bind(this)
    }

    render() {
        return (
            <Modal closingFunction={this.props.onClickOutside}>
                <div className={modalStyles.title}>Log in</div>
                <Textfield type={"text"} value={this.state.email} onChange={this.setEmail} title={"E-mail"}/>
                <Textfield type={"password"} value={this.state.password} onChange={this.setPassword} title={"Password"}/>
                <button onClick={e => this.props.onClickOutside} className={styles.button}>Log in</button>
                <button className={modalStyles.signUpLink}>Don't have an account?<br/>Sign up</button>
            </Modal>
        )
    }

    setEmail(value: string | undefined) {
        this.setState({email: value})
    }

    setPassword(value: string | undefined) {
        this.setState({password: value})
    }
}
