import React, { Component } from 'react'
import { ToggleButtonGroup, ToggleButton } from  'react-bootstrap'
import './segmented.css'

interface Props {
    active: string
    values: ToggleValue[]
    name: string
    onChange:(value:string)=>void
}
interface State {
    
}

interface ToggleValue {
    value: string,
    content: string
}

export default class SegmentedSelector extends Component<Props, State> {
    state = {}

    render() {
        return ( 
            <ToggleButtonGroup 
            name={this.props.name} 
            type='radio' 
            defaultValue={this.props.active}
            onChange={this.props.onChange}>
                {this.props.values.map(value => {
                    console.log(this.props.active === value.value)
                    return <ToggleButton 
                        value={value.value} 
                        checked={this.props.active === value.value}>
                            {value.content}
                    </ToggleButton>
                })}
            </ToggleButtonGroup>
        )
    }
}
