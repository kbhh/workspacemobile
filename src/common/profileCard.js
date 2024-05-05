import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Card from './body';
import BodyText from './bodyText';
import Title from './title';
import styles from '../styles';
import { URL } from '../interceptor';
import dayjs from "dayjs";
export default class ProfileCard extends Component {

    constructor(props) {
        super(props);
        this._renderContent = this._renderContent.bind(this);
    }

    _renderContent() {
        let content = null;
        return <View style={{width: '100%'}}>
        {this.props.keys.map((key)=> {
            return (
                <View key={key}>
                    <TouchableOpacity>
                    <Title text={key == 'firstName' ? 'First Name' : key == 'lastName' ? 'Last Name' : key}/>
                    {
                        this.props[key]
                        ? <BodyText text={this.props[key]} /> 
                        : <Text style={[styles.italic]}>No Data</Text>
                    }
                    </TouchableOpacity>   
                </View>
            )
        })}
        {
            this.props.type == 'company' ? null :
            <View>
                <Title text="Date of birth"/>
        <Text>{dayjs(this.props.birthDate).format('MMM DD, YYYY')}</Text>
        <Title text="Identification"/>
        {
            this.props.identificationImage ?
                <View>
                    <Image style={{width: '100%', height: 100, resizeMode: "cover"}} source={{uri: `${URL}Containers/account/download/${this.props.identificationImage}`}}/>
                    <TouchableOpacity onPress={() => this.props.uploadImage('identificationImage')}>
                        <Text>Change</Text>
                    </TouchableOpacity>
                </View>
            :
            <TouchableOpacity onPress={() => this.props.uploadImage('identificationImage')}>
                <Text>Upload ID</Text>
            </TouchableOpacity>
        }
            </View>
        }
        </View>
    }
    render (){
        return (
            <Card>
              {this._renderContent()}
              
            </Card>
        )
    } 
}