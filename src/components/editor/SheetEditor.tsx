import React, { ReactElement, useRef, useState } from 'react'
import { Row, Col, Tab, Nav } from 'react-bootstrap'
import Textfield from '../core/Textfield'
import TagsField from './tags/TagsField'
import classNames from 'classnames'
import styles from '../../styles/editor.module.css'
import './editor.css'
import { DraftBlockType, DraftEditorCommand, DraftHandleValue, Editor, EditorState, RichUtils } from 'draft-js'
import Icon from '@iconify/react'
import header1 from '@iconify/icons-jam/header-1'
import header2 from '@iconify/icons-jam/header-2'
import header3 from '@iconify/icons-jam/header-3'
import underlineIcon from '@iconify/icons-uil/underline';
import boldIcon from '@iconify/icons-fe/bold';
import roundFormatItalic from '@iconify/icons-ic/round-format-italic';


interface Props {
    sheet: Sheet
}
interface Sheet {
    title: string,
    type: string,
    content: string, 
    tags: string[],
    parentUrl: string,
    bulletPoints: BulletPoint[],
    tabsKey: string
}

interface BulletPoint {
    title: string,
    sources: string[]
}


export default function SheetEditor(props: Props): ReactElement {
    const [state, setState] = useState(props.sheet)
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const editorRef = useRef<Editor>(null)

    function focusEditor() {
        editorRef.current?.focus()

    }

    function handleKeyCommand(command: DraftEditorCommand): DraftHandleValue {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        editorRef.current?.focus()
        if (newState) {
            setEditorState(newState)
            return 'handled'
        }
        return 'not-handled'
    }

    function setBlockType(block: DraftBlockType) {
        const newState = RichUtils.toggleBlockType(editorState, block)
        editorRef.current?.focus()
        if (newState) {
            setEditorState(newState)
            
            return 'handled'
        }
        return 'not-handled'
    }
    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
            <Textfield title="Title" value={state.title} onChange={v => setState({...state, title: v})}/>
                    <TagsField title="Tags" value={state.tags} onChange={tags => setState({...state, tags: tags})}/>
                    <Textfield title="Parent URL" value={state.parentUrl} onChange={v => setState({...state, parentUrl: v})}/>
                    <Tab.Container defaultActiveKey={state.tabsKey} onSelect={(key) => (
                        setState({...state, tabsKey: key ?? 'text'})
                    )}>
                        <Row style={{marginLeft:"1rem", marginRight:"1rem", height:"3rem"}}>
                            <div className={classNames(
                                styles.background,
                                styles.tab,
                                state.tabsKey === 'text' ? styles.active : undefined)}>
                                <div className={classNames(styles.leftMask, styles.tab)}/>
                            </div>
                            <Col style={{paddingLeft:"0", paddingRight:"0"}}>
                                <Nav justify variant="tabs" className={styles.bootstrapTab}>
                                    <Nav.Item>
                                        <div style={{
                                            backgroundColor:"var(--relief)",
                                            borderRadius: "1rem 1rem 0 0",
                                            height:"3rem"}}>
                                            <Nav.Link eventKey='text' style={{
                                                borderRadius: state.tabsKey === 'text'
                                                ? "1rem 1rem 0 0"
                                                : "0 0 1rem 0"
                                            }}>
                                                Text
                                            </Nav.Link>
                                        </div>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <div style={{
                                            backgroundColor:"var(--relief)",
                                            borderRadius: "1rem 1rem 0 0",
                                            height:"3rem"}}>
                                            <Nav.Link eventKey='bullets' style={{
                                                borderRadius: state.tabsKey === 'bullets'
                                                ? "1rem 1rem 0 0"
                                                : "0 0 0 1rem"
                                            }}>
                                                Bullet Points
                                            </Nav.Link>
                                        </div>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <div className={classNames(
                                styles.background,
                                styles.tab,
                                state.tabsKey === 'bullets' ? styles.active : undefined)}>
                                <div className={classNames(styles.rightMask, styles.tab)}/>
                            </div>
                        </Row>
                        <Row style={{
                            marginLeft:"0.5rem",
                            marginRight:"0.5rem",
                            flex:1,
                            overflow:'hidden',
                            border: "0.125rem solid var(--relief)",
                            backgroundColor:"var(--relief)",
                            borderRadius:"0.5rem", 
                            minHeight:"10rem"}}>
                            <Tab.Content>
                                <Tab.Pane eventKey="text" title="Text">
                                    {/* <Col */}
                                        {/*  style={{paddingLeft:0, paddingRight:0, height:"100%"}}> */}
                                        <div style={{display:"flex", flexDirection:"column", height:"100%"}}>
                                            <Row style={{
                                                marginLeft:"0.5rem",
                                                marginRight:"0.5rem",}}>
                                                    <button onClick={e => setBlockType('header-one')}>
                                                        <Icon icon={header1} style={{color: '#fff6fb', fontSize: '36px'}} />
                                                    </button>
                                                    <button onClick={e => setBlockType('header-two')}>
                                                        <Icon icon={header2} style={{color: '#fff6fb', fontSize: '30px'}} />
                                                    </button>
                                                    <button onClick={e => setBlockType('header-three')}>
                                                        <Icon icon={header3} style={{color: '#fff6fb', fontSize: '24px'}} />
                                                    </button>
                                                    <button onClick={e => handleKeyCommand('underline')}>
                                                        <Icon icon={underlineIcon} style={{color: '#fff6fb', fontSize: '28px'}} />
                                                    </button>
                                                    <button onClick={e => handleKeyCommand('italic')}>
                                                        <Icon icon={roundFormatItalic} style={{color: '#fff6fb', fontSize: '24px'}} />
                                                    </button>
                                                    <button onClick={e => handleKeyCommand('bold')}>
                                                        <Icon icon={boldIcon} style={{color: "#fff6fb", fontSize: "20px", marginTop:"-4px"}} />
                                                    </button>
                                            </Row>
                                            <div className={styles.editorContainer} onClick={(e) => focusEditor()}>
                                                <Editor
                                                    ref={editorRef}
                                                    editorState={editorState}
                                                    onChange={setEditorState}
                                                    placeholder={"How to be right"}
                                                    handleKeyCommand={handleKeyCommand}
                                                />
                                            </div>
                                        </div>
                                    {/* </Col> */}
                                </Tab.Pane>
                                <Tab.Pane eventKey="bullets" title="Bullet Points">
                                    Bullet points
                                </Tab.Pane>
                            </Tab.Content>
                        </Row>
                    </Tab.Container>
                </div>
        </div>
    )
}

