import React, { Component } from 'react'
import styles from '../styles/navbar.module.css'
import { AuthContext } from '../utils/context'
import LoginModal from './LoginModal'

interface LoginButtonState {
    modalOpened: boolean
}

export default class LoginAccountButton extends Component<{}, LoginButtonState> {
    static contextType = AuthContext
    context!: React.ContextType<typeof AuthContext>
    state = {
        modalOpened: false
    }

    render() {
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        return (
            <div className={styles.accountButton}>
                {this.context.isLoggedIn 
                ? <button 
                    className={styles.loginButton}
                    onClick={e => this.context.logout()}> Logged In </button>
                : <button 
                    className={styles.loginButton}
                    onClick={e => this.openModal()}> Log In </button>}
                {this.state.modalOpened 
                ?   <LoginModal onClickOutside={this.closeModal}/>
                : null}
            </div>
        )
    }

    openModal() {
        this.setState({modalOpened: true})
    }

    closeModal() {
        this.setState({modalOpened: false})
    }
}