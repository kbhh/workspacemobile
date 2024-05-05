import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { Container, Content, Form, Item, Picker, Label, Icon, Textarea, DatePicker as NativeDatePicker } from 'native-base';
import styles from './styles';
import { CustomDatePicker, Body, Button, Popup, Loading, CustomIcon } from '../common';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'
import HeaderTitle from '../common/HeaderTitle';
import AxiosInstance from '../interceptor';
import Input from '../common/input'

class Screen extends Component {
  static navigationOptions = {
    // title: 'Add Event'
    headerTitle: <HeaderTitle title='Add Event' />,
  };

  constructor(props) {
    super(props);
    this.state = {
      type: {},
      numberOfGuests: '',
      orderDescription: '',
      eventDescription: '',
      startDate: '',
      title: '',
      loading: false,
      eventTypes: [],
      added: false,
      numberOfGuestsError: '',
      validationError: false,
      startDateError: '',
      endDateError: '',
      eventRate: ''
    }
  }

  getEventTypes = () => {
    this.setState({loading: true})
    AxiosInstance.get('EventTypes')
      .then(response => {
        // console.log('> event types ', response)
        this.setState({
          eventTypes: response,
          type: response.length ? response[0] : {}
        })
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.setState({loading: false})
      })
  }

  componentDidMount(){
    this.getEventTypes()
    // let eventSpace = this.props.navigation.getParam('eventSpace', '')
    // if (eventSpace) this.setState({eventSpace: eventSpace, eventRate: eventSpace.eventRates[0], workingHour: eventSpace.eventRates[0].workingHours[0]})
  }

  validateNumberOfGuests = () => {
    console.log('> validating number of guests')
    if(!this.state.numberOfGuests || this.state.numberOfGuests == '')
      this.setState({
        numberOfGuestsError: 'required',
        validationError: true
      })
    else 
      this.setState({numberOfGuestsError: '', validationError: false})
      
    if(isNaN(this.state.numberOfGuests))
      this.setState({
        numberOfGuestsError: 'must be a number',
        validationError: true
      })
    else 
      this.setState({numberOfGuestsError: '', validationError: false})
  }

  book = () =>{
    console.log('> book initiated')
    if(this.state.startDate && this.state.numberOfGuests){
      this.props.navigation.navigate('SelectAddons', {event: {
        ...this.state
      }, eventSpace: this.state.eventSpace})
    }
    else
      this.setState({
        startDateError: this.state.startDate ? '' : 'required',
        numberOfGuestsError: this.state.numberOfGuests ? '' : 'required'
      })
  }

  renderLoading() {
    if (this.state.loading) {
        return ( <Loading />)
    } else {
        return null
    }
  }

  validateStartDate = () => {
    if(!this.state.startDate){
      this.setState({startDateError: 'required'})
    } else {
      let filter = `filter[where][startDate]=${this.state.startDate.toISOString()}`
      filter += `&filter[where][startTime]=${this.state.workingHour.start}`
      filter += `&filter[where][eventSpaceId]=${this.state.eventSpace.id}`
      AxiosInstance.get(`EventBookings?${filter}`)
        .then(response => {
          let startDateError = ''
          if(response.length){
            startDateError = 'Event space you choose is not available, change date or time'
          } else {
            startDateError = ''
          }
          this.setState({startDateError: startDateError})
        })
        .catch(error => {
          this.setState({startDateError: 'Error checking event space availability'})
        })
    }
  }

  renderSuccess() {
    return (
      <Popup
          visible={this.state.added}
          back={()=>this.props.navigation.navigate('Event')}>
          <View style={{
                  width: '80%', paddingTop: 16,
                  alignSelf: 'center', backgroundColor: '#F1F9FF',
                  justifyContent: 'center', alignItems: 'center',
                    borderRadius: 20 }}>
              <Text style={{
                  color:'#6D6F72', 
                  fontSize:18, textAlign: "center",
              }}> Event Registration Successful </Text>
              <CustomIcon name='checked-circle' style={{fontSize: 50, color: '#01BAE6', padding: 10}}/>
          </View>
      </Popup>
    )
  }
 
  render() {
    return (
      <Container>
          <Content style={{backgroundColor: '#fff'}}>
            <Form style={{paddingRight: 10, paddingBottom: 10}}>
              <Input label="Event Title" onChange={text => this.setState({title: text})}/>
              <Item style={{paddingTop: 20}}>
                <Label>Event type </Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ flex: 1}}
                  placeholder="Select event type"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.type}
                  onValueChange={value => this.setState({type: value})}
                >
                  {
                    this.state.eventTypes.map(eventType => (
                      <Picker.Item key={eventType.id} label={eventType.name} value={eventType} />
                    ))
                  }
                </Picker>
              </Item>
              <Input error={this.state.numberOfGuestsError} label="Number of guests "
                value={'' + this.state.numberOfGuests} onBlur={this.validateNumberOfGuests} 
                onChange={text => {this.setState({numberOfGuests: text}); this.validateNumberOfGuests()}} keyboardType="number-pad"/>
              <Item stackedLabel style={{alignItems: 'flex-start'}}>
                  <Label>Start date </Label>
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
                    onDateChange={newDate => this.setState({startDate: newDate})}
                    disabled={false}
                    />
              </Item>
              <Text style={{color: 'red', width: '100%', textAlign: 'right'}}>{this.state.startDateError}</Text>
              <Item stackedLabel style={{alignItems: 'flex-start'}}>
                  <Label>End date </Label>
                  <NativeDatePicker
                    // defaultDate={new Date()}
                    minimumDate={new Date()}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={true}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select end date"
                    // style={{alignSelf: 'flex-start'}}
                    textStyle={{color: '#999', fontFamily: 'Lato-Regular', textAlign: 'left'}}
                    placeHolderTextStyle={{ color: "#d3d3d3", fontFamily: 'Lato-Regular' }}
                    onDateChange={newDate => this.setState({endDate: newDate})}
                    disabled={false}
                    />
              </Item>
              <Text style={{color: 'red', width: '100%', textAlign: 'right'}}>{this.state.startDateError}</Text>
{/* 
              <Item style={{paddingTop: 20}}>
                <Label>Duration</Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ flex: 1}}
                  placeholder="Select event type"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.eventRate}
                  onValueChange={value => this.setState({eventRate: value})}
                >
                  {
                    this.state.eventSpace ? this.state.eventSpace.eventRates.map(eventRate => (
                      <Picker.Item key={eventRate.id} label={eventRate.name} value={eventRate} />
                    )) : null
                  }
                </Picker>
              </Item>
              {
                this.state.eventRate ? 
                <Item style={{paddingTop: 20}}>
                  <Label>Time</Label>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ flex: 1}}
                    placeholder="Select event time"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.workingHour}
                    onValueChange={value => this.setState({workingHour: value})}
                  >
                    {
                      this.state.eventRate.workingHours.map(workingHour => (
                        <Picker.Item key={workingHour} label={`${workingHour.start} - ${workingHour.end}`} value={workingHour} />
                      ))
                    }
                  </Picker>
                </Item>
                :null
              } */}
              {/* <Item stackedLabel>
                  <Label>Order Description</Label>
                  <Textarea rowSpan={5} bordered placeholder="e.g, 5 extra seats"
                    value={this.state.orderDescription}
                    onChangeText={text => this.setState({orderDescription: text})}
                    placeholderStyle={{fontFamily: 'Lato-LightItalic', fontSize: 12}}
                    style={{width: '100%', fontFamily: 'Lato-Light'}}
                    />
              </Item> */}
              <Item stackedLabel>
                  <Label>Event Description</Label>
                  <Textarea rowSpan={5} bordered placeholder="" 
                    value={this.state.eventDescription}
                    onChangeText={text => this.setState({eventDescription: text})}
                    style={{width: '100%', fontFamily: 'Lato-Light'}}
                    />
              </Item>
            </Form>
            <View style={{width: '100%', backgroundColor: '#fff'}}>
              <Button action={this.book} label="Next"/>                  
            </View>
          </Content>
          
            {this.renderLoading()}
          {this.renderSuccess()}
        </Container>
    );
  }
}

const mapStateToProps = (state) => ({

})
const mapDispatchToProps = dispatch => ({
  
})
export default connect(mapStateToProps, mapDispatchToProps)(Screen);