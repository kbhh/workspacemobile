import React, {Component} from 'react';
import { StyleSheet, Text, View,TextInput} from 'react-native';
import {Button} from '../common';
import HeaderTitle from '../common/HeaderTitle';

export default class App extends Component {
    static navigationOptions = {
      // title: 'Message'
      headerTitle: <HeaderTitle title='Message' />,
    };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ margin: 20, backgroundColor:"#fff", height:600,}}>
          <View style={{padding:20}}>
            <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',marginBottom:5, marginTop:10}}>From</Text>
            <Text style={{marginBottom:10}}>Alemu Getachew</Text> 
            <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',marginBottom:5, marginTop:30}}>To</Text>
            <Text style={{marginBottom:10}}>Solomon Eyasu</Text>
          
            <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',marginBottom:5, marginTop:10}}>Subject</Text>
            <TextInput editable = {true} maxLength = {40} style={{backgroundColor: '#F1F9FF',height:50, borderRadius:5,}}/>

            <Text  style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',marginBottom:5, marginTop:10}}>Body: </Text>
            <TextInput editable = {true} maxLength = {40} style={{ backgroundColor: '#F1F9FF',height:200, borderRadius:5,}}/>
          
            <Button style={{marginTop:60,}} label="SEND" action={() => this.login()} />
          </View>
        </View>
      </View>
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
