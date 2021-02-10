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
                    content: `Aut est officiis at. Laboriosam odio repudiandae rerum sed in. Totam quasi pariatur et quibusdam. Animi quae dolorem sed dolore. Doloremque voluptatum qui ut laudantium voluptas hic.
                    Non nam a assumenda repellendus dolores. Voluptatem veritatis illum velit a qui tempore labore ullam. Quidem repudiandae hic non et distinctio dignissimos qui quisquam.
                    Et sed dicta dolorum accusamus ratione et adipisci sequi. Repellendus doloremque aliquam qui. Veritatis commodi eligendi doloribus. Dolorem itaque qui sit numquam beatae dolorem sapiente quibusdam. Eos quia qui laudantium in.
                    Sunt culpa sit in autem pariatur dolor sit enim. In aut quisquam voluptas omnis alias est. Libero ipsum temporibus et assumenda ut at dolorem maiores. Eligendi quo facilis ut et voluptatem aut eaque. Autem ut tenetur illum est.
                    Doloribus ut et corrupti veniam. Velit ut dolor sit reiciendis ut expedita sit corporis. Consequatur animi voluptatibus iste. Facere dolorum autem aut facilis quidem voluptatem doloribus.`,
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
