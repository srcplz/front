import React, { ReactElement } from 'react'

const ModalRoot: React.FC = ({children}) => {
    return (
        <div id={"modal-root"}>
            {children}
        </div>
    )
}

export default ModalRoot