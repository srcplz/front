import React, { ReactElement } from 'react'
import Modal from '../../core/Modal'

interface Props {
  closeModal: () => void,
  insertLink: (text: string, url: URL) => void
}

export default function HyperlinkModal(props: Props): ReactElement {
  return (
    <Modal closingFunction={props.closeModal}>
      
    </Modal>
  )
}
