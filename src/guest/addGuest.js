import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, TextInput} from 'react-native';
import {Input, Button, Loading, Body} from '../common';
import { addGuest, editGuest } from './actions';
import { Container, Content } from 'native-base';
import styles from '../styles';
import HeaderTitle from '../common/HeaderTitle';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      meetupSession: props.navigation.getParam('meetupSession', {}),
      type: 'add',
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      }
    }

    this.onFormDataChange = this.onFormDataChange.bind(this)
    this.emptyForm = this.emptyForm.bind(this)
  }

  componentDidMount(){
    let type = this.props.navigation.getParam('type', 'add')
    this.setState({type: type})
    console.log(type, '=== edit or add ======================')
    if(type === 'edit'){
      const guest = this.props.navigation.getParam('guest', {})
      let form = {
        name: guest.name,
        contact: guest.contact
      }
      this.setState({
        form: form
      })
    }
  }

  static navigationOptions = {
    // title: 'Add Guest'
    headerTitle: <HeaderTitle title='Add Guest' />,
  };

  onFormDataChange(name, value) {
    let form = Object.assign({}, this.state.form)
    form[name] = value
    this.setState({
      form: form
    })
  }

  emptyForm () {
    let form = {
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    }
    this.setState({from: form})
  }

  render() {
    if(this.props.loading)
      return <Loading />
    return (
      <Container>
        <Content style={{...styles.content, padding: 10}}>
          <Input label="First Name"  onChange={text => this.onFormDataChange('firstName', text)} value={this.state.form.firstName}/>
          <Input label="Last Name"  onChange={text => this.onFormDataChange('lastName', text)} value={this.state.form.lastName}/>
          <Input label="Email" keyboardType="email-address"  onChange={text => this.onFormDataChange('email', text)} value={this.state.form.email}/>
          <Input label="Phone" keyboardType="number-pad"  onChange={text => this.onFormDataChange('phone', text)} value={this.state.form.phone}/>
            {
              this.state.type === 'add' ? 
              <View  style={{flexDirection:"row"}}>
              <View style={{width:"40%"}}>
              <Button label="Add More" action={() => this.props.addGuest(this.state.form, this.state.meetupSession, this.emptyForm)} style={{flex:1, backgroundColor:'red'}} />
              </View>
              <View style={{width:"40%"}}>
                <Button label="Finish" action={() => this.props.addGuest(this.state.form, this.state.meetupSession)} style={{flex:1, backgroundColor:'red'}} />
              </View>
            </View>  
            :
            <View style={{flexDirection: 'row'}}>
              <Button label="Save" action={() => this.props.editGuest(this.state.meetupSession, this.state.form)} />
            </View>
            }
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.guestReducer.loading
})

const mapDispatchToProps = (dispatch) => ({
  addGuest: (data, session, moreCallback) => dispatch(addGuest(data, session, moreCallback)),
  editGuest: (session, data) => dispatch(editGuest(session, data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)