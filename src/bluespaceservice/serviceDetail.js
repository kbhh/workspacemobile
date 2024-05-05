import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import HeaderTitle from '../common/HeaderTitle';

export default class App extends Component {
    static navigationOptions = {
      // title: 'Service Detail'
      headerTitle: <HeaderTitle title='Service Detail' />,
    };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Service Detail</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
