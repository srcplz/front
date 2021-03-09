import React, { ReactElement, useRef, useState } from 'react'
import { Editor, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import Modal from '../../core/Modal'
import Textfield from '../../core/Textfield'
import styles from '../../../styles/core.module.css'

interface Props {
  closeModal: () => void,
  insertLink: (url: string) => void,
  editor: Editor & ReactEditor,
}

export default function HyperlinkModal(props: Props): ReactElement {
  let [urlState, setUrlState] = useState("www.yourlink.com")
  let selectionRef = useRef(props.editor.selection)
  const onClick = () => {
    if (selectionRef.current) {
      Transforms.select(props.editor, selectionRef.current)
    }
    props.insertLink(urlState)
    props.closeModal()
  }
  return (
    <Modal closingFunction={props.closeModal}>
      <div style={{
        display:"flex",
        flexDirection:"row"
      }}>
        <Textfield
        title="Link URL"
        value={urlState}
        onChange={setUrlState}
        styles={{container:{flexGrow:1}}}
        />
        {//TODO: Replace with simple check button
        }
        <button className={styles.button} 
        onClick={onClick}
        style={{
          marginTop:0, 
          marginRight:16, 
          width:"auto", 
          paddingLeft:8, 
          paddingRight:8, 
          boxShadow:"none"}}>Insert Link</button>
      </div>
    </Modal>
  )
}
