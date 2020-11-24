import { Component } from 'react'
import { createPortal } from 'react-dom'

interface Props {}

class Modal extends Component<Props> {
    el: HTMLElement
    root: HTMLElement | null

    constructor(props: Props) {
        super(props)

        this.root = document.getElementById("modal-root")
        this.el = document.createElement("div")
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
