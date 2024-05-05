import React, {Component} from 'react';
import { Text,  View, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';
import ProfileIcon from './profileIcon';
import Member from './member';
import { URL } from '../interceptor';

const CommunityCard = (props) => {
    return (
        <View>
            <TouchableOpacity 
                style={styles.listContainer}
                onPress={() => { 
                    props.navigation.navigate('CompanyDetail', {company:props.company })
                    // console.log('> company', props.company)
                }}>
                    {
                        props.company.currentProfileImage ?
                    <Image style={{width: 50, height: 50, borderRadius: 25, marginRight: 10}} source={
                        {uri: `${URL}/Containers/company/download/${props.company.currentProfileImage}`}
                        } />
                        :
                        <View style={{width: 50, height: 50, borderRadius: 25, marginRight: 10, backgroundColor: '#eee', alignItems: 'center'}}>
                            <Text style={{paddingTop: 5, fontFamily: 'Lato-Heavy', fontSize: 20, alignSelf: "center"}}>{props.company.name.charAt(0)}</Text>
                        </View>
                    }

                <View style={{flexDirection:'column', flex: 1, alignSelf:'center'}}>
                    <Text style={[styles.cardTitle]}>{props.company.name}</Text>
                    <Text style={{color: '#B2AFAF', fontFamily: 'Lato-LightItalic'}}>{props.company.category}</Text>
                </View>
            </TouchableOpacity>
            <View style={{paddingLeft: 16, backgroundColor: '#F8F5F5'}}>
                {/* <FlatList
                    data={props.company.members}
                    extraData={props}
                    keyExtractor={(item, index) => item._id}
                    renderItem={({item}) => <Member listKey={item.id} style={{backgroundColor: '#F8F5F5'}} member={item} />}
                /> */}
                {
                    props.company.members.map(member => (
                        <Member key={member.id} style={{backgroundColor: '#f8f5f5'}} member={member} />
                    ))
                }
            </View>
        </View>
        
    )
};

export default CommunityCard;