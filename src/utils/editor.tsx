import { Editor, Transforms, Element, Text, Range, Node } from "slate"
import { ReactEditor } from "slate-react"

export const TextEditor = {
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
            listType: format,
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
    const isLinkActive = TextEditor.isBlockActive(editor, 'link')

    if (isLinkActive) {
      this.removeLink(editor)
    }

    const {selection} = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link = {
      type: "link",
      url: url,
      children: isCollapsed ? [{text: url}] : []
    }

    if (isCollapsed) {
      Transforms.insertNodes(editor, link)
    } else {
      Transforms.wrapNodes(editor, link, { split: true })
      Transforms.collapse(editor, {edge:"end"})
    }
  },

  removeLink(editor: Editor & ReactEditor) {
    Transforms.unwrapNodes(editor, {
      match: n => 
        !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link'
    })
  },
}


