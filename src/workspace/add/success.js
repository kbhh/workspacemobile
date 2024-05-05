import React from 'react'
import { Container } from 'native-base'
import { styles } from './styles'
import { Button, Loading } from '../../common'
import FooterActions from './footerActions'
import ImagePicker from "react-native-image-picker"
import { Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';
import { StackActions } from 'react-navigation';

const SubscriptionSuccess = (props) => (
    <Container style={{...styles.subContainer, alignItems: "center"}} >
        
            <Icon name="check-circle" color="#2691cf" size={70}/>
            
        <Text style={styles.title}>{props.title ? props.title : `Your Workspace subscription submitted successfuly`}</Text>

        <View style={{padding: 20}}>
            <Text style={{textAlign: 'center', fontFamily: 'Lato-LightItalic'}}>
                {
                    props.longText ? props.longText : `Thank you for subscribing to our service. Please complete your profile to get the best out of our services.`
                }
            </Text>
        </View>
        <View style={{flexDirection: 'row', position: 'absolute', right: 0, left: 0, bottom: 100}}>
        {
            props.type == 'event' ? null : 
            <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} style={{backgroundColor: '#2691cf', padding: 10, borderRadius: 5, flex: 1, margin: 5}}>
                <Text style={{color: '#fff', fontFamily: 'Lato-Heavy', alignSelf: 'center'}}>Update Profile</Text>
            </TouchableOpacity>
        }

        <TouchableOpacity onPress={() => {
            const popAction = StackActions.pop({
                n: props.numberOfBack ? props.numberOfBack : 1,
            });
              
            props.navigation.dispatch(popAction);
            props.navigation.navigate(props.onListPress ? props.onListPress : 'WorkSpaceList')
        }} style={{ backgroundColor: '#fff', padding: 10, borderRadius: 5, flex: 1, margin: 5}}>
            <Text style={{color: '#2691cf', fontFamily: 'Lato-Heavy', alignSelf: 'center'}}>My Bookings</Text>
        </TouchableOpacity>
        </View>
    </Container>
)

export default SubscriptionSuccess