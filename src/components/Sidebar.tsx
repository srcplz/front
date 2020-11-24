import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import styles from '../styles/sidebar.module.css'
import SideButton, { ButtonTypes } from './SideButton'

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(true)
    return (
        <BrowserRouter>
            <div className={collapsed ? styles.collapsedContainer : styles.container}>
                <SideButton collapsed={collapsed} type={ButtonTypes.Search} path=""/>
                <SideButton collapsed={collapsed} type={ButtonTypes.Favorites} path="/favorites"/>
                <SideButton collapsed={collapsed} type={ButtonTypes.Social} path="/social"/>
                <SideButton collapsed={collapsed} type={ButtonTypes.Create} path="/create"/>
                <SideButton collapsed={collapsed} type={ButtonTypes.Contributed} path="/contributed"/>
            </div>
        </BrowserRouter>
    )
}
