import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Icon } from 'react-native-elements';
import { Popup, Input, Button, Loading } from '../common';
import { Form, Item, Label } from 'native-base';
import AxiosInstance from '../interceptor';

class Guests extends Component{
    constructor(props){
        super(props)

        this.state = {
            guests: [],
            current: {},
            modalVisible: false,
            currentMode: 'add'
        }
    }

    componentDidMount(){
        this.getGuests()
    }

    getGuests = () => {
        this.setState({loading: true})
        let filter = `filter[where][type]=${this.props.type}`
        if(this.props.type == 'event')
            filter += `&filter[where][eventBookingId]=${this.props.item.id}`
        else 
            filter += `&filter[where][meetingBookingId]=${this.props.item.id}`
        
        AxiosInstance.get(`Guests?${filter}`)
            .then(response => {
                console.log('> guests', response.length)
                this.setState({
                    guests: response,
                    loading: false,
                    modalVisible: false
                })
            })
            .catch(error => {
                console.log('> error fetching guests', error)
                this.setState({loading: false})
            })
    }

    add = () => {
        this.setState({loading: true, modalVisible: false})
        let data = {...this.state.current}
        if(this.props.type == 'event') {
            data['eventBookingId'] = this.props.item.id
            data['type'] = 'event'
        } else {
            data['meetingBookingId'] = this.props.item.id
            data['type'] = 'meeting'
        }
        console.log('> data', data)
        AxiosInstance.post('Guests', data)
            .then(response => {
                this.getGuests()
            })
            .catch(error => {
                this.setState({loading: false})
            })
    }

    delete = (guest) => {
        this.setState({modalVisible: false, loading: true})
        AxiosInstance.delete(`Guests/${guest.id}`)
            .then(response => {
                this.setState({loading: false}, () => this.getGuests())
            })
            .catch(error => {
                console.log('> error deleting guest', error)
                this.setState({loading: false})
            })
    }

    edit = () => {
        this.setState({loading: true, modalVisible: false})
        AxiosInstance.patch('Guests', this.state.current)
            .then(response => {
                console.log('> edit done', response)
                this.setState({current: {}, currentMode: 'add', loading: false}, () => this.getGuests())
            })
            .catch(error => {
                this.setState({loading: false, modalVisible: false})
                console.log('> edit error ', error)
            })
    }

    action = () => {
        if(this.state.currentMode == 'add') this.add()
        else this.edit()
    }


    render(){
        return (
            <View>
                <View style={{marginBottom: 5, flexDirection: 'row', padding: 10, paddingTop: 10, borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#ddd'}}>
                    <Text style={{flex: 3, fontFamily: 'Lato-Regular',alignSelf: 'center'}}>Invited {this.props.type == 'event' ? 'Guests' : 'Attendants'} </Text>
                    <TouchableOpacity style={{}} onPress={() => this.setState({current: {}, modalVisible: true})}>
                        <Icon name="add" color="#2691cf"/>
                    </TouchableOpacity>
                </View>
                {
                    this.state.guests.length ? 
                        this.state.guests.map(guest => (
                            <View key={guest.id} style={{padding: 5, borderRadius: 5, margin: 10, marginTop: 0, backgroundColor: '#eee', flexDirection: 'row'}}>
                                <View style={{flex: 3}}>
                                    <Text style={{fontFamily: 'Lato-Regular'}}>{`${guest.firstName} ${guest.lastName}`}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon name="email" color="#222" size={14}/>
                                        <Text style={{marginLeft: 10, fontFamily: 'Lato-LightItalic', alignSelf: 'center'}}>{guest.email}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon name="phone" color="#222" size={14}/>
                                        <Text style={{marginLeft: 10, fontFamily: 'Lato-LightItalic', alignSelf: 'center'}}>{guest.phone}</Text>
                                    </View>
                                    {/* <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontStyle: "italic"}}>Status</Text>
                                        <Text style={{marginLeft: 10, fontFamily: 'Lato-LightItalic',}}>Invitation {guest.status}</Text>
                                    </View> */}
                                </View>
                                <View style={{alignSelf: 'center'}}>
                                    {/* <Text>{guest.status}</Text> */}
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity style={{margin: 5}} onPress={() => this.setState({current: guest, currentMode: 'edit', modalVisible: true})}>
                                            <Icon name="edit" color="#999" size={14}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{margin: 5}}>
                                            <Icon name="delete" color="#999" size={14} onPress={() => this.delete(guest)}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))
                    : <Text style={{paddingLeft: 20, fontFamily: 'Lato-LightItalic', color: '#ddd'}}>No Invited guests added yet</Text>
                }
                <Popup
                    visible={this.state.modalVisible}
                    back={() => this.setState({current: {}, modalVisible: false})}
                >
                    <Form style={{width: '90%', backgroundColor: '#fff', padding: 10, borderRadius: 5}}>
                        <Text style={{textAlign: "center", fontFamily: 'Lato-Heavy'}}>{this.props.type == 'event' ? 'Guest' : 'Attendant'}</Text>
                        <Input label="First Name" value={this.state.current.firstName} onChange={text => this.setState({current: {...this.state.current, firstName: text}}, () => console.log('> state ', this.state.current))}/>
                        <Input label="Last Name" value={this.state.current.lastName} onChange={text => this.setState({current: {...this.state.current, lastName: text}}, () => console.log('> state ', this.state.current))}/>
                        <Input label="Email" keyboardType="email-address" value={this.state.current.email} onChange={text => this.setState({current: {...this.state.current, email: text}}, () => console.log('> state ', this.state.current))}/>
                        <Input label="Phone" keyboardType="number-pad" value={this.state.current.phone} onChange={text => this.setState({current: {...this.state.current, phone: text}}, () => console.log('> state ', this.state.current))}/>

                        <Button label={this.state.currentMode == 'add'? `Add ${this.props.type == 'event' ? 'Guest': 'Attendant'}` : 'Save'} action={this.action}/>
                    </Form>
                </Popup>
                {
                    this.state.loading ?
                    <Loading />
                    :null
                }
            </View>
        )
    }
}

export default Guests