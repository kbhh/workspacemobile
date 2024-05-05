import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, TextArea } from 'react-native';
import {Input, Button, Loading, CustomDatePicker} from '../common';
import { addTour } from './actions';
import { Container, Content } from 'native-base';
import styles from '../styles';
import HeaderTitle from '../common/HeaderTitle';

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        start: new Date(),
        // end: new Date(),
        firstName: '',
        lastName: '',
        email: ''
      }
    };
    this.onFormDataChange = this.onFormDataChange.bind(this);
  }

  static navigationOptions = {
    // title: 'Add tour request'
    headerTitle: <HeaderTitle title='Add tour request' />,
  };

  onFormDataChange(name, value) {
    let form = Object.assign({}, this.state.form)
    form[name] = value
    this.setState({
      form: form
    })
  }

  renderLoading() {
    if (this.props.loading) {
      return (
        <Loading />        
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <Container>
        <Content padder style={{...styles.content, backgroundColor: '#fff'}}>
        <View>

        <Input label="First Name"  onChange={text => this.onFormDataChange('firstName', text)}/>
        <Input label="Last Name"  onChange={text => this.onFormDataChange('lastName', text)}/>
        <Input label="Phone" keyboardType="number-pad"  onChange={text => this.onFormDataChange('phone', text)}/>
        <Input label="Email"  onChange={text => this.onFormDataChange('email', text)}/>
          <View>
            <Text style={{fontFamily: 'Lato-Heavy'}}>Start</Text>
            <CustomDatePicker 
                      onAndroidDate={(day, month, year)=>console.log(day, month, year)}
                      onAndroidTime={(h, m)=>console.log(h, m)} 
                      chosenDate={this.state.form.start}
                      onSelectedDate={(newDate)=>this.onFormDataChange('start', newDate)}/>
          </View>
          {/* <View >
              <Text style={{fontFamily: 'Lato-Heavy'}}>End</Text>
              <CustomDatePicker 
                    onAndroidDate={(day, month, year)=>console.log(day, month, year)}
                    onAndroidTime={(h, m)=>console.log(h, m)} 
                    chosenDate={this.state.form.end}
                    onSelectedDate={(newDate)=>this.onFormDataChange('end', newDate)}/>
          </View> */}
          
          <View>
            {/* <TextArea label="Description" onChange={text => this.onFormDataChange('description', text)}/> */}
          </View>
            
          <View>
            <Button label="REQUEST TOUR" action={() => this.props.addTour(this.state.form)} style={{flex:1, backgroundColor:'red'}} />
          </View>  

          </View>  
        </Content>
        {this.renderLoading()}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.tourReducer
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTour: (data) => dispatch(addTour(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Screen);