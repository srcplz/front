import React, { Component } from 'react'
import styles from '../styles/core.module.css'
import modalStyles from '../styles/modal.module.css'
import Modal from './Modal'
import Textfield from './Textfield'

interface Props {
    onClickOutside: Function
}

interface LoginModalState {
    email: string,
    emailValid: boolean,
    password:string,
    passwordValid: boolean,
    formFilled: boolean,
    showSignUpForm: boolean,
    passwordConfirmation: string,
    passwordConfirmationValid: boolean,
}

export default class LoginModal extends Component<Props, LoginModalState> {
    public state: LoginModalState = {
        email: "",
        emailValid: true,
        password: "",
        passwordValid: true,
        passwordConfirmation: "",
        passwordConfirmationValid: true,
        formFilled: false,
        showSignUpForm: false,
    }

    constructor(props: Props) {
        super(props);
        this.emailChanged = this.emailChanged.bind(this)
        this.passwordChanged = this.passwordChanged.bind(this)
        this.confirmPasswordChanged = this.confirmPasswordChanged.bind(this)
    }

    render() {
        return (
            <Modal closingFunction={this.props.onClickOutside}>
                <div className={modalStyles.title}>{this.state.showSignUpForm ? "Sign up" : "Log in"}</div>
                <Textfield 
                    type={"text"} 
                    value={this.state.email} 
                    onChange={this.emailChanged} 
                    title={"E-mail"} 
                    fieldValid={this.state.emailValid} 
                    errorMessage={"Invalid email"}/>
                <Textfield 
                    type={"password"} 
                    value={this.state.password} 
                    onChange={this.passwordChanged} 
                    title={"Password"} 
                    fieldValid={this.state.passwordValid} 
                    errorMessage={"Password should be >6 characters"}/>
                {this.state.showSignUpForm ? <Textfield 
                    type={"password"} 
                    value={this.state.passwordConfirmation} 
                    onChange={this.confirmPasswordChanged} 
                    title={"Password"} 
                    fieldValid={this.state.passwordConfirmationValid} 
                    errorMessage={"Passwords should match"}/>
                : null}
                <button 
                    onClick={e => this.state.showSignUpForm ? this.signUp() : this.logIn()} 
                    className={this.state.formFilled? styles.button : styles.buttonDisabled} 
                    disabled={!this.state.formFilled}>
                        {this.state.showSignUpForm? "Sign up" : "Log in"}
                </button>
                <button className={modalStyles.signUpLink} onClick={e => this.toggleForm()}>
                    {this.state.showSignUpForm ? <div>
                        Don't have an account?
                        <br/>
                        Sign up
                    </div>
                    : <div>
                        Don't have an account?
                        <br/>
                        Sign up
                    </div>}
                </button>
            </Modal>
        )
    }

    emailChanged(value: string) {
        this.setState({
            email: value,
        }, this.validate)
        
    }
    
    passwordChanged(value: string) {
        this.setState({
            password: value,
        }, this.validate)
        
    }
    
    confirmPasswordChanged(value: string) {
        this.setState({
            passwordConfirmation: value
        }, this.validate)
    }
    
    validate() {
        let emailValid = !!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        let passwordValid = this.state.password.length >= 6
        var passwordConfirmationValid = true
        if (this.state.showSignUpForm) {
            passwordConfirmationValid = this.state.passwordConfirmation === this.state.password
        }
        this.setState({
            emailValid: emailValid,
            passwordValid: passwordValid,
            passwordConfirmationValid: passwordConfirmationValid,
            formFilled: passwordValid && passwordConfirmationValid && emailValid
        })
    }

    toggleForm() {
        this.setState({
            showSignUpForm: !this.state.showSignUpForm
        })
    }

    logIn() {
        console.log(this.state)
    }
    signUp() {
        console.log(this.state)
    }
}
