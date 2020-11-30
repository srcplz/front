import React, { Component } from 'react'
import styles from '../styles/core.module.css'
import Sheets from './Sheets'
import Sidebar from './Sidebar'

export default class Core extends Component {
    render() {
        return (
            <div className={styles.container}>
                <Sidebar/>
                <div className={styles.contentContainer}>
                <Sheets/>
                
                </div>
            </div>
        )
    }
}
