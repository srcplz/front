import React, { Component } from 'react'
import { AuthContext } from '../utils/context'
import styles from '../styles/navbar.module.css'
import Modal from './Modal'
import LoginModal from './LoginModal'

export default class LoginAccountButton extends Component {
    static contextType = AuthContext
    context!: React.ContextType<typeof AuthContext>

    render() {
        return (
            <div className={styles.accountButton}>
                {this.context.isLoggedIn 
                ? <button 
                    className={styles.loginButton}
                    onClick={e => this.context.logout()}> Logged In </button>
                : <button 
                    className={styles.loginButton}
                    onClick={e => this.context.login()}> Log In </button>}
                {this.context.loginModalOpened 
                ?   <Modal>
                        <LoginModal onClick={this.context.logout}/>
                    </Modal>
                : null}
            </div>
        )
    }
}