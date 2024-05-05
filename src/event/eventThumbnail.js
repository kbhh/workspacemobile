import React, { Component } from 'react'
import dayjs from 'dayjs'
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native'
import { URL } from '../interceptor';

const defaultPicture = require('../../assets/1.jpg')

class EventThumbnail extends Component {
    

    render(){
        let item = this.props
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EventDetail', {'event': item})} 
                style={{marginBottom: 10, marginLeft: 5, marginRight: 5, borderRadius: 5, backgroundColor: '#fff'}}>
                <View style={{backgroundColor: '#ddd', borderTopRightRadius: 5, borderTopLeftRadius: 5}}>
                    <Image source={item.picture ? {uri: `${URL}Containers/event/download/${item.picture}`} : defaultPicture } style={{width: '100%', height: 200, borderTopLeftRadius: 5, borderTopRightRadius: 5}} />
                </View>
                <View style={{padding: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{flex: 3, color: '#2691cf', fontSize: 14, fontFamily: 'Lato-Regular'}}>{item.title ? item.title : 'Untitled Event'}</Text>
                        <Text style={{alignSelf: 'flex-end', color: '#f5831f'}}>{item.status}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 12}}>{`Start date ${dayjs(item.startDate).format('MMM DD, YYYY')} at ${item.startTime}`}</Text>
                    </View>
                    <Text style={{padding: 10}}>
                        {item.eventDescription ? item.eventDescription.slice(0, 100) : ''}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontFamily: 'Lato-Regular'}}>Type: </Text>
                        <Text>{item.eventType ? item.eventType.name : ''}</Text>
                    </View>
                </View>
                <View style={{borderTopWidth: 1, borderTopColor: '#ddd', padding: 10, flexDirection: 'row'}}>
                <Text style={{flex: 1, textAlign: 'center', alignSelf: 'center'}}>{`${item.guests} Guests`}</Text>
                {item.eventRate ? <Text style={{flex: 1, textAlign: 'center', alignSelf: 'center'}}>{`${item.eventRate.name} \n${item.eventRate.rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB/${item.eventRate.unit}`}</Text>: null}
                {item.eventRate ? <Text style={{flex: 1, textAlign: 'center', alignSelf: 'center'}}>{`${item.eventSpace.name}`}</Text>: null}
                </View>
            </TouchableOpacity>
        )
    }
}

export default EventThumbnail