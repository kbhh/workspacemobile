import React, {Component} from 'react';
import { View} from 'react-native';
import styles from '../styles';
import CustomIcon from './icon'

const Icon = (props) => {
    return (
        <View style={[styles.circle]}>
            <CustomIcon name="account" style={[styles.account]}/>
        </View>
    )
};

export default Icon;