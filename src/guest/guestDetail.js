import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { Body, CustomIcon } from '../common';
import NavigationService from '../NavigationService';
import { StackActions } from 'react-navigation';
import dayjs from 'dayjs';
import HeaderTitle from '../common/HeaderTitle';

const GuestContactCard = (props) => {
  return (
      <View style={{backgroundColor: '#fff', height:80}}>
        <View style={{flexDirection:'row',justifyContent:'space-between', width: '100%'}}>
          <View style={{flexDirection:'column'}}>
            <Text style={{fontFamily: 'Lato-Regular'}}>{`${props.guest.firstName} ${props.guest.lastName}`}</Text>
            <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 12}}>{props.guest.email}</Text>
            <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 12}}>{props.guest.phone}</Text>
            {/* <Text>abebe.addisu23@gmail.com</Text> */}
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column', alignSelf:"center", marginRight:15}}>
              <CustomIcon name="edit" style={{fontSize: 15, color: '#6D6D6D'}} onPress={() => props.editGuest(props.guest)}/>
            </View>
            <View style={{flexDirection:'column', alignSelf:"center"}}>
              <CustomIcon name="delete" style={{fontSize: 15, color: '#6D6D6D'}}/>
            </View>
          </View>
        </View>
      </View>
  )
};
export default class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      meetupSession: props.navigation.getParam('meetupSession', {})
    }

    this.addNewGuest = this.addNewGuest.bind(this)
  }

  static navigationOptions = {
    // title: 'Guest Session Detail'
    headerTitle: <HeaderTitle title='Guest Session Detail' />,
  };

  addNewGuest(){
    NavigationService.navigate('AddGuest');
    StackActions.reset({
        index: 0, 
        actions: [NavigationService.navigate('AddGuest', {meetupSession: this.state.meetupSession})]
    });
  }

  editGuest = (guest) => {
    NavigationService.navigate('AddGuest');
    StackActions.reset({
        index: 0, 
        actions: [NavigationService.navigate('AddGuest', {meetupSession: this.state.meetupSession, type: 'edit', guest: guest})]
    });
  }
  render() {
    
    return (
      <ScrollView style={styles.container}>
        <Body style={{padding:20, margin:20, align: 'center', marginTop:60,backgroundColor: '#fff'}}>
          <View style={{flexDirection:"row"}}>
            <View style={{flexDirection:"column",marginRight:30, flex: 1}}>
              <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',paddingBottom:10,}}>Start</Text>
              <Text>{dayjs(this.state.meetupSession.start).format('MMM DD, YYYY')}</Text>
              <Text>{dayjs(this.state.meetupSession.start).format('hh:mm A')}</Text>
            </View>
            <View style={{flexDirection:"column",marginRight:30, flex: 1}}>
              <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',paddingBottom:10,}}>End</Text>
              <Text>{dayjs(this.state.meetupSession.end).format('MMM DD, YYYY')}</Text>
              <Text>{dayjs(this.state.meetupSession.end).format('hh:mm A')}</Text>
            </View>
          </View>
          <Text style={{marginTop: 20, fontFamily: 'Lato-Heavy'}}>{this.state.meetupSession.name}</Text>
          <Text style={{marginTop:20, marginBottom:20}}>
            {this.state.meetupSession.description}
          </Text>
          <View style={{flexDirection:"row", justifyContent:"space-between", width: '100%'}}>
            <View style={{flexDirection:"column",marginRight:30,}}>
              <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',paddingBottom:10,}}>Guests</Text>
              <Text style={{marginBottom:20}}>{this.state.meetupSession.guests ? this.state.meetupSession.guests.length : 0}</Text>
            </View>
            <View style={{flexDirection:"column",marginRight:30,}}>
              <CustomIcon name="add-thin" style={{fontSize: 15, color: '#6D6D6D'}} onPress={this.addNewGuest}/>
            </View>
          </View>
          {
            this.state.meetupSession.guests ? this.state.meetupSession.guests.map(guest => (
              <GuestContactCard guest={guest} key={guest._id} editGuest={this.editGuest}/>
            ))
            : null
          }

        </Body>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
