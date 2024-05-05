import React, {Component} from 'react';
import { Text } from 'react-native';
import styles from '../styles';

const BodyText = (props) => {
    return (<Text style={[styles.body]}>{props.text}</Text>)
}

export default BodyText;