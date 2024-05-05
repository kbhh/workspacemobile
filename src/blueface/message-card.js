import React, {Component} from 'react';
import { Image, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Text, FlatList, List, Button, Alert } from 'react-native';
import {CustomIcon} from '../common';
import { URL } from '../interceptor';

const MessageCard = (props) => {
    return (
        <View style={{flexDirection:'column', padding: 10, backgroundColor: '#fff',
                borderBottomColor: '#D0D0D0', borderBottomWidth: 1}}>
            <TouchableOpacity onPress={()=>props.comment(props.item)}>
                <View style={{flexDirection:'row', marginBottom: 10}}>
                    <View style={styles.circle}>
                        {
                            props.image ? 
                                <Image source={{uri: `${URL}Containers/account/download/${props.image}`}} style={{width: 50, height: 50, borderRadius: 25}} />
                            :
                                <CustomIcon name="account" style={{fontSize: 50, color: '#E4E4E4'}}/>
                        }
                    </View>
                    <View style={{flexDirection:'column', flex: 1}}>
                        <Text style={{fontFamily: 'Lato-Regular'}}>{props.item.user ? `${props.item.user.firstName} ${props.item.user.lastName}` : ''}</Text>
                        <Text style={{fontFamily: 'Lato-Light', color: '#6D6D6D'}}>{props.item.title}</Text>
                        <View style={{flexDirection:'row', flex: 1, justifyContent: 'space-between', height: 20}}>
                            <Text style={{color: '#B2AFAF', height: 20}}>{props.item.name}</Text>
                            <Text style={{color: '#B2AFAF', height: 20}}>{props.item.date}</Text>
                        </View>
                    </View>
                </View>
                <View style={{paddingBottom: 10}}>
                    <Text>{props.item.messageBody}</Text>
                </View>
                {
                    props.detail === false
                    ? <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize: 17}}>
                                {/* {props.commentBadge}  */}
                                {props.item.comments.length} 
                            </Text>
                            <CustomIcon name="comment" style={{fontSize: 17, color: '#6D6D6D'}}/>
                        </View>
                        <TouchableWithoutFeedback onPress={()=>props.comment(props.item)}>
                        <Text style={{ fontSize: 17 }}>Details</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    : null
                }
            </TouchableOpacity>
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
