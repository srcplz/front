import { Component } from 'react'
import { createPortal } from 'react-dom'
import styles from '../../styles/core.module.css'


class ModalPortal extends Component {
    el: HTMLElement
    root: HTMLElement | null

    constructor(props: {}) {
        super(props)

        this.root = document.getElementById("modal-root")
        this.el = document.createElement("div")
        this.el.className = styles.modal
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

export default ModalPortal
