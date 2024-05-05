import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import { Icon } from 'react-native-elements'

import axios, { URL } from '../interceptor';
import { styles } from './styles';

const defaultImage = require('../../assets/1.jpg')


class LocationCard extends Component {
    constructor(props){
        super(props)

        this.state = {
            image: 'Containers/location/download/',
            accessToken: ''
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token', (err, token) => {
            if(token) {
                this.setState({accessToken: token, image: this.state.image + this.props.location.profileImage + '?access_token=' + token})
                console.log('> token found', token, this.state.image)
            }
        })
    }

    render(){
        return (
            <TouchableOpacity style={{...styles.flatView, padding: 0, alignItems: 'flex-start'}} onPress={() => {
                this.props.navigation.navigate('LocationDetail', {location: this.props.location, image: this.state.image})
                console.log(`${URL}${this.props.location.profileImage}`)
            }}>
                <Image defaultSource={defaultImage} source={{uri: `${URL}${this.state.image}`}} style={{borderTopLeftRadius: 5, borderTopRightRadius: 5, ...styles.locationImage}}/>
                <View style={{padding: 10}}>
                    <Text style={{...styles.title, textAlign: 'left'}}>{this.props.location.name}</Text>
                    <View style={{padding: 10}}>
                        <Text style={{fontSize: 10}}>{`${this.props.location.addressDescription ? this.props.location.addressDescription.slice(0, 50) : ''}${ this.props.location.addressDescription && this.props.location.addressDescription.length > 50 ? '...' : ''}`}</Text>
                    </View>
                   
                </View>
                <View style={{padding: 10, borderTopColor: '#fff', borderTopWidth: 1, width: '100%', flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row', borderRightColor: '#eee', flex: 1, borderRightWidth: 1, paddingRight: 10}}>
                        <TouchableOpacity style={{padding: 1}}>
                        <Icon name="map-marker" type="font-awesome" size={14} color="#999"/>
                        </TouchableOpacity>
                        <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 10, paddingLeft: 5, paddingRight: 5}}>{this.props.location.address}</Text>
                    </View>
                    <View style={{flexDirection: 'row', borderRightColor: '#eee', flex: 1, borderRightWidth: 1, paddingLeft: 10, paddingRight: 10}}>
                        <TouchableOpacity style={{padding: 1}}>
                        <Icon name="at" type="font-awesome" size={14} color="#999"/>
                        </TouchableOpacity>
                        <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 10, paddingLeft: 5}}>{this.props.location.email}</Text>
                    </View>
                    <View style={{flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
                        <TouchableOpacity style={{padding: 1}}>
                        <Icon name="phone" type="font-awesome" size={14} color="#999"/>
                        </TouchableOpacity>
                        <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 10, paddingLeft: 5}}>{this.props.location.phone}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default LocationCard