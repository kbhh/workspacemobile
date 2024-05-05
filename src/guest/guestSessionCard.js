import React from 'react'
import { Text } from 'react-native'
import { Content, Body, View } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
// import { Body } from '../common';

const GuestAction = (props) => (
    <TouchableOpacity
                style={{
                    margin: 8, height: 10, backgroundColor: 'transparent', alignItems: 'center',
                    justifyContent: 'center',
                    }}
                onPress={() => props.action()}>
            <Text style={{color: props.color, alignSelf: 'center', fontSize: 14}}>{props.label}</Text>
        </TouchableOpacity>
)

const GuestSessionCard = (props) => (
    <Content style={{paddingLeft: 8, paddingRight: 8}}>
        <Body style={{backgroundColor: '#fff', width: '100%', marginTop: 8}}>
            <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={styles.guests}>
                <Text style={{...styles.bold, ...styles.white}}>{props.guest.guests.length}</Text>
                <Text style={{...styles.white, ...styles.guestText}}>guests</Text>
                </View>
                <View style={styles.body}>
                <Text style={styles.title}>{props.guest.name}</Text>
                <View style={{flexDirection: 'row'}}>
                <Text style={styles.dayLabel}>From </Text>
                <Text style={styles.day}>{dayjs(props.guest.start).format('MMM DD, YYYY hh:mm A')} </Text>
                <Text style={styles.dayLabel}>to </Text>
                <Text style={styles.day}>{dayjs(props.guest.end).format('MMM DD, YYYY hh:mm A')}</Text>
                </View>
                <View style={{padding: 3}}>
                    <Text style={styles.description}>
                        {props.guest.description}
                    </Text>
                </View>
                <View style={styles.actions}>
                    <GuestAction label="More" color="#01bae6" action={props.navigate}/>
                    <GuestAction label="Edit" color="#01bae6" action={props.edit}/>
                    <GuestAction label="Delete" color="#ce3c3e" action={props.delete}/>
                </View>
                </View>
            </View>
        </Body>
    </Content>
)

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Lato-Heavy', 
        fontSize: 18,
        color: '#0080c6'
    },
    actions: {
        flexDirection: 'row'
    },
    dayLabel: {
        fontSize: 10,
        color: '#999'
    },
    day: {
        fontSize: 10,
        color: '#999',
        fontFamily: 'Lato-LightItalic'
    },
    description: {
        fontSize: 12,
        color: '#5f5e5e',
        fontFamily: 'Lato-LightItalic'
    },
    bold: {
        fontWeight: "bold",
        fontSize: 18
    },
    guests: {
        flex: 1, 
        flexDirection: 'column',
        backgroundColor: '#01bae6',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingTop: 20,
        height: '100%'
    },
    white: {
        color: '#fff'
    },
    guestText: {
        color: '#00000075',
        fontSize: 18,
        fontFamily: 'Lato-Heavy'
    },
    body: {
        padding: 10,
        flex: 3,
        flexDirection: 'column'
    }
  });

export default GuestSessionCard