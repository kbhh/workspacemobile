import React, {Component} from 'react';
import {
    Text,
    SafeAreaView,
    TouchableOpacity,
    View,
    Platform,
    StatusBar,
    DatePickerIOS,
    Slider,
    DatePickerAndroid,
    TimePickerAndroid,
    } from 'react-native';
    import Icon from 'react-native-vector-icons/Ionicons';
  
export default class CustomerDatePicker extends Component {
    constructor(props) {
        super(props);
        this.setDate = this.setDate.bind(this);
        this.state = {
            chosenAndroidTime: '00:00',
            androidDate: `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`,
        };
        this.setDate = this.setDate.bind(this);
        this.setDateAndroid = this.setDateAndroid.bind(this);
        this.setTimeAndroid = this.setTimeAndroid.bind(this);
        this._renderPicker = this._renderPicker.bind(this);
    }

    setDate(newDate) {
      this.props.onSelectedDate(newDate);
    }
      
    setDateAndroid = async () => {
      try {
        const {
          action, year, month, day,
        } = await DatePickerAndroid.open({
        date: new Date(),
        minDate: new Date(),
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          this.props.onAndroidDate(day, month, year);
          this.setState({ androidDate: `${day}/${month + 1}/${year}` });
        }
      } catch ({ code, message }) {
        console.warn('Cannot open date picker', message);
      }
    };
    
    setTimeAndroid = async () => {
      try {
        const { action, hour, minute } = await TimePickerAndroid.open({
          hour: 14,
          minute: 0,
          is24Hour: false, // Will display '2 PM'
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          // Selected hour (0-23), minute (0-59)
          const m = (minute < 10) ? `0${minute}` : minute;
          const h = (hour < 10) ? `0${hour}` : hour;
          console.log(`time: ${hour}:${minute}`);
          this.props.onAndroidTime(h, m);
          this.setState({ chosenAndroidTime: `${h}:${m}` });
        }
      } catch ({ code, message }) {
        console.warn('Cannot open time picker', message);
      }
    };

    _renderPicker() {
      if(Platform.OS == 'ios') {
          return <DatePickerIOS date={this.props.chosenDate} onDateChange={this.setDate}/>
      }else {
          return (
              <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={() => this.setDateAndroid()} style={{paddingRight: 4}}>
                    <View>
                      <Icon name="ios-calendar" size={25} color="#555" />
                      <Text style={[{ fontSize: 16 }]}>
                        {this.state.androidDate}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.setTimeAndroid()}>
                    <View>
                      <Icon name="ios-time" size={25} color="#555" />
                      <Text style={[{ fontSize: 16 }]}>
                        {this.state.chosenAndroidTime}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
          )
      }
    }

    render() {
        return this._renderPicker();
    }
        
}