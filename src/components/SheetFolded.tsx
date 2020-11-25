import React, { ReactElement } from 'react'
import SheetSummary from '../models/SheetSummary'
import styles from '../styles/sheet.module.css'

export interface FoldedSheetProps {
    data: SheetSummary
}

export default function SheetFolded(props: FoldedSheetProps): ReactElement {
    const {author, title} = props.data
    return (
        <div className={styles.container}>
            <span className={styles.title}>title</span>
            <div className={styles.titleBox}>
                <span className={styles.titleContainer}>{title}</span>
            </div>
            <span className={styles.title}>type</span>
            <div className={styles.typebox}>
                <a className={styles.rebuttal}>Rebuttal</a>
                <a className={styles.argument}>Argument</a>
                <a className={styles.points}>Talking Points</a>
            </div>
            {author.name}
        </div>
    )
}
