import React, {Component} from 'react';
import { ActivityIndicator } from 'react-native';
import styles from '../styles';

const Loading = (props) => {
    return(
        <ActivityIndicator 
                    size="large" 
                    color="#FF7C00" 
                    style={styles.loading} /> 
    )
}

export default Loading;