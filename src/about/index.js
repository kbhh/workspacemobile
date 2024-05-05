import React, {Component} from 'react';
import { Text, TouchableOpacity, Linking} from 'react-native';
import styles from '../styles';
import HeaderTitle from '../common/HeaderTitle';
import { Container, Content } from 'native-base';

export default class About extends Component {
    static navigationOptions = {
      drawerLabel: 'About',
      // title: 'About'
      headerTitle: <HeaderTitle title="About" />
    };
  render() {
    return (
      <Container style={{...styles.container, backgroundColor: '#fff'}}>
        <Content scrollEnabled padder style={{backgroundColor: '#fff'}} contentContainerStyle={{alignItems: 'center'}}>
            <Text style={{fontFamily: 'Lato-Heavy', fontSize: 24}}>We want to disrupt work itself.</Text>
            <Text style={{fontFamily: 'Lato-Light', fontSize: 18, textAlign: 'center'}}>Our mission is to create beautiful workspaces that connect people, enhance work, and create joy.</Text>

            <Text style={{fontFamily: 'Lato-Heavy', fontSize: 18, paddingTop: 100, paddingBottom: 10}}>We believe.</Text>
            <Text>In a brighter future.</Text>
            <Text>In Africa’s growth and shared prosperity.</Text>
            <Text>In private enterprise and supporting business.</Text>
            <Text>In our youth and their dreams and aspirations.</Text>
            <Text style={{textAlign: "center"}}>That work and life can meet, and that is when magic happens.</Text>
            <Text>That everyone deserves a wonderful place to work.</Text>
            <Text>In staying humble and respectful.</Text>
            <Text>In excellence and execution.</Text>
            <Text>That we are better together.</Text>
            <TouchableOpacity onPress={() => {
                    Linking.canOpenURL('http://bluespace.work/why-we-exist').then(supported => {
                      if (supported) {
                        Linking.openURL('http://bluespace.work/why-we-exist');
                      } else {
                        console.log("Don't know how to open URI: " + 'http://bluespace.work/why-we-exist');
                      }
                    });
            }} >
              <Text style={{fontFamily: 'Lato-Regular', paddingTop: 10}}>Read More</Text>
            </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}