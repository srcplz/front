import classNames from 'classnames'
import React, { ReactElement, useMemo, useState } from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import { createEditor, Node } from 'slate'
import { withReact } from 'slate-react'
import styles from '../../styles/editor.module.css'
import Textfield from '../core/Textfield'
import './editor.css'
import SlateEditor from './SlateEditor'
import TagsField from './tags/TagsField'

interface Props {
    sheet: Sheet
}
interface Sheet {
    title: string,
    type: string,
    content: Node[], 
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
    const editor = useMemo(() => withReact(createEditor()), props.sheet.content)
    
    function updateContent(content: Node[]) {
        setState({...state, content: content})
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
                            borderRadius:"0.5rem",}}>
                            <Tab.Content>
                                <Tab.Pane eventKey="text" title="Text">
                                    <SlateEditor
                                        onChange={updateContent}
                                        content={state.content}
                                        editor={editor}
                                    />
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

