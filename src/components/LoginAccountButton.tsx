import React, { Component } from 'react'
import styles from '../styles/navbar.module.css'
import { AuthContext } from '../utils/context'
import LoginModal from './LoginModal'

interface LoginButtonState {
    modalOpened: boolean
}

export default class LoginAccountButton extends Component<{}, LoginButtonState> {
    state = {
        modalOpened: false
    }

    render() {
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        return (
            <AuthContext.Consumer>
            {auth =>
                (<div className={styles.accountButton}>
                    {auth.isLoggedIn 
                    ? <button 
                        className={styles.loginButton}
                        onClick={e => auth.setLoggedIn(false)}> Logged In </button>
                    : <button 
                        className={styles.loginButton}
                        onClick={e => auth.setLoggedIn(true)}> Log In </button>
                        // onClick={e => this.openModal()}> Log In </button>
                        }
                    {this.state.modalOpened 
                    ?   <LoginModal onClickOutside={this.closeModal}/>
                    : null}
                </div>
                )}
            </AuthContext.Consumer>
        )
    }

    openModal() {
        this.setState({modalOpened: true})
    }

    closeModal() {
        this.setState({modalOpened: false})
    }
}