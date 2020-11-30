import React, { useRef } from 'react'
import styles from '../styles/modal.module.css'
import { useOnClickOutside } from '../utils/hooks'
import ModalPortal from './ModalPortal'

interface ModalProps {
    containerClass?: string,
    closingFunction: Function
}

const Modal: React.FC<ModalProps> = (props) => {
    const containerRef = useRef(null)
    const handleClickOutside = () => {
        props.closingFunction()
        console.log("clicked outside")
    }
    useOnClickOutside(containerRef, handleClickOutside)
    return (
        <ModalPortal>
            <div ref={containerRef} className={props.containerClass}>
                {props.children}
            </div>
        </ModalPortal>
    )
}

Modal.defaultProps = {
    containerClass: styles.container
}

export default Modal