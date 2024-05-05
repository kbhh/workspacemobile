import React, {Component} from 'react';
import { Text,  View} from 'react-native';
import BodyText from './bodyText';
import Title from './title'

export default class WorkspaceItem extends Component {

    constructor(props) {
        super(props);
        this._renderContent = this._renderContent.bind(this);
    }

    _renderContent() {
        let content = null;
        content = this.props.keys.map((key)=> {
            return (
                <View style={{ width:"40%", margin: 5, height:50}}>
                    <Title text={key}/>
                    <BodyText text={key == 'approved' ? this.props[key] == true ? 'Yes' : 'No' : this.props[key]} />
                </View>
            )
        })
        return content;
    }
    render (){
        return this._renderContent();
    } 
}