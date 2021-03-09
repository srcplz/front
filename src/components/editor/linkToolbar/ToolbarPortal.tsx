import React from 'react'
import ReactDOM from 'react-dom'

const ToolbarPortal: React.FC = (props) => {

  return ReactDOM.createPortal(props.children, document.body)
}

export default ToolbarPortal