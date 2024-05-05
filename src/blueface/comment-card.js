import React, {Component} from 'react';
import { Platform, StyleSheet, View, Text, FlatList, List, Button, Alert , Image} from 'react-native';
import {CustomIcon} from '../common';
import { URL } from '../interceptor';

const Comment = (props) => {
    return (
        <View style={{flexDirection:'row', padding: 10, backgroundColor: '#fff',
                borderBottomColor: '#D0D0D0', borderBottomWidth: 1}}>
            <View style={{}}>
            {
                props.item.user.currentProfileImage ?
                <Image source={{uri: `${URL}Containers/account/download/${props.item.user.currentProfileImage}`}} style={{width: 40, height: 40, borderRadius: 20}} />
                : 
                <CustomIcon name="account" style={{fontSize: 50, color: '#E4E4E4'}}/>
            }
            </View>
            <View style={{flexDirection:'column', flex: 3, paddingLeft: 5}}>
                <Text style={{color: '#B2AFAF'}}>{props.item.user.firstName} {props.item.user.lastName}</Text>
                <View>
                    <Text>{props.item.messageBody}</Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#F1F9FF',
        flexDirection: 'column'
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    backgroundColor: '#01BAE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  }
});

export default Comment;
