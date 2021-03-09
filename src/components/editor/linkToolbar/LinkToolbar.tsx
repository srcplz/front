import React, { ReactElement, useEffect, useRef } from 'react'
import { Editor, Range } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import * as URI from 'uri-js'
import { TextEditor } from '../../../utils/editor'
import {ReactComponent as EditIcon} from '../../../img/edit.svg'
import ToolbarPortal from './ToolbarPortal'
import styles from '../../../styles/editor.module.css'

interface Props {
  
}

function LinkToolbar(props: Props): ReactElement {
  const ref = useRef<HTMLDivElement>(null)
  const editor = useSlate()

  useEffect(() => {
    const el = ref.current
    const {selection} = editor


    if (!el) return

    if (!selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === "" ||
      !TextEditor.isBlockActive(editor, 'link')) {
        el.removeAttribute("style")
        return
    }

    
    const domSelection = window.getSelection()
    const domRange = domSelection!.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()
    el.style.opacity = "1"
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
    el.style.left = `${rect.left +
      window.pageXOffset -
      el.offsetWidth / 2 +
      rect.width / 2}px`
    })
    const [link] = Editor.nodes(editor, {match: n => {
      return n.type === 'link'
    }})
    const rawUrl = link ? link[0].url as string : ""
    let urlComponents = URI.parse(rawUrl)
    if (!urlComponents.scheme) {
      urlComponents.scheme = "https"
    }
    const url = URI.serialize(urlComponents, )
  return (
    <ToolbarPortal>
      <div
        className={styles.toolbarContainer}
        ref={ref}
        >
          {link ? 
          <div>
            <a href={url} style={{color:"var(--font-light)"}}>
              {rawUrl}
            </a>
            <button>
              <EditIcon stroke="var(--font-light)" style={{marginLeft:"4px", paddingBottom:"4px", height:"24px"}}/>
            </button>
          </div>
          : null}
      </div>
      
    </ToolbarPortal>
  )
}

export default LinkToolbar
