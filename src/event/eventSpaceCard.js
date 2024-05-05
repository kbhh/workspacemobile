import React from 'react'
import {View, Image, TouchableOpacity, Text} from 'react-native'
import { URL } from '../interceptor';

const EventSpaceCard = ({eventSpace, select}) => (
    <TouchableOpacity key={eventSpace.id} style={{paddingBottom: 20}} onPress={() => select ? select(eventSpace) : ''}>
        <Image source={{uri: `${URL}Containers/event/download/${eventSpace.image}`}} style={{width: '100%', height: 200, resizeMode: 'stretch', borderTopLeftRadius: 5, borderTopRightRadius: 5}} />
        <View style={{backgroundColor: '#fff', borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
            <View style={{flexDirection: 'row', padding: 10}}>
                <Text style={{fontFamily: 'Lato-Regular'}}>{eventSpace.name}</Text>
                <View style={{alignItems: 'flex-end', flex: 1}}>
                    {/* <Text style={{color: '#f5831f'}}>{eventSpace.available ? 'Available' : 'Closed'}</Text> */}
                </View>
            </View>
            {/* <Text style={{fontSize: 14, textAlign: "center", borderBottomWidth: 1, borderBottomColor: '#eee'}}>Rates </Text> */}
            <View style={{padding: 10, paddingLeft: 20, paddingRight: 20, borderBottomWidth: 1, borderBottomColor: '#eee', borderTopWidth: 1, borderTopColor: '#eee'}}>
                {
                    eventSpace.eventRates ? eventSpace.eventRates.map((eventRate, index) => (
                        <View key={eventRate.id} style={{flexDirection: 'row'}}>
                            <Text style={{fontFamily: 'Lato-Regular', fontSize: 12}}>{eventRate.name}</Text>
                            <View style={{flex: 1, alignItems: 'flex-end'}}>
                                <Text style={{fontFamily: 'Lato-LightItalic'}}>{`${eventRate.rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB / ${eventRate.unit}`}</Text>
                            </View>
                        </View>
                    )) : null
                }
            </View>
            <View style={{padding: 10, flexDirection: "row"}}>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Text>{eventSpace.seats}</Text>
                    <Text>Seats</Text>
                </View>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Text>{eventSpace.standingCapacity}</Text>
                    <Text>Standing Capacity</Text>
                </View>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Text>10+</Text>
                    <Text>Addons</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
)

export default EventSpaceCard