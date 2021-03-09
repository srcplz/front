import React, { Component } from 'react'
import styles from '../../styles/sidebar.module.css'
import {ReactComponent as SocialIcon} from '../../img/sourcerers.svg'
import {ReactComponent as EditIcon} from '../../img/edit.svg'
import {ReactComponent as FavoritesIcon} from '../../img/favorites.svg'
import {ReactComponent as FolderIcon} from '../../img/folder.svg'
import {ReactComponent as SearchIcon} from '../../img/search.svg'
import { Link, Route, match } from 'react-router-dom'
import { colors } from '../../utils/colors'

export enum ButtonTypes {
    Search,
    Create, 
    Favorites,
    Social,
    Contributed,
}

interface SideButtonProps {
    collapsed: boolean,
    type: ButtonTypes,
    path: string,
}

export class SideButton extends Component<SideButtonProps, {}>{

    render() {
        return (
            <Route path={this.props.path} children={({match}) => (
                <Link to={this.props.path}>
                    <button className={styles.sidebuttonContainer}>
                        {this.getButtonImage(match)}
                        {this.props.collapsed ? null:
                        <div className={styles.sidebuttonText}>{this.getButtonName()}</div>}
                    </button>
                </Link>
            )}/>
        )
    }

    getButtonImage(match: match<any> | null): JSX.Element  {
        switch (this.props.type) {
            case ButtonTypes.Search:
                return <SearchIcon stroke={this.searchMatches(match) ? colors.relief : colors.fontMedium } fill={this.searchMatches(match) ? colors.relief : colors.fontMedium }/>
            case ButtonTypes.Create:
                return <EditIcon stroke={match ? colors.relief : colors.fontMedium }/>
            case ButtonTypes.Favorites:
                return <FavoritesIcon stroke={match ? colors.relief : colors.fontMedium } fill={match ? colors.relief : colors.fontMedium }/>
            case ButtonTypes.Social:
                return <SocialIcon stroke={match ? colors.relief : colors.fontMedium }/>
            case ButtonTypes.Contributed:
                return <FolderIcon stroke={match ? colors.relief : colors.fontMedium }/>
            default:
                return <img src={'/search.svg'} alt={"Search Icon"}/>
                
        }
    }

    searchMatches(match: match<any> | null): boolean {
        
        return match?.isExact || match?.path.indexOf("search") !== -1
    }

    getButtonName(): String {
        switch (this.props.type) {
            case ButtonTypes.Search:
                return "Search"
            case ButtonTypes.Create:
                return "Create"
            case ButtonTypes.Favorites:
                return "Favorites"
            case ButtonTypes.Social:
                return "Sourcerers"
            case ButtonTypes.Contributed:
                return "My contributions"
            default:
                return ""
        }
    }
}

export default SideButton
