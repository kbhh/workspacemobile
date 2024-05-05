import React, { Component } from 'react'
import dayjs from 'dayjs'
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native'
import { URL } from '../interceptor';

class MeetingThumbnail extends Component {
    

    render(){
        let item = this.props
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MeetingDetail', {meeting: item})}
                style={{marginBottom: 10, marginLeft: 5, marginRight: 5, borderRadius: 5, paddingBottom: 10, backgroundColor: '#fff'}}
                >
                {
                    item.paymentMethod == 'bank' ?
                    <Image source={{uri: `${URL}Containers/meeting/download/${item.paymentAttached}`}} style={{width: '100%', height: 150}}/>:null
                }
                <View style={{flexDirection: "row", padding: 10, paddingBottom: 0}} >
                    {/* <Text style={{fontFamily: 'Lato-Regular', color: '#2691cf', flex: 3}}>{item.title ? item.title : 'Untitled Meeting'}</Text> */}
                    <Text style={{color: '#f5831f'}}>{item.status}</Text>
                </View>
                <View style={{paddingLeft: 10, paddingRight: 10, flexDirection: 'row'}}>
                    <Text style={{fontFamily: 'Lato-Regular', fontSize: 12}}>Start </Text>
                    <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 12}}>{dayjs(item.startDate).format('MMM DD, YYYY')} @ {item.startTime}</Text>
                </View>
                <View style={{paddingLeft: 10, paddingRight: 10, flexDirection: 'row'}}>
                    <Text style={{fontFamily: 'Lato-Regular', fontSize: 12}}>Duration </Text>
                    <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 12}}>{item.duration} hour{item.duration > 1 ? 's' : ''}</Text>
                </View>
                <View style={{paddingLeft: 10, paddingRight: 10, flexDirection: 'row'}}>
                    <Text style={{fontFamily: 'Lato-Regular', fontSize: 12}}>Meeting Room </Text>
                    <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 12}}>{item.meetingRoom ? item.meetingRoom.name : ''}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default MeetingThumbnail