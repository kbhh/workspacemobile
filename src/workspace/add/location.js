import React from 'react'
import { View, Container, Row } from 'native-base'
import { TouchableOpacity, ScrollView, Image, Text } from 'react-native'
import { styles } from './styles'
import { Button } from '../../common'
import FooterActions from './footerActions';
import { URL } from '../../interceptor';

const cover = require ('../../../assets/1.jpg');

const LocationCard = (props) => (
    <TouchableOpacity onPress={() => props.selectLocation(props.location)} style={styles.locationItem}>
        <View style={styles.locationPictureContainer}>
        {/* <Text>{`${URL}${props.location.profileImage}`}</Text> */}
            <Image defaultSource={cover} source={{uri: props.getImageUrl(props.location.profileImage)}} style={styles.locationPicture}/>
        </View>
        <View style={styles.locationDetail}>
            <Text style={{...styles.title, color: '#555', textAlign: 'left'}}>{props.location.name}</Text>
            <Text style={{color: '#999', fontSize: 12}}>{props.location.address}</Text>
            <View style={{flexDirection: 'row', padding: 5, width: '100%'}}>
                {/* <Text style={{color: '#999', fontSize: 12, width: '100%'}}>{props.location.addressDescription.replace('\n', ' ').substring(0, 20) + '...'}</Text> */}
            </View>
            {/* <View style={{flexDirection: 'column'}}> */}
                {/* <Text style={{fontSize: 12, fontFamily: 'Lato-Heavy', color: '#555'}}>Contact </Text> */}
                <View style={{padding: 5, flexDirection: 'row'}}>
                <Text style={{fontSize: 12, fontFamily: 'Lato-Heavy', color: '#999'}}>Email: </Text>
                <Text style={{fontSize: 12, fontFamily: 'Lato-LightItalic', color: '#999'}}>{props.location.email}</Text>
                </View>
                <View style={{padding: 5, flexDirection: 'row'}}>
                <Text style={{fontSize: 12, fontFamily: 'Lato-Heavy', color: '#999'}}>Phone: </Text>
                <Text style={{fontSize: 12, fontFamily: 'Lato-LightItalic', color: '#999'}}>{props.location.phone}</Text>
                </View>
            {/* </View> */}
        </View>
    </TouchableOpacity>
)

const WorkspaceLocation = (props) => (
    <Container style={{...styles.subContainer, marginBottom: 60}}>
        <Text style={styles.title}>Which site do you prefer?</Text>
        <Text style={styles.descriptionText}>We have different centers and flexible options for different needs with the principle of Space4Everyone, from global corporates to local startups, with the aim of creating the best possible work experience, to enhance your productivity and your quality of life.
</Text>
    <ScrollView>
        <View style={styles.locationsContainer}>
            {
                props.locations ? props.locations.map(location => (
                    <LocationCard {...props} key={location.id} location={location} key={location._id} />
                ))
                :
                <View style={styles.emptyLocations}>
                    <Text>No available branches</Text>
                </View>
            }
        </View>
        </ScrollView>
        {/* <FooterActions {...props} actions={actions(props)} /> */}
    </Container>
)

export default WorkspaceLocation