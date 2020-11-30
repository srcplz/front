import { Component } from 'react'
import { createPortal } from 'react-dom'
import styles from '../styles/core.module.css'

interface ModalState {
    opened: boolean
}

interface ModalProps {
    closingFunction: () => void
}

class Modal extends Component<ModalProps, ModalState> {
    el: HTMLElement
    root: HTMLElement | null
    state = {
        opened: true
    }
    constructor(props: ModalProps, state: ModalState) {
        super(props)

        this.root = document.getElementById("modal-root")
        this.el = document.createElement("div")
        this.el.className = styles.modal
        this.el.onclick = this.props.closingFunction
    }

    componentDidMount() {
        this.root?.appendChild(this.el)
    }

    componentWillUnmount() {
        this.root?.removeChild(this.el)
    }
    

    render() {
        return createPortal(
            this.props.children,
            this.el
        )
    }
}

export default Modal
