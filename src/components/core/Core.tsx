import React, { Component } from 'react'
import { Route, RouteProps, Switch } from 'react-router-dom'
import styles from '../../styles/core.module.css'
import SheetEditor from '../editor/SheetEditor'
import Sheets from '../Sheets'
import Sidebar from './Sidebar'

interface Props {
    match: RouteProps
}

export default class Core extends Component<Props> {
    render() {
        let testSheet = {
                    title: 'Title',
                    type: 'Argument',
                    content: [
                        {
                          type: 'paragraph',
                          children: [{ text: '' }],
                        },
                      ],
                    tags: ['test', 'useless'],
                    parentUrl:"https://www.example.com",
                    bulletPoints:[],
                    tabsKey: 'text'
                }
        return (
            <div className={styles.container}>
                <Sidebar/> 
                {/* <div className={styles.contentContainer}> */}
                    <Switch>
                        <Route exact path={this.props.match.path}>
                            <Sheets/>
                        </Route>
                        <Route path={`${this.props.match.path}create`}>
                            <SheetEditor sheet={testSheet}/>
                        </Route>
                    </Switch>
                {/* </div> */}
            </div>
        )
    }
}
