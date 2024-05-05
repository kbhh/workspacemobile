import React, {Component} from 'react';
import { Provider } from 'react-redux'
import configureStore from './src/configureStore'
import {StatusBar, Platform, View, AsyncStorage, Text } from 'react-native';
import { StyleProvider, Root } from "native-base";
import createRootNavigation from './src/rootNavigation'
import NavigationService from './src/NavigationService'
import getTheme from "./src/theme/components";
import variables from "./src/theme/variables";
import SplashScreen from 'react-native-splash-screen';
const store = configureStore();
import { retrieveItem } from './src/storage';
import { Loading } from './src/common';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      checkedSignIn: false,
      signedIn: false,
      generic: true
    }
  }

  componentDidMount() {
      // AsyncStorage.removeItem('doNotShow')
      AsyncStorage.getItem('doNotShow', (error, doNotShow) => {
        if(error) console.log('> do not show error', error)
        AsyncStorage.getItem('token', (error, token) => {
          if(error) console.log('> error getting token', error)
          if(token !== null) {
            console.log('> found token', token)
            this.setState({
              checkedSignIn: true,
              generic: doNotShow && doNotShow === '1' ? false : true,
              signedIn: true
            })
            return;
          }
          console.log('> no token found', doNotShow, token)
          this.setState({
            checkedSignIn: true,
            signedIn: false,
            generic: doNotShow && doNotShow === '1' ? false : true
          })
        })
      })
  }

  render() {
    if(!this.state.checkedSignIn) {
      return <Loading />
    }
    const RootNavigation = createRootNavigation(this.state.signedIn, this.state.generic);
    SplashScreen.hide();
    return (
      <Root>
      <StyleProvider style={getTheme(variables)}>
        <Provider store={store}>
          <View style={{flex:1}}>
            <StatusBar
              backgroundColor="#6D6D6D"
              barStyle="dark-content"
              hidden={Platform.OS === 'ios' ? true : false}
            />
            <RootNavigation
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </View>
        </Provider>
      </StyleProvider>
      </Root>
    );
  }
}
