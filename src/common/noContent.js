import React, {Component} from 'react';
import { Text,  View} from 'react-native';
import styles from '../styles';
import { Container } from 'native-base';

const NoContent = (props) => {
    return (
        <Container style={{backgroundColor: '#fff'}}>
            <View style={{flexDirection:'column', flex: 1, alignSelf:'center', paddingTop: 50, backgroundColor: '#fff'}}>
                <Text style={{color: '#B2AFAF', fontSize: 28, textAlign:'center', fontFamily: 'Lato-Light'}}>{props.text}</Text>
            </View>
        </Container>
    )
};

export default NoContent;