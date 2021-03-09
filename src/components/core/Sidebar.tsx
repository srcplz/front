import React, { useState } from 'react'
import styles from '../../styles/sidebar.module.css'
import SideButton, { ButtonTypes } from './SideButton'

export default function Sidebar() {
    const [collapsed, _] = useState(true)
    return (
            <div className={collapsed ? styles.collapsedContainer : styles.container}>
                <SideButton collapsed={collapsed} type={ButtonTypes.Search} path=""/>
                <SideButton collapsed={collapsed} type={ButtonTypes.Favorites} path="/favorites"/>
                <SideButton collapsed={collapsed} type={ButtonTypes.Social} path="/social"/>
                <SideButton collapsed={collapsed} type={ButtonTypes.Create} path="/create"/>
                <SideButton collapsed={collapsed} type={ButtonTypes.Contributed} path="/contributed"/>
            </div>
    )
}
