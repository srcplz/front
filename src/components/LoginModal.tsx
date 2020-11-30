import React, { Component } from 'react'
import coreStyles from '../styles/core.module.css'
import Modal from './Modal'

interface Props {
    onClickOutside: Function
}

interface LoginModalState {
    email: string|undefined,
    password:string|undefined
}

export default class LoginModal extends Component<Props, LoginModalState> {
    public state: LoginModalState = {
        email: undefined,
        password: undefined
    }
    render() {
        return (
            <Modal closingFunction={this.props.onClickOutside}>
                <input type="text" value={this.state.email} onChange={e => this.setState({email: e.target.value})} placeholder="email" className={coreStyles.textInput}/>
                <input type="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} placeholder="password" className={coreStyles.textInput}/>
                <button onClick={e => this.props.onClickOutside}>Click</button>
            </Modal>
        )
    }
}
