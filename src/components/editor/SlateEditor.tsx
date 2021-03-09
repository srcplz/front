import boldIcon from '@iconify/icons-fe/bold'
import listBullet from '@iconify/icons-fe/list-bullet';
import listOrder from '@iconify/icons-fe/list-order';
import roundFormatItalic from '@iconify/icons-ic/round-format-italic'
import header1 from '@iconify/icons-jam/header-1'
import header2 from '@iconify/icons-jam/header-2'
import header3 from '@iconify/icons-jam/header-3'
import underlineIcon from '@iconify/icons-uil/underline'
import Icon from '@iconify/react'
import imageIcon from '@iconify/icons-eva/image-2-fill';
import { ReactComponent as LinkIcon } from '../../img/link.svg'
import React, { useCallback, useMemo, useState } from "react"
import { Editable, ReactEditor, RenderElementProps, RenderLeafProps, Slate, withReact, } from 'slate-react';
import { Editor, Transforms, Text, Node, Element, Range, createEditor } from 'slate';
import { Row } from 'react-bootstrap';
import styles from '../../styles/editor.module.css'
import HyperlinkModal from './hyperlink/HyperlinkModal';
import LinkToolbar from './linkToolbar/LinkToolbar';
import { withHistory } from 'slate-history';
import { TextEditor } from '../../utils/editor';


interface Props {
  onSave: (content: Node[]) => void,
  content: Node[],
}


const SlateEditor = (props: Props) => {
  let [contentState, setContentState] = useState(props.content)
  const withInlineLinks = (editor: Editor & ReactEditor) => {
    const {isInline} = editor
    editor.isInline = element => element.type === 'link' ? true : isInline(element)
    return editor
  }
  const editor = useMemo(() => withHistory(withInlineLinks(withReact(createEditor()))), props.content)
  const [modalState, setModalState] = useState(false)
  const closeModal = () => {
    // hacky solution because the setModalState function somehow doesn't work
    // when called from HyperlinkModal
    setTimeout(() => {
      setModalState(false)
    }, 0)
  }
  
  const renderLeaf = useCallback(
    props => {
        return <Leaf {...props}/>
    },
    [],
  )
  
  const renderElement = useCallback(
  (props: RenderElementProps) => {
    switch (props.element.type) {
      case 'header1':
        return (<h1 {...props.attributes}>{props.children}</h1>)
        
      case 'header2':
        return (<h2 {...props.attributes}>{props.children}</h2>)
  
      case 'header3':
        return (<h3 {...props.attributes}>{props.children}</h3>)
  
      case 'ordered-list':
        return (<ol {...props.attributes}>{props.children}</ol>)
  
      case 'unordered-list':
        return (<ul {...props.attributes}>{props.children}</ul>)
  
      case 'list-item':
      return (<li {...props.attributes} 
          style={{listStyleType:props.element.listType === 'ordered-list'?'decimal':'disc'}}>
            {props.children}
          </li>)
  
      case 'link':
        return (<a {...props.attributes} href={props.element.url as string}>
          {props.children}
        </a>)
    
      default:
        return (<p {...props.attributes} style={{marginBottom:"4px"}}>{props.children}</p>)
    }
  }, []
  )
  

  function keyDownHandler(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.shiftKey && event.key === 'Tab' && TextEditor.isList(editor)) {
        // Transforms.wrapNodes(editor)
        event.preventDefault()
        TextEditor.unindentList(editor)
        return
    }
    if (event.key === 'Tab' && TextEditor.isList(editor)) {
      // Transforms.wrapNodes(editor)
      event.preventDefault()
      TextEditor.indentList(editor)
      return
    }

    if (event.key === 'Backspace' && TextEditor.isList(editor)) {
      if (TextEditor.shouldExitList(editor)) {
        event.preventDefault()
      }
    }

    if (!event.ctrlKey && !event.metaKey) {
        return
      }

      switch (event.key) {

        case 'b': {
          event.preventDefault()
          TextEditor.toggleBoldMark(editor)
          break
        }
        case 'i': {
          event.preventDefault()
        TextEditor.toggleItalicMark(editor)
          break
        }
        case 'u': {
          event.preventDefault()
          TextEditor.toggleUnderlineMark(editor)
          break
        }
      }
  }

  
  const focusEditor = (editor: Editor & ReactEditor) => {
    if (ReactEditor.isFocused(editor)) {
      return
    }
    let edges = Editor.edges(editor, [])
    ReactEditor.focus(editor)
    Transforms.select(editor, edges[1])
  }

  return (
    <Slate
      editor={editor}
      value={contentState}
      onChange={newValue => {
        setContentState(newValue)}}>
          <div style={{display:"flex", flexDirection:"column", height:"100%"}}>
              <Row style={{
                  marginLeft:"0.5rem",
                  marginRight:"0.5rem",}}>
                      <button onClick={e => {TextEditor.toggleBlock(editor, 'header1')}}>
                          <Icon icon={header1} style={{color: '#fff6fb', fontSize: '36px', margin:"0.5rem"}} />
                      </button>
                      <button onClick={e => {TextEditor.toggleBlock(editor, 'header2')}}>
                          <Icon icon={header2} style={{color: '#fff6fb', fontSize: '30px', margin:"0.5rem"}} />
                      </button>
                      <button onClick={e => {TextEditor.toggleBlock(editor, 'header3')}}>
                          <Icon icon={header3} style={{color: '#fff6fb', fontSize: '24px', margin:"0.5rem"}} />
                      </button>
                      <button onClick={e => {TextEditor.toggleUnderlineMark(editor)}}>
                          <Icon icon={underlineIcon} style={{color: '#fff6fb', fontSize: '28px', margin:"0.5rem"}} />
                      </button>
                      <button onClick={e => {TextEditor.toggleItalicMark(editor)}}>
                          <Icon icon={roundFormatItalic} style={{color: '#fff6fb', fontSize: '24px', margin:"0.5rem"}} />
                      </button>
                      <button onClick={e => {TextEditor.toggleBoldMark(editor)}}>
                          <Icon icon={boldIcon} style={{color: "#fff6fb", fontSize: "20px", marginTop:"-4px", margin:"0.5rem"}} />
                      </button>
                      <button onClick={e => {TextEditor.toggleBlock(editor, 'unordered-list')}}>
                          <Icon icon={listBullet} style={{color: "#fff6fb", fontSize: "20px", marginTop:"-4px", margin:"0.5rem"}} />
                      </button>
                      <button onClick={e => {TextEditor.toggleBlock(editor, 'ordered-list')}}>
                          <Icon icon={listOrder} style={{color: "#fff6fb", fontSize: "20px", marginTop:"-4px", margin:"0.5rem"}} />
                      </button>
                      <button onClick={e => {setModalState(true)}}>
                          <LinkIcon style={{margin:"0.5rem"}}/>
                          {modalState ?
                           <HyperlinkModal 
                           insertLink={(url) => {
                             TextEditor.insertLink(editor, url)
                           }}
                           closeModal={() => closeModal()} 
                           editor={editor}/>
                          : null}
                      </button>
                      <button onClick={e => {}}>
                          <Icon icon={imageIcon} style={{
                            color: "#fff6fb", 
                            fontSize: "20px", 
                            marginTop:"-4px", 
                            margin:"0.5rem"}} />
                      </button>
              </Row>
              <div className={styles.editorContainer} onClick={() => {focusEditor(editor)}}> 
                  <LinkToolbar/>
                  <Editable 
                  placeholder="Debunk the world"
                  renderLeaf={renderLeaf}
                  renderElement={renderElement}
                  onKeyDown={event => keyDownHandler(event)}
                  />
              </div>
          </div>
      </Slate>
  )
}

const Leaf = (props: RenderLeafProps) => {
  let children = props.children
  if (props.leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (props.leaf.italic) {
    children = <em>{children}</em>
  }

  if (props.leaf.underline) {
    children = <u>{children}</u>
  }

  return (
    <span {...props.attributes}>
      {children}
    </span>
      
  )
}

export default SlateEditor