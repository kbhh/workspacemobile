import React, {Component} from 'react';
import { AsyncStorage } from 'react-native'
import { StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import {CustomIcon} from '../common';

import { StackActions } from 'react-navigation';
import NavigationService from '../NavigationService';
import axios from '../interceptor';
import { retrieveItem, removeItem } from '../storage'

const routes = [
	{
		key: '1',
		route: "Guest",
		caption: "Guest Sessions",
        icon: "guests",
	},
	{
		key: '2',
		route: "Tour",
		caption: "Request a tour",
		icon: "tour",
	},
	{
		key: '3',
		route: "Help",
		caption: "How to use the app",
        icon: "info",
	},
	// {
	// 	key: '4',
	// 	route: "Settings",
	// 	caption: "Settings",
  //       icon: "settings",
	// },
	{
		key: '5',
		route: "About",
		caption: "About",
		icon: "about-us",
	},
];
const logo = require('../../assets/blueSpace_icon.png');

const Menu = (props) => {
	return (
		<TouchableOpacity onPress={()=> props.onPress()}>
		  <View style={{flexDirection:'row', padding: 20, alignItems: 'center',
		  	borderBottomColor:'#E4E4E4', borderBottomWidth: 0.2}}>
		  	<CustomIcon name={props.item.icon} style={{fontSize: 24, color: '#E4E4E4', paddingRight: 25}}/>
			<Text style={{fontSize: 16, color: '#E4E4E4'}}>
			  {props.item.caption}
			</Text>
		  </View>
		</TouchableOpacity>
	)
};
export default class Sidebar extends Component {
	logout = () => {
		console.log('inside logout')
		const url = 'Accounts/logout';
		let keys = ['token', 'authData', 'userId']

		axios.post(url)
			.then(response => {
				console.log('done logged out')
				AsyncStorage.multiRemove(keys, (error) => {
					if(error) console.log('> error removing data', error)
					NavigationService.navigate('Login')
				})
			})
			.catch(error => {
				console.log('errr logging out')
				AsyncStorage.multiRemove(keys, (error) => {
					if(error) console.log('> error removing data', error)
					NavigationService.navigate('Login')
				})
			})
	}
    render() {
		const signout = {
			key: '7',
			route: "Login",
			caption: "Logout",
			icon: "sign-out",
		};
        return (
            <View styles={{flex: 1, backgroundColor: '#2691cf'}}>
				<View style={{marginTop: 50, padding: 20, borderBottomColor: '#ddd', borderBottomWidth: 1, backgroundColor: '#fff'}}>
					<Image
						style={{width: 50, height: 50, marginBottom: 5}}
					  source={logo}
					/>
					<Text style={{fontSize: 20}}>blueSpace</Text>
					<Text style={{color: '#6D6D6D'}}>Where work meets life</Text>
				</View>
				<View style={{backgroundColor: '#2691cf'}}>
					<FlatList
						data={routes}
						renderItem={({item}) => <Menu item={item} onPress={()=> { this.props.navigation.navigate(item.route) }}/>}
					/>
					<Menu item={ signout } onPress={this.logout} />
				</View>
            </View>
        )
    }
}




// const mapDispatchToProps = dispatch => ({
//     logoutProcessor(){
//         dispatch(logoutProcessor())
//     }
// })
// export default connect(null, mapDispatchToProps)(Sidebar)