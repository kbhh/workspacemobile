import React, {Component} from 'react';
import { ScrollView, SafeAreaView, Dimensions, AsyncStorage, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {Button, Loading} from '../common';
import HeaderTitle from '../common/HeaderTitle';
import { CheckBox } from 'native-base';

const cover = require('../../assets/blueSpace-real-1.jpg');
const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions. get('window').width;

const testimonials = [
  {
    name: 'Ravi Shankar',
    position: 'Co-founder, Accelerated Learning',
    testimonial: '“Very flexible, very energetic space, love all the natural light.”',
    img: {uri: 'http://bluespace.work/wp-content/uploads/2019/02/Ravi-130x130.jpg'}
  },
  {
    name: 'Selam Kebede',
    position: 'Ethiopia Country Manager, GrowthAfrica (Kenya)',
    testimonial: '“I love the convenience, and its bright and happy!”',
    img: {uri: 'http://bluespace.work/wp-content/uploads/2019/02/IMG_3006-130x130.jpg'}
  },
  {
    name: 'Matthew Broderick',
    position: 'Executive coach, RocheMartin ',
    testimonial: '“I love working here, such a motivator to work surrounded by other people, like the open space, really bright and spacious, unique in Addis.”',
    img: {uri: 'http://bluespace.work/wp-content/uploads/2019/02/Matthew-1-130x130.jpg'}
  },
  {
    name: 'Hellen Kassa',
    position: 'Country manager, Acasus Consulting (Hong Kong)',
    testimonial: '“A great place for impromptu team meetings, good coffee, and fabulous buzz, full of young working professionals.”',
    img: {uri: 'http://bluespace.work/wp-content/uploads/2019/02/IMG_3007-130x130.jpg'}
  },
  {
    name: "Kirobel Begashaw",
    position: "Consultant",
    testimonial: "“Conducive for work, inspires creativity, awesome for networking and meeting interesting people.”",
    img: {uri: 'http://bluespace.work/wp-content/uploads/2019/02/IMG_3010-1-130x130.jpg'}
  }
]

export default class About extends Component {
  static navigationOptions= {
      // title: 'Welcome',
      // headerTitle: <HeaderTitle title='Welcome' />,
      headerStyle: {
        backgroundColor: 'transparent',
        height: 0,
        // elevation: null
        
    }
  };

  constructor(props) {
    super(props)

    this.state = {
      step: 1,
      checkedSignIn: false,
      signedIn: false,
      checked: false,
      generic: true,
      checkedGeneric: false
    }
  }

  componentDidMount() {
    // AsyncStorage.removeItem('doNotShow')
    AsyncStorage.getItem('doNotShow', (error, doNotShow) => {
      if(error) console.log('> do not show error', error)
      AsyncStorage.getItem('token', (error, token) => {
        if(error) console.log('> error getting token', error)
        if(token !== null) {
          console.log('> found token', token, doNotShow)
          this.setState({
            checkedSignIn: true,
            generic: doNotShow === '1' ? false : true,
            checkedGeneric: true,
            signedIn: true
          })
          return;
        }
        console.log('> no token found', doNotShow, token)
        this.setState({
          checkedSignIn: true,
          signedIn: false,
          checkedGeneric: true,
          generic: doNotShow === '1' ? false : true
        })
      })
    })
}

  changeState = (button) => {
    console.log(button)
    if(button == 'left'){
      this.setState({generic: false})
      
    } else if (button == 'right') {
      this.state.step == 1 ? this.setState({step: 2}) : this.props.navigation.navigate(this.state.checkedSignIn && this.state.signedIn ? 'Home' : 'Signup')
    }
  }

  toggle = () => {
    console.log('> toggle', this.state.checked)
    this.setState({checked: !this.state.checked}, () => {
      AsyncStorage.setItem('doNotShow', this.state.checked ? '1' : '0', (error) => {
        if(error) console.log('> error setting doNotShow', this.state.checked, error)
        else console.log('> set doNotShow', this.state.checked)
      })
    })
  }

  render() {

    if(!this.state.generic)
      this.props.navigation.navigate(this.state.signedIn ? 'Home' : 'Login')

    if(!this.state.checkedGeneric)
      return <Loading />
    console.log(DEVICE_HEIGHT)
    return (
      <SafeAreaView style={{...styles.container, alignItems: 'center', height: DEVICE_HEIGHT}}>
        <Image source={cover} style={{position: "absolute", left: 0, top: 0, resizeMode: 'cover', alignSelf: 'center', width: DEVICE_WIDTH, height: '100%'}} />
        <View style={{ alignSelf: 'center', alignItems: 'center', paddingTop: this.state.step !== 1 ? 20 : '30%', position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: this.state.step == 1 ? 'rgba(255, 255, 255, 0.1)' : '#6d6d6d'}}>
          
          {
            this.state.step == 1 ?
            <View style={{ alignItems: 'center', position: 'absolute', bottom: '20%', padding: 10, paddingBottom: 10, marginTop: 10, alignSelf: 'center', width: DEVICE_WIDTH, height: DEVICE_HEIGHT*0.2}}>
              <View style={{flexDirection: 'row'}}>
                {/* <Text style={{color: '#999', paddingRight: 10, fontSize: 24, alignSelf: 'center'}}>blueSpace</Text> */}
                <Image source={require('../../assets/launch_screen.png')} style={{width: 150, height: 50, resizeMode: 'contain', padding: 0, margin: 0}}/>
              </View>  
              <Text style={{fontFamily: 'Lato-Heavy', fontSize: 20, fontStyle: 'italic', textAlign: 'center'}}>{this.state.step == 1 ? `We spend a lot of our life working` : `Where work meets life`}</Text>
              <Text style={{fontSize: 18, textAlign: "center", fontFamily: 'Lato-LightItalic'}}>{this.state.step == 1 ? `What if we were also living?` : `.`}</Text>
              <Text style={{fontFamily: 'Lato-Heavy', fontSize: 24, color: '#222', paddingTop: 30, margin: 0}}>{`${this.state.isLoggedin ? 'The' : 'Join the'} work-life revolution.`}</Text>

            </View>
            :
            <View style={{ position: 'absolute', bottom: '10%', padding: 10, margin: 10, borderRadius: 15, marginTop: 10, alignSelf: 'center'}}>
              <Text style={{fontFamily: 'Lato-Heavy', fontSize: 24, textAlign: 'center', color: '#fff'}}>Workspace that fits your needs</Text>
              <View style={{paddingTop:10}}>
              <Text style={styles.text}>International corporate?</Text>
              <Text style={styles.text}>Remote consultant?</Text>
              <Text style={styles.text}>Solo entrepreneur?</Text>
              <Text style={styles.text}>Game changer startup?</Text>
              </View>
              <Text style={{fontFamily: 'Lato-Heavy', paddingTop: 20, fontSize: 18, textAlign: 'center', color: '#fff'}}>Let's get Started!</Text>

            </View>
          }
          
        </View>

        <View style={{position: "absolute", bottom: 0, left: 0, right: 0, alignItems: 'center'}}>
          {
            this.state.step == 1 ?
            <Text></Text>
            :
            null
          }
          <View style={{flexDirection: 'row', padding: 10, width: '100%'}}>
            {/* <TouchableOpacity style={{alignSelf: 'flex-start', flex: 1}} onPress={() => this.changeState('left')}>
              <Text style={{fontFamily: 'Lato-Regular', color: '#fff'}}>{this.state.step == 1 ? 'Skip' : 'Login'}</Text>
            </TouchableOpacity> */}
            {
              this.state.step == 2 && this.state.checkedSignIn && this.state.signedIn ?
                <View style={{alignSelf: 'flex-start', flexDirection: "row"}} onPress={() => this.changeState('left')}>
                  <CheckBox checked={this.state.checked} onPress={this.toggle}/>
                  <Text style={{color: '#eee', fontSize: 10, paddingLeft: 15, alignSelf: "center" }}>Do not show this again</Text>
                </View>
                :
                <TouchableOpacity style={{alignSelf: 'flex-start', flex: 1}} onPress={() => this.changeState('left')}>
                  <Text style={{fontFamily: 'Lato-Regular', color: '#fff'}}>{this.state.step == 1 ? 'Skip' : 'Login'}</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => this.changeState('right')} style={{alignSelf: 'center', alignItems: 'flex-end', flex: 1, position: 'relative', left: 0}}>
              <Text style={{fontFamily: 'Lato-Regular', color: '#fff', textAlign: 'left'}}>{this.state.step == 1 ? 'Next' : this.state.checkedSignIn && this.state.signedIn ? 'Home' : 'Signup'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    width: '100%',
    height: '100%'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    textAlign: "center",
    paddingTop: 10,
    // paddingBottom: 10,
    // fontStyle: 'italic'
    fontFamily: 'Lato-Regular'
  }
});
