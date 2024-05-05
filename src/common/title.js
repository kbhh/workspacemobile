import React, {Component} from 'react';
import { Text } from 'react-native';
import styles from '../styles';


const Title = (props) => {
    return (<Text style={[styles.cardTitle]}>{props.text}</Text>)
}

export default Title;