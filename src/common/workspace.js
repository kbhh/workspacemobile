import React, {Component} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NoContent } from '.';
import WorkspaceItem from './workspaceItem'

export default class Workspace extends Component {

    constructor(props) {
        super(props);
        this._renderContent = this._renderContent.bind(this);
    }

    _renderContent() {
        return (
            <TouchableOpacity 
                style={{
                    flexDirection:'row', backgroundColor: '#fff', flexWrap:'wrap', 
                    borderBottomColor: '#D0D0D0', borderBottomWidth: 1
                }}
                onPress={() => {
                    this.props.navigation.navigate('DetailWorkSpace', {
                    keys: this.props.keys,
                    workspace: this.props.workspace,
                    });
                }}>
                    <WorkspaceItem {...this.props.workspace} keys={this.props.keys} />
            </TouchableOpacity>
        )
    }
    render (){
        return this._renderContent();
    } 
}