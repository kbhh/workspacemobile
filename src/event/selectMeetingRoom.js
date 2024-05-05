import React, { Component } from 'react'
import {Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import { Container, Content } from 'native-base';
import { styles } from './styles';
import HeaderTitle from '../common/HeaderTitle';
import { Loading } from '../common';
import AxiosInstance, { URL } from '../interceptor';

const numberSuper = {
    1: 'st',
    2: 'nd',
    3: 'rd',
}

class SelectMeetingRoomScreen extends Component {
    static navigationOptions = {
        // title: 'Add Event'
        headerTitle: <HeaderTitle title='Select Meeting Room' />,
    };
      
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            meetingRooms: []
        }
    }

    componentDidMount() {
        this.loadMeetingRooms()
    }

    loadMeetingRooms = () => {
        this.setState({
            loading: true
        })
        AxiosInstance.get('MeetingRooms?filter[include]=pricings')
            .then(response => {
                console.log('> response meetins rooms', response)
                this.setState({
                    meetingRooms: response,
                    loading: false
                })
            })
            .catch(error => {
                console.log('error loading meeting rooms', error)
                this.setState({loading: false})
            })
    }

    select = (meetingRoom) => {
        if(meetingRoom.available){
            if(meetingRoom.pricings.length)
                this.props.navigation.navigate('AddMeeting', {meetingRoom: meetingRoom})
            else
                Alert.alert('Selected Meeting room does not have pricing, try another')
        } else {
            Alert.alert('Selected Meeting Room is not available');
        }
    }

    renderLoading() {
        if (this.state.loading) {
            return ( <Loading />)
        } else {
            return null
        }
      }

    render() {
        return (
            <Container>
                <Content style={{...styles.content, paddingTop: 20,}}>
                    <Text style={styles.title}>Which room do you prefer?</Text>
                    <View style={{padding: 20}}>
                        {
                            this.state.meetingRooms.map(meetingRoom => (
                                <TouchableOpacity key={meetingRoom.id} style={{ borderRadius: 5, marginBottom: 20, backgroundColor: '#ddd'}} onPress={() => this.select(meetingRoom)}>
                                    <Image source={{uri: `${URL}/Containers/event/download/${meetingRoom.picture}`}} style={{width: '100%', height: 200, resizeMode: 'stretch', borderTopLeftRadius: 5, borderTopRightRadius: 5}} />
                                    <View style={{backgroundColor: '#fff', borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                                        <View style={{flexDirection: 'row', padding: 10}}>
                                            <Text style={{fontFamily: 'Lato-Regular'}}>{meetingRoom.name}</Text>
                                            <View style={{alignItems: 'flex-end', flex: 1}}>
                                                {/* <Text style={{color: '#f5831f'}}>{meetingRoom.available ? 'Available' : 'Closed'}</Text> */}
                                            </View>
                                        </View>
                                        {/* <Text style={{fontSize: 14, textAlign: "center", borderBottomWidth: 1, borderBottomColor: '#eee'}}>Rates </Text> */}
                                        <View style={{padding: 10, paddingLeft: 20, paddingRight: 20, borderBottomWidth: 1, borderBottomColor: '#eee', borderTopWidth: 1, borderTopColor: '#eee'}}>
                                            {
                                                meetingRoom.pricings ? meetingRoom.pricings.map((pricing, index) => (
                                                    <View key={pricing.id} style={{flexDirection: 'row'}}>
                                                        <Text style={{fontFamily: 'Lato-Regular', fontSize: 12}}>{pricing.name}</Text>
                                                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                                                            <Text style={{fontFamily: 'Lato-LightItalic'}}>{`${(pricing.unitPrice*pricing.duration).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB`}</Text>
                                                        </View>
                                                    </View>
                                                )) : null
                                            }
                                        </View>
                                        <View style={{padding: 10, flexDirection: "row"}}>
                                            <View style={{flex: 1, alignItems: "center"}}>
                                                <Text>{meetingRoom.seats}</Text>
                                                <Text>Seats</Text>
                                            </View>
                                            <View style={{flex: 1, alignItems: "center"}}>
                                            <Text>
                                                {`${meetingRoom.floor}${[1, 2, 3].includes(meetingRoom.floor) ? numberSuper[meetingRoom.floor] : 'th'}`}
                                                
                                                </Text>
                                                <Text>Floor</Text>
                                            </View>
                                            <View style={{flex: 1, alignItems: "center"}}>
                                                <Text>10+</Text>
                                                <Text>Addons</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </Content>
                {this.renderLoading()}
            </Container>
        )
    }
}

export default SelectMeetingRoomScreen