import React, { Component } from 'react'
import ReactTagsInput from 'react-tagsinput'
import './editor.css'
import SegmentedSelector from '../core/SegmentedSelector/SegmentedSelector'
import Textfield from '../core/Textfield'
import TagsField from './tags/TagsField'

interface Props {
    
}
interface State {
    title: string,
    type: string,
    content: string,
    tags: string[],
    parentUrl: string,
    bulletPoints: BulletPoint[]
}

interface BulletPoint {
    title: string,
    sources: string[]
}

export default class Editor extends Component<Props, State> {
    state = {
        title: 'Title',
        type: 'Argument',
        content: `Aut est officiis at. Laboriosam odio repudiandae rerum sed in. Totam quasi pariatur et quibusdam. Animi quae dolorem sed dolore. Doloremque voluptatum qui ut laudantium voluptas hic.
        Non nam a assumenda repellendus dolores. Voluptatem veritatis illum velit a qui tempore labore ullam. Quidem repudiandae hic non et distinctio dignissimos qui quisquam.
        Et sed dicta dolorum accusamus ratione et adipisci sequi. Repellendus doloremque aliquam qui. Veritatis commodi eligendi doloribus. Dolorem itaque qui sit numquam beatae dolorem sapiente quibusdam. Eos quia qui laudantium in.
        Sunt culpa sit in autem pariatur dolor sit enim. In aut quisquam voluptas omnis alias est. Libero ipsum temporibus et assumenda ut at dolorem maiores. Eligendi quo facilis ut et voluptatem aut eaque. Autem ut tenetur illum est.
        Doloribus ut et corrupti veniam. Velit ut dolor sit reiciendis ut expedita sit corporis. Consequatur animi voluptatibus iste. Facere dolorum autem aut facilis quidem voluptatem doloribus.`,
        tags: ['test', 'useless'],
        parentUrl:"https://www.example.com",
        bulletPoints:[]
    }

    render() {
        let toggleValues = [
            {value: 'Argument', content:'Argument'},
            {value: 'Rebuttal', content:'Rebuttal'},
            {value: 'Talking Point', content:'Talking Point'},
        ]
        let handleChange = this.setType.bind(this)
        let handleTags = this.setTags.bind(this)
        return (
            <div className="flexContainer">
                <div className="container">
                    <Textfield title="Title" value={this.state.title} onChange={v => this.setState({title: v})}/>
                    <TagsField title="Tags" value={this.state.tags} onChange={handleTags}/>
                    <SegmentedSelector 
                    name="type" 
                    values={toggleValues} 
                    active={this.state.type} 
                    onChange={handleChange}/>
                </div>
            </div>
        )
    }

    setType(val: string) {
        this.setState({type: val})
    }

    setTags(tags: string[]) {
        this.setState({tags: tags})
    }
}
