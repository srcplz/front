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
import { Editable, ReactEditor, RenderElementProps, RenderLeafProps, Slate, withReact } from 'slate-react';
import { createEditor, Editor, Transforms, Text, Node, Element } from 'slate';
import { Row } from 'react-bootstrap';
import styles from '../../styles/editor.module.css'
import HyperlinkModal from './hyperlink/HyperlinkModal';


interface Props {
  onChange: (content: Node[]) => void,
  content: Node[],
  editor: Editor & ReactEditor
}

const TextEditor = {
  LIST_TYPES: ['ordered-list', 'unordered-list'],

  isBoldMarkActive(editor: Editor & ReactEditor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.bold === true,
        universal: true,
      })
      
      return !!match
    },

  isItalicMarkActive(editor: Editor & ReactEditor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.italic === true,
        universal: true,
      })
      
      return !!match
    },

  isUnderlineMarkActive(editor: Editor & ReactEditor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.underline === true,
        universal: true,
      })
      
      return !!match
    },

  isBlockActive(editor: Editor & ReactEditor, format: string) {
      const [match] = Editor.nodes(editor, {
          match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
      })

      return !!match
  },

  isList(editor: Editor & ReactEditor) {
    const [match] = Editor.nodes(editor, {
      match: n => TextEditor.LIST_TYPES.includes(n.type as string)
    })
    return !!match
  },
  
  toggleBoldMark(editor: Editor & ReactEditor) {
    const isActive = TextEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
    ReactEditor.focus(editor)
  },
    
  toggleItalicMark(editor: Editor & ReactEditor) {
    const isActive = TextEditor.isItalicMarkActive(editor)
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true},
      { match: n => Text.isText(n), split: true}
    )
    ReactEditor.focus(editor)
  },
    
    toggleUnderlineMark(editor: Editor & ReactEditor) {
      const isActive = TextEditor.isUnderlineMarkActive(editor)
      Transforms.setNodes(
        editor,
        { underline: isActive ? null : true},
        { match: n => Text.isText(n), split: true}
      )
      ReactEditor.focus(editor)
    },

  toggleBlock(editor: Editor & ReactEditor, format: string) {
    const isActive = TextEditor.isBlockActive(editor, format)
    const isList = TextEditor.LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
      match: n => !Editor.isEditor(n) && Element.isElement(n) && TextEditor.LIST_TYPES.includes(n.type as string),
      split: true,
    })

    Transforms.setNodes(
        editor,
        {
            type: isActive? null : isList? 'list-item' : format,
        }
    )

    if (!isActive && isList) {
      Transforms.wrapNodes(editor,
        {
          type: format,
          children: []
        })
    }
    ReactEditor.focus(editor)
  },

  indentList(editor: Editor & ReactEditor) {
    if (!TextEditor.isList(editor)) {
      return
    }
    let [match] = Editor.nodes(
      editor, {
        match: n => TextEditor.LIST_TYPES.includes(n.type as string)
      }
    )
    
    Transforms.wrapNodes(editor, {
      type: match[0].type,
      children: []
    })
  },
  
  unindentList(editor: Editor & ReactEditor) {
    if (!TextEditor.isList(editor)) {
      return
    }
    let [match] = Editor.nodes(
      editor, {
        match: n => TextEditor.LIST_TYPES.includes(n.type as string)
      }
    )
    if (!!!editor.selection) {
      return
    }
    let selectionPath = editor.selection.anchor.path
    let parentPath = selectionPath.slice(0, selectionPath.length - 2)
    if (parentPath.length === 0) {
      return
    }
    let grandParent = Node.parent(editor, parentPath)
    if (TextEditor.LIST_TYPES.includes(grandParent.type as string)) {
      Transforms.unwrapNodes(editor, {
        match: n => n.type === match[0].type,
      })
    }
    
  },

  shouldExitList(editor: Editor & ReactEditor) {
    if (!TextEditor.isList(editor)) {
      return
    }
    let [match] = Editor.nodes(
      editor, {
        match: n => TextEditor.LIST_TYPES.includes(n.type as string)
      }
    )
    if (Node.string(editor).length === 0) {
      TextEditor.toggleBlock(editor, match[0].type as string)
      return true
    }
    return false
  },

  insertLink(editor: Editor & ReactEditor, url: string) {
    
  }
}

const SlateEditor = (props: Props) => {
  const [modalState, setModalState] = useState(false)
  function keyDownHandler(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.shiftKey && event.key === 'Tab' && TextEditor.isList(props.editor)) {
        // Transforms.wrapNodes(editor)
        event.preventDefault()
        TextEditor.unindentList(props.editor)
        return
    }
    if (event.key === 'Tab' && TextEditor.isList(props.editor)) {
      // Transforms.wrapNodes(editor)
      event.preventDefault()
      TextEditor.indentList(props.editor)
      return
    }

    if (event.key === 'Backspace' && TextEditor.isList(props.editor)) {
      if (TextEditor.shouldExitList(props.editor)) {
        event.preventDefault()
      }
    }

    if (!event.ctrlKey && !event.metaKey) {
        return
      }

      switch (event.key) {

        case 'b': {
          event.preventDefault()
          TextEditor.toggleBoldMark(props.editor)
          break
        }
        case 'i': {
          event.preventDefault()
          TextEditor.toggleItalicMark(props.editor)
          break
        }
        case 'u': {
          event.preventDefault()
          TextEditor.toggleUnderlineMark(props.editor)
          break
        }
      }
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
          return (<li {...props.attributes}>{props.children}</li>)
      
        default:
          return (<p {...props.attributes} style={{marginBottom:"4px"}}>{props.children}</p>)
      }
    }, []
  )

  const focusEditor = (editor: Editor & ReactEditor) => {
    let edges = Editor.edges(editor, [])
    ReactEditor.focus(editor)
    Transforms.select(editor, edges[1])
  }

  return (
    <Slate
      editor={props.editor}
      value={props.content}
      onChange={newValue => props.onChange(newValue)}>
          <div style={{display:"flex", flexDirection:"column", height:"100%"}}>
              <Row style={{
                  marginLeft:"0.5rem",
                  marginRight:"0.5rem",}}>
                      <button onClick={e => {TextEditor.toggleBlock(props.editor, 'header1')}}>
                          <Icon icon={header1} style={{color: '#fff6fb', fontSize: '36px', margin:"0.5rem"}} />
                      </button>
                      <button onClick={e => {TextEditor.toggleBlock(props.editor, 'header2')}}>
                          <Icon icon={header2} style={{color: '#fff6fb', fontSize: '30px', margin:"0.5rem"}} />
                      </button>
                      <button onClick={e => {TextEditor.toggleBlock(props.editor, 'header3')}}>
                          <Icon icon={header3} style={{color: '#fff6fb', fontSize: '24px', margin:"0.5rem"}} />
                      </button>
                      <button onClick={e => {TextEditor.toggleUnderlineMark(props.editor)}}>
                          <Icon icon={underlineIcon} style={{color: '#fff6fb', fontSize: '28px', margin:"0.5rem"}} />
                      </button>
                      <button onClick={e => {TextEditor.toggleItalicMark(props.editor)}}>
                          <Icon icon={roundFormatItalic} style={{color: '#fff6fb', fontSize: '24px', margin:"0.5rem"}} />
                      </button>
                      <button onClick={e => {TextEditor.toggleBoldMark(props.editor)}}>
                          <Icon icon={boldIcon} style={{color: "#fff6fb", fontSize: "20px", marginTop:"-4px", margin:"0.5rem"}} />
                      </button>
                      <button onClick={e => {TextEditor.toggleBlock(props.editor, 'unordered-list')}}>
                          <Icon icon={listBullet} style={{color: "#fff6fb", fontSize: "20px", marginTop:"-4px", margin:"0.5rem"}} />
                      </button>
                      <button onClick={e => {TextEditor.toggleBlock(props.editor, 'ordered-list')}}>
                          <Icon icon={listOrder} style={{color: "#fff6fb", fontSize: "20px", marginTop:"-4px", margin:"0.5rem"}} />
                      </button>
                      <button onClick={e => {setModalState(true)}}>
                          <LinkIcon style={{margin:"0.5rem"}}/>
                          {modalState ?
                           <HyperlinkModal closeModal={() => setModalState(false)} editor={props.editor}/>
                          : null}
                      </button>
                      <button onClick={e => {}}>
                          <Icon icon={imageIcon} style={{color: "#fff6fb", fontSize: "20px", marginTop:"-4px", margin:"0.5rem"}} />
                      </button>
              </Row>
              <div className={styles.editorContainer} onClick={() => {focusEditor(props.editor)}}> 
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