import React, {Component} from 'react';
import { Text,  View, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';
import ProfileIcon from './profileIcon';
import { Icon } from 'react-native-elements';
import { URL } from '../interceptor';

const Member = (props) => {
    return (
        <View style={[styles.listContainer, props.style]}>
            {
                props.member.currentProfileImage ?
                    <Image style={{width: 50, height: 50, borderRadius: 25, paddingRight: 10}} source={{uri: `${URL}Containers/account/download/${props.member.currentProfileImage}`}} />
                :
                    <ProfileIcon />
            }
            <View style={{flexDirection:'column', flex: 1, alignSelf:'center'}}>
                <Text style={{color:'#000'}}>{props.member.firstName} {props.member.lastName}</Text>
                <Text style={{color: '#555', fontFamily: 'Lato-LightItalic', fontSize: 12}}>{props.role}</Text>
            </View>
            {
                props.canSendMessage ?
                <TouchableOpacity onPress={() => props.sendMessage(props.member)} style={{alignSelf: 'center'}}>
                    <Icon name="message" color="#999"/>
                </TouchableOpacity>
                : null
            }
            {
                props.canUpdate ?
                <TouchableOpacity onPress={props.delete} style={{alignSelf: 'center'}}>
                    <Icon name="delete" color="#999"/>
                </TouchableOpacity>
                : null
            }
        </View>
    )
};

export default Member;