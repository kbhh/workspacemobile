import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
 
const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  }
});
 
const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../../assets/1.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../../assets/2.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../../assets/3.jpg'),
    imageStyle: styles.image,
    backgroundColor: '#22bcb5',
  }
];
 
export default class App extends React.Component {
  static navigationOptions = {
    header: null,
  };
  _renderItem = props => (
    <View style={{backgroundColor:props.backgroundColor, flex: 1, width: '100%'}}>
      <View>
        <Image source={props.image} style={props.imageStyle} />
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </View>
  );

  _onDone = () => {
    this.props.navigation.navigate('Landing')
  }
  render() {
      return <AppIntroSlider 
                slides={slides} 
                onSkip={this._onDone}
                showSkipButton
                onDone={this._onDone}/>
 
  }
}