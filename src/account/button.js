import React, {Component} from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
import {CustomIcon} from '../common';

export const Button = (props) => {
    return (
        <TouchableOpacity
                style={{
                  flexDirection:"row", marginTop:20, padding: 20, height: 70, 
                  backgroundColor: '#FFFFFF', width: '100%',  alignSelf:"stretch",
                  borderBottomColor: '#D0D0D0', borderBottomWidth: 2}}
                onPress={() => props.action()}>
            <View style={{flex:1, flexDirection:"row", alignItem:"center", }}>
              <CustomIcon name={props.icon} style={{fontSize: 24, color: '#6D6D6D', paddingRight:20, alignSelf:"center"}}/>
              <Text style={{ color: '#6D6D6D', alignSelf: 'center', fontSize: 17}}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    )
  }