import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { Container, Header, Footer } from 'native-base'

import HeaderTitle from '../common/HeaderTitle'
import Button from '../common/button'
import { styles } from './styles';

const facilites = [
    {
        icon: 'signal',
        type: 'font-awesome',
        title: 'Hi-Speed Internet'
    },
    {
        icon: 'file-document',
        type: 'material-community',
        title: 'Business address registration'
    },
    {
        icon: 'print',
        type: 'font-awesome',
        title: 'Print copier fax'
    },
    {
        icon: 'user',
        type: 'font-awesome',
        title: 'Receptionist'
    },
    {
        icon: 'calendar-clock',
        type: 'material-community',
        title: '24/7 access'
    },
    {
        icon: 'truck',
        type: 'material-community',
        title: 'Courier'
    },
    {
        icon: 'users',
        type: 'font-awesome',
        title: 'Meeting room'
    },
    {
        icon: 'deskphone',
        type: 'material-community',
        title: 'Phone booths'
    },
    {
        icon: 'video',
        type: 'material-community',
        title: 'Video conferencing'
    },
    {
        icon: 'coffee',
        type: 'material-community',
        title: 'Daily bunna ceremony'
    },
    {
        icon: 'beer',
        type: 'font-awesome',
        title: 'Fruit-infused water'
    },
    {
        icon: 'barcode',
        type: 'font-awesome',
        title: 'Networking events'
    },
]

class Screen extends Component {
    static navigationOptions = {
        headerTitle: <HeaderTitle title='blueSpace Locations' />,
    };

  constructor(props){
      super(props)

      this.state = {

      }
  }

  render(){
      return (
        <Container style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Space Matters.</Text>
                <Text style={styles.headerDescription}>
                Whether you are an international corporate expecting world class standards,
          a remote working consultant, a small local company, a solo entrepreneur,
          a game-changer startup, or a service provider branch office,
          blueSpace has a unique offering for you.
                </Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Facilities</Text>
                <ScrollView style={{paddingLeft: 10}} contentContainerStyle={styles.facilityList} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection: 'row'}}>
                        
                        {
                            facilites.slice(0, 3).map(facility => {
                                return (
                                <View key={facility.title} style={{...styles.facilityItem, ...styles.flatView, paddingTop: 20}} onPress={() => console.log(facility)}>
                                    <Icon name={facility.icon} type={facility.type} color="#4cbae6" size={18}/>
                                    <Text style={{textAlign: "center", fontSize: 12, paddingTop: 10}}>{facility.title}</Text>
                                </View>
                                )
                            })
                        }
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        {
                            facilites.slice(3, 6).map(facility => {
                                return (
                                <View key={facility.title} style={{...styles.facilityItem, ...styles.flatView, paddingTop: 20}} onPress={() => console.log(facility)}>
                                    <Icon name={facility.icon} type={facility.type} color="#4cbae6" size={18}/>
                                    <Text style={{textAlign: "center", fontSize: 12, paddingTop: 10}}>{facility.title}</Text>
                                </View>
                                )
                            })
                        }
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        
                        {
                            facilites.slice(6, 9).map(facility => {
                                return (
                                <View key={facility.title} style={{...styles.facilityItem, ...styles.flatView, paddingTop: 20}} onPress={() => console.log(facility)}>
                                    <Icon name={facility.icon} type={facility.type} color="#4cbae6" size={18}/>
                                    <Text style={{textAlign: "center", fontSize: 12, paddingTop: 10}}>{facility.title}</Text>
                                </View>
                                )
                            })
                        }
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        
                        {
                            facilites.slice(9).map(facility => {
                                return (
                                <View key={facility.title} style={{...styles.facilityItem, ...styles.flatView, paddingTop: 20}} onPress={() => console.log(facility)}>
                                    <Icon name={facility.icon} type={facility.type} color="#4cbae6" size={18}/>
                                    <Text style={{textAlign: "center", fontSize: 12, paddingTop: 10}}>{facility.title}</Text>
                                </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
            <View style={{ ...styles.footer}}>
                <Button label="View Locations" action={() => this.props.navigation.navigate('Location')}/>
                {/* <Text style={{textAlign: 'center', fontFamily: 'Lato-Heavy', color: '#2691cf'}}>View Locations</Text> */}
            </View>
        </Container>
      )
  }
}

export default Screen