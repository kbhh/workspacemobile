import React, { Component } from 'react'
import { Text, View } from 'react-native'
import HeaderTitle from '../common/HeaderTitle';
import { Container, Content, Form, Item, Label, DatePicker as NativeDatePicker, Picker } from 'native-base'
import { styles } from './styles';
import { connect } from 'react-redux';
import { Button, Input, Loading, Popup } from '../common';
import AxiosInstance from '../interceptor';
import DatePicker from 'react-native-datepicker'
import { Icon } from 'react-native-elements';
import dayjs from 'dayjs'
import Bill from '../common/bill';
import moment from 'moment';

const hours = [1, 2, 3]

class AddMeetingScreen extends Component {
    static navigationOptions = {
        headerTitle: <HeaderTitle title='Book A Meeting' />,
    }

    constructor(props){
        super(props)

        this.state = {
            meeting: {

            },
            meetingRoom: '',
            total: 0,
            error: {},
            loading: false,
            available: true,
            modalVisible: false
        }
    }

    validateStartDate = () => {
        // this.setState({loading: true})
        // if(this.state.meeting.)
        // let filter = `filter[where][pricingId]=${this.state.meeting.pricingId}`
        if (!this.state.meeting.startDate) {
            this.setState({
                error: {
                    ...this.state.error,
                    startDate: 'required'
                },
            })
            return;
        }
        let start = this.state.meeting.startDate
        // start.setHours(3, 0, 0, 0)
        console.log(start.toISOString(), start.getHours())
        let filter = `&filter[where][startDate]=${start.toISOString()}`
        filter += `&filter[where][startTime]=${this.state.meeting.startTime}`
        // filter += `&filter[where][status]=approved`
        // filter += `&filter[where][duration]=${this.state.meeting.duration}`
        AxiosInstance.get(`MeetingRooms/${this.state.meetingRoom.id}/bookings?${filter}`)
            .then(response => {
                console.log('> not available in ', response)
                let startError = response.length ? 'The room is not available choose another date or time' : ''
                this.setState({
                    error: {
                        ...this.state.error, startDate: startError
                    },
                    validationError: startError ? true : false
                })
            })
            .catch(error => {
                console.log('> error fetching available')
                this.setState({validationError: true})
            })
    }

    book = () => {
        this.setState({loading: true})
        console.log('sending meeting> ', this.state.meeting)
        if(!this.state.validationError && this.state.meeting.numberOfAttendants && this.state.meeting.startDate) {
            AxiosInstance.post('MeetingBookings', this.state.meeting)
                .then(response => {
                    console.log('> meeting booked', response)
                    this.setState({loading: false}, () => {
                        console.log(response)
                        this.props.navigation.navigate('SelectMeetingAddons', {
                            'meeting': response, 
                            'meetingRoom': this.state.meetingRoom, 
                            'getBillProps': this.getBillProps,
                            'pricing': this.state.pricing
                        })
                    })
                })
                .catch(error => {
                    console.log('> error ', error)
                    this.setState({loading: false})
                })
        } else {
            this.validateNumberOfAttendants()
            this.validateStartDate()
            this.setState({
                error: {
                    ...this.state.error, 
                    numberOfAttendants: this.state.meeting.numberOfAttendants ? '' : 'required',
                    startDate: this.state.meeting.startDate ? '' : 'required'
                },
                loading: false
            })
        }
    }

    validateNumberOfAttendants = () => {
        if(!this.state.meeting.numberOfAttendants){
            this.setState({error: {...this.state.error, numberOfAttendants: 'required'}})
        } else if(isNaN(this.state.meeting.numberOfAttendants)) {
            this.setState({error: {...this.state.error, numberOfAttendants: 'must be a number'}})            
        } else if(this.state.meeting.numberOfAttendants > this.state.meetingRoom.seats) {
            this.setState({error: {...this.state.error, numberOfAttendants: 'exceeded max capacity of meeting room - ' + this.state.meetingRoom.seats}})
        } else {
            this.setState({error: {...this.state.error, numberOfAttendants: ''}})
        }
    }

    validateNumberOfDays = () => {
        if(!this.state.meeting.numberOfDays){
            this.setState({error: {...this.state.error, numberOfDays: 'required'}})
        } else if(isNaN(this.state.meeting.numberOfDays)) {
            this.setState({error: {...this.state.error, numberOfDays: 'must be a number'}})            
        } else {
            this.setState({error: {...this.state.error, numberOfDays: ''}})
        }
    }

    componentDidMount(){
        let meetingRoom = this.props.navigation.getParam('meetingRoom', '')
        console.log('> meeting room', meetingRoom)
        if(meetingRoom){
            this.setState({
                meetingRoom: meetingRoom, 
                pricing: meetingRoom.pricings[0], 
                meeting: {
                    ...this.state.meeting, 
                    meetingRoomId: meetingRoom.id,
                    duration: meetingRoom.pricings[0].duration,
                    startTime: meetingRoom.pricings[0].workingHour[0].start
                }
            })
        }
    }

    getBillProps = () => {
        return {
            subtotal: this.getTotal(),
            items: [
                {
                    key: 'Meeting Room',
                    value: this.state.meetingRoom.name
                },
                {
                    key: 'Number of Attendants',
                    value: this.state.meeting.numberOfAttendants
                },
                {
                    key: 'Start Time',
                    value: this.state.meeting.startTime
                },
                {
                    duration: 'Duration',
                    value: this.state.meeting.duration
                },
                {
                    key: 'Start Date',
                    value: dayjs(this.state.meeting.startDate).format('MMM DD, YYYY')
                },
            ]
        }
    }

    getTotal = () => {
        let total = 0
        total += this.state.pricing ? this.state.pricing.unitPrice * this.state.meeting.duration : 0

        return total
    }

    getStartTimeIntervals = (workingHour) => {
        let timeItervals = []
        let startHour = moment(workingHour.start, 'HH:mm').hour()
        let startMinute = moment(workingHour.start, 'HH:mm').minute()
        let endHour = moment(workingHour.end, 'HH:mm').hour()
        console.log("start hour", startHour, startMinute, endHour)
        
        for(let i = startHour; i < endHour; i++){
            timeItervals.push(`${i}:${startMinute < 10 ? "0": ""}${startMinute}`)
        }
        console.log(timeItervals)

        return timeItervals
    }

    validateStartTime = () => {
        // console.log('> start time', dayjs(this.state.meeting.startTime).format('HH:mm'))
    }

    render(){
        return (
            <Container style={{...styles.container, backgroundColor: '#fff'}}>
                <Content style={{}}>
                    <Form style={{paddingRight: 10}}>
                        {/* <Input label="Meeting Title" onChange={text => this.setState({meeting: {...this.state.meeting, title: text}})} /> */}
                        <Input 
                            error={this.state.error.numberOfAttendants} 
                            value={this.state.meeting.numberOfAttendants} 
                            label="Number of Attendants"
                            keyboardType="number-pad"
                            onBlur={this.validateNumberOfAttendants}
                            onChange={text => this.setState({meeting: {...this.state.meeting, numberOfAttendants: text}}, () => this.validateNumberOfAttendants())}/>
                        
                        {/* <Input error={this.state.error.numberOfDays} 
                            value={this.state.meeting.numberOfDays} 
                            onBlur={this.validateNumberOfDays}
                            label="Number of Days" 
                            onChange={text => this.setState({meeting: {...this.state.meeting, numberOfDays: text}}, () => this.validateNumberOfDays())}/>
                         */}
                          <Item stackedLabel picker style={{alignItems: 'flex-start'}}>
                            <Label>Start Date</Label>
                            <NativeDatePicker
                                // defaultDate={new Date()}
                                minimumDate={new Date()}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={true}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select start date"
                                // style={{alignSelf: 'flex-start'}}
                                textStyle={{color: '#999', fontFamily: 'Lato-Regular', textAlign: 'left'}}
                                placeHolderTextStyle={{ color: "#d3d3d3", fontFamily: 'Lato-Regular' }}
                                onDateChange={newDate => this.setState({meeting: {...this.state.meeting, startDate: newDate}}, () => this.validateStartDate())}
                                disabled={false}
                                />
                        </Item>
                        <Text style={{flex: 1, textAlign: 'right', color: 'red'}}>{this.state.error.startDate}</Text>

                        <Item stackedLabel picker>
                            <Label>Select Meeting time</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: '100%'}}
                                placeholder="Select event type"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.pricing}
                                onValueChange={value => this.setState({pricing: value, meeting: {...this.state.meeting, pricingId: value.id, duration: value.duration, startTime: value.workingHour[0].start}}, () => this.validateStartDate())}
                                >
                                {
                                    this.state.meetingRoom && this.state.meetingRoom.pricings.length ? this.state.meetingRoom.pricings.map(pricing => (
                                        <Picker.Item key={pricing.id} label={`${pricing.name}`} value={pricing} />
                                    )): null
                                }
                                </Picker>
                        </Item>
                        <Text style={{paddingLeft: 20, fontFamily: 'Lato-Light', fontSize: 12}}>{this.state.pricing ? this.state.pricing.workingHour.map((element, index) => {
                                    return `(${element.start} - ${element.end}) ${index !== this.state.pricing.workingHour.length - 1 ? '/ ' : ''}`
                                }) : ''}</Text>
                        {
                            this.state.pricing  && this.state.pricing.duration === 1?
                            <View style={{flexDirection: 'row'}}>
                            <Item stackedLabel picker style={{flex: 1, alignItems: "flex-start"}}>
                                <Label>Start time</Label>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: '100%'}}
                                    placeholder="Select start time"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.meeting.startTime}
                                    onValueChange={value => this.setState({meeting: {...this.state.meeting, startTime: value}}, () => this.validateStartDate())}
                                >
                                    {
                                        this.state.pricing && this.state.pricing.workingHour[0] ? 
                                            this.getStartTimeIntervals(this.state.pricing.workingHour[0]).map(interval => (
                                                <Picker.Item label={interval} key={interval} value={interval}/>
                                            )): null
                                    }
                                </Picker>
                                    </Item>
                            <Item stackedLabel picker style={{flex: 1}}>
                                <Label>Duration</Label>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{width: '100%'}}
                                    placeholder="Select meeting duration"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.meeting.duration}
                                    onValueChange={value => this.setState({meeting: {...this.state.meeting, duration: value}}, () => console.log(this.state.meeting.duration))}
                                    >
                                    {
                                        [1, 2, 3].map(duration => (
                                            <Picker.Item key={duration} label={`${duration} hour${duration>1?'s':''}`} value={duration} />
                                        ))
                                    }
                                </Picker>
                            </Item>
                        </View>
                        : 
                        <View>
                            <Item stackedLabel picker>
                                <Label>Start Time</Label>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{width: '100%'}}
                                    placeholder="Select meeting duration"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.meeting.startTime}
                                    onValueChange={value => this.setState({meeting: {...this.state.meeting, startTime: value}}, () => this.validateStartDate())}
                                    >
                                    {
                                        this.state.pricing ? this.state.pricing.workingHour.map(workingHour => (
                                            <Picker.Item key={workingHour.start} label={`${workingHour.start}`} value={workingHour.start} />
                                        )):null
                                    }
                                </Picker>
                            </Item>
                        </View>
                        }
                    </Form>
                </Content>
                <Popup visible={this.state.modalVisible} back={() => this.setState({modalVisible: false})}>
                        <View style={{alignSelf: 'center', marginLeft: 10, marginRight: 10, width: '95%', backgroundColor: '#fff'}} onPress={() => props.setModalVisible(!props.modalVisible)}>
                            <Bill {...this.getBillProps()} />
                            {/* <Button action={() => props.setModalVisible(!props.modalVisible)} label="Ok" /> */}
                        </View>
                    </Popup>
                <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderTopWidth: 1, borderBottomWidth: 1}}>
                    <View style={{flex: 3, flexDirection: 'row'}}>
                        <Text style={{fontFamily: 'Lato-Heavy', fontSize: 18, paddingRight: 10}}>Total</Text>
                        <Icon size={25} name="info" onPress={() => this.setState({modalVisible: true})}/>
                    </View>
                    <Text>{(this.getTotal()*1.15).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB</Text>
                </View>
                <Button label="Next" action={this.book}/>

                {
                    this.state.loading ?
                    <Loading />
                    :null
                }
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AddMeetingScreen)