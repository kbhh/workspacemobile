import React, {Component} from 'react';
import { Text,  View} from 'react-native';
import BodyText from './bodyText';
import Title from './title'
import Card from './body'

export default class WorkspaceCard extends Component {

    constructor(props) {
        super(props);
        this._renderContent = this._renderContent.bind(this);
    }

    _renderContent() {
        console.log(this.props)
        let content = null;
        content = this.props.keys.map((key)=> {
            return (
                <View style={{ width:"40%", margin: 5, height:50}}>
                    <Title text={key}/>
                    <BodyText text={this.props[key]} />
                </View>
            )
        })
        return content;
    }
    render (){
        return (
            <Card>
                {this._renderContent()}
            </Card>
        )
    } 
}