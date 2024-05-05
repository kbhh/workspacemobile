import React, {Component} from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
    return (
        <TouchableOpacity
                style={{
                    margin: 20, height: 40, backgroundColor: props.backgroundColor ? props.backgroundColor : '#2691cf',
                    borderRadius: 5, alignItems: 'center', borderWidth: 1, borderColor: props.color ? props.color : '#2691cf',
                    justifyContent: 'center', width: props.width ? props.width : '90%',
                    shadowOffset:{  width: 1,  height: 1,  },
                    shadowColor: 'black', shadowOpacity: 0.2 }}
                onPress={() => props.action()}>
            <Text style={{color: props.color ? props.color : '#fff', alignSelf: 'center', fontSize: 18, fontFamily: 'Lato-Heavy'}}>{props.label}</Text>
        </TouchableOpacity>
    )
}

export default Button;
