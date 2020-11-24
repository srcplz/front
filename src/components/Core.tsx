import React, { Component } from 'react'
import Sidebar from './Sidebar'
import styles from '../styles/core.module.css'

export default class Core extends Component {
    render() {
        return (
            <div className={styles.container}>
                <Sidebar/>
                <div className={styles.contentContainer}>

                
                </div>
            </div>
        )
    }
}
