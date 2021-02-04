import React, { Component } from 'react'
import { Route, RouteProps, Switch } from 'react-router-dom'
import styles from '../../styles/core.module.css'
import Editor from '../editor/Editor'
import Sheets from '../Sheets'
import Sidebar from './Sidebar'

interface Props {
    match: RouteProps
}

export default class Core extends Component<Props> {
    render() {
        return (
            <div className={styles.container}>
                <Sidebar/> 
                <div className={styles.contentContainer}>
                    <Switch>
                        <Route exact path={this.props.match.path}>
                            <Sheets/>
                        </Route>
                        <Route path={`${this.props.match.path}create`}>
                            <Editor/>
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }
}
