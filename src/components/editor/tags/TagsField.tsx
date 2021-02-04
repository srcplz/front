import React from 'react'
import ReactTagsInput from 'react-tagsinput'
import styles from '../../../styles/core.module.css'
import './tagsfield.css'

interface Props {
    title: string,
    value: string[] | undefined,
    onChange: (tags: string[]) => void,
}

const TagsField: React.FC<Props> = (props) => {
    return (
        <div className={styles.textInputContainer}>
            <div className={styles.label}>{props.title}</div>
            <ReactTagsInput value={props.value ?? []} onChange={(tags) => {props.onChange(tags)}}/>
        </div>
    )
}

export default TagsField
