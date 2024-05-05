import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import {Input, Button, CustomDatePicker, Loading, TextArea} from '../common';
import { addMeetupSession, editMeetupSession } from './actions';
import { Container, Content, Textarea, Item, Label } from 'native-base';
import styles from '../styles';
import HeaderTitle from '../common/HeaderTitle';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: 'add',
      meetupSession: {},
      form: {
        name: '',
        description: '',
        start: new Date(),
        end: new Date(),
      }
    }

    this.onFormDataChange = this.onFormDataChange.bind(this)
    // this.addMeetupSession = this.addMeetupSession.bind(this)
  }

  componentDidMount(){
    const type = this.props.navigation.getParam('type', 'add')
    if(type === 'edit'){
      const meetupSession = this.props.navigation.getParam('meetupSession', {})
      let form = {
        name: meetupSession.name,
        description: meetupSession.description,
        start: meetupSession.start,
        end: meetupSession.end
      }
      this.setState({
        meetupSession: meetupSession,
        form: form,
        type: type
      })
    }
  }

  static navigationOptions = ({ navigation }) => {
    const type = navigation.getParam('type', 'add');
    return {
      // title: type === 'add' ? 'Add New Guest Session' : 'Edit Guest Session',
      headerTitle: <HeaderTitle title={type === 'add' ? 'Add New Guest Session' : 'Edit Guest Session'} />,
    };
  };

  onFormDataChange (name, value) {
    let form = Object.assign({}, this.state.form)
    form[name] = value
    // console.log(name, value)
    this.setState({
      form: form
    })
  }

  // addMeetupSession () {
  //   this.props.addMeetupSession(this.state.form)
  // }

  render() {
    if(this.props.loading)
      return <Loading />

    return (
      <Container>
        <Content style={{...styles.content, backgroundColor: '#fff'}}>
          <View style={{alignSelf:'center', paddingTop: '5%', width: '100%', paddingLeft: 10, paddingRight: 10}} >
            <Input label="Name"  onChange={text => this.onFormDataChange('name', text)} value={this.state.form.name}/>
            <Item stackedLabel>
              <Label>Description</Label>
            <Textarea rowSpan={5} bordered style={{width: '100%'}} onChangeText={text => this.onFormDataChange('description', text)} value={this.state.form.description}/>

            </Item>
            <View style={{paddingLeft: '5%'}}>
            <Text style={{fontFamily: 'Lato-Heavy'}}>Start</Text>
            <CustomDatePicker 
                      onAndroidDate={(day, month, year)=>console.log(day, month, year)}
                      onAndroidTime={(h, m)=>console.log(h, m)} 
                      chosenDate={this.state.form.start}
                      onSelectedDate={(newDate)=>this.onFormDataChange('start', newDate)}/>
            </View>
            {/* <View style={{padding: '5%'}}>
            <Text style={{fontFamily: 'Lato-Heavy'}}>End</Text>
            <CustomDatePicker 
                      onAndroidDate={(day, month, year)=>console.log(day, month, year)}
                      onAndroidTime={(h, m)=>console.log(h, m)} 
                      chosenDate={this.state.form.end}
                      onSelectedDate={(newDate)=>this.onFormDataChange('end', newDate)}/>
            </View> */}
            <View  style={{flexDirection:"row"}}>
              <View>
                {
                  this.state.type === 'add' ?
                    <Button label="ADD MEETUP SESSION" action={() => this.props.addMeetupSession(this.state.form)} style={{flex:1, backgroundColor:'red'}} />
                  :
                    <Button label="SAVE" action={() => this.props.editMeetupSession(this.state.meetupSession, this.state.form)} />
                }
              </View>
            </View>    
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.guestReducer.loading
})

const mapDispatchToProps = (dispatch) => ({
  addMeetupSession: data => dispatch(addMeetupSession(data)),
  editMeetupSession: (session, data) => dispatch(editMeetupSession(session, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)