import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { Button, Input } from '../common'
import HeaderTitle from '../common/HeaderTitle';

export default class App extends Component {
    static navigationOptions = {
      // title: 'Ticket Detail'
      headerTitle: <HeaderTitle title='Ticket Detail' />,
    };
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', backgroundColor: '#fff',
            borderBottomColor: '#D0D0D0', borderBottomWidth: 1, height:650,margin:20,}} 
        >
          <View style={{ padding:10, flexDirection:'column', width:"100%", }}>
            <View style={{flexDirection:'row',  margin: 5, justifyContent:"space-between"}}>
              <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',}}>Title</Text>
              <Text style={{fontSize: 18, color: '#FF7C00',}}>Pending</Text>
            </View>
            <View style={{flexDirection:'row', marginTop:20, marginBottom:40}}>
              <Text style={{fontSize: 14, color:'#6D6D6D' }}>Printer not working</Text>
            </View>
            <View>
              <Text style={{fontSize: 14, color:'#6D6D6D', marginBottom:40}}>
                    Lorem ipsum dolor sit amet, consectetur adip
                    iscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation 
                    ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehen
                    derit in voluptate velit esse cillum dolore
              </Text>
              <Text style={{fontSize: 14, color:'#6D6D6D', marginBottom:40}}>
                    Lorem ipsum dolor sit amet, consectetur adip
                    iscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation 
                    ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehen
                    derit in voluptate velit esse cillum dolore
              </Text>
            </View>
            <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',}}>
                Feedback
            </Text>
            <Input/>
            <Button label="SEND"/>
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
