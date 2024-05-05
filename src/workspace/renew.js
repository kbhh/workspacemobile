import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import HeaderTitle from '../common/HeaderTitle';

export default class WorkSpace extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Renew Workspace',
      headerRight: (<TouchableOpacity onPress={() => navigation.navigate('AddWorkSpace')}>
                      <CustomIcon name="edit" style={{marginRight:20, padding: 10, fontSize: 28, color: '#6D6D6D'}}/>
      </TouchableOpacity>)
    }
  };
    static navigationOptions = {
      // title: 'WorkSpace Renew'
      headerTitle: <HeaderTitle title='Renew workSpace' />,
    };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Renew Workspace</Text>
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
