import React, {Component} from 'react';
import { Platform, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Text, FlatList, List, Button, Alert } from 'react-native';
import {CustomIcon} from '../common';

const MessageCard = (props) => {
    return (
        <View style={{flexDirection:'column', padding: 10, backgroundColor: '#fff',
        borderBottomColor: '#D0D0D0', borderBottomWidth: 1}}>
            <View style={{flexDirection:'row'}}>
                <View style={styles.circle}>
                    <CustomIcon name="account" style={{fontSize: 50, color: '#E4E4E4'}}/>
                </View>
                <View style={{flexDirection:'column', flex: 1}}>
                    <Text style={{fontSize: 17, fontFamily: 'Lato-Heavy', color: '#6D6D6D'}}>{props.item.title}</Text>
                    <View style={{flexDirection:'row', flex: 1, justifyContent: 'space-between'}}>
                        <Text style={{color: '#B2AFAF'}}>{props.item.name}</Text>
                        <Text style={{color: '#B2AFAF'}}>{props.item.date}</Text>
                    </View>
                </View>
            </View>
            <View style={{paddingBottom: 10}}>
                <Text>{props.item.body}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize: 17}}>{props.item.comments} </Text>
                    <CustomIcon name="comment" style={{fontSize: 17, color: '#6D6D6D'}}/>
                </View>
                <TouchableWithoutFeedback>
                  <Text style={{ fontSize: 17 }}>COMMENT</Text>
                </TouchableWithoutFeedback>
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

export default MessageCard;
