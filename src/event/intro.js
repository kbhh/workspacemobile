import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Container } from 'native-base'

import { styles } from '../location/styles'
import HeaderTitle from '../common/HeaderTitle'
import { Icon } from 'react-native-elements';

const cover = require('../../assets/event.jpg')

class EventIntroScreen extends Component {
    static navigationOptions = {
        headerTitle: <HeaderTitle title='Events' />,
    };
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return (
            <Container style={{...styles.container, alignItems: "center"}}>
                <Image source={cover} style={{width: '100%', height: 200}}/>
                <Text style={{paddingTop: 10, ...styles.title}}> Host Events in Style.</Text>
                <Text style={{...styles.headerDescription, padding: 10, fontSize: 12}}>
                Whether you need a company off-site retreat for 5, a seated workshop for 50, a catered 
                reception for 200, an art show or product launch, or anything in between, we offer inspiring
                unique spaces and customized event planning, from the right lighting, branding, décor, floral,
                 AV, and catering, with meticulous attention to every detail.
                </Text>
                <View style={{margin: 10, flexDirection: "row"}}>
                    <TouchableOpacity style={{...styles.flatView, flex: 1}} onPress={() => this.props.navigation.navigate('AddTour')}>
                        <Icon name="plus" type="material-community" color="#2691cf" />
                        <Text>Book A Tour </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.flatView, flex: 1}} onPress={() => this.props.navigation.navigate('SelectMeetingRoom')}>
                        <Icon name="account-group" type="material-community" color="#2691cf" />
                        <Text>Book A Meeting Room</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
                    <TouchableOpacity style={{...styles.flatView, flex: 1, padding: 10}} onPress={() => this.props.navigation.navigate('AddEvent')}>
                        <Icon name="calendar-plus" type="material-community" color="#2691cf" />
                        <Text>Book An Event</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', padding: 10, position: 'absolute', bottom: 0}}>
                    <TouchableOpacity style={{...styles.flatView, backgroundColor: '#2691cf', flex: 1}} onPress={() => this.props.navigation.navigate('Event')}>
                        <Text style={{color: "#fff", fontFamily: 'Lato-Regular'}}>My Bookings</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        )
    }
}

export default EventIntroScreen