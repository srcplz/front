import React, { ReactElement } from 'react'
import { Editor } from 'slate'
import { ReactEditor } from 'slate-react'
import Modal from '../../core/Modal'

interface Props {
  closeModal: () => void,
  // insertLink: (text: string, url: URL) => void,
  editor: Editor & ReactEditor,
}

export default function HyperlinkModal(props: Props): ReactElement {
  return (
    <Modal closingFunction={props.closeModal}>
      
    </Modal>
  )
}
