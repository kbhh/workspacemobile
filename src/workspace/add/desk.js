import React from 'react'
import { View, Container } from 'native-base'
import { TouchableOpacity, Text, Alert, ScrollView } from 'react-native'
import { styles } from './styles'
import { Button } from '../../common'
import FooterActions from './footerActions';
import PackagesList from '../packagesList';

export const nameMapping= {
    day: 'Daily',
    month: 'Monthly',
    year: 'Yearly'
}

const getName = (package_) => {
    if(package_.duration > 1)
        return `${package_.duration} ${package_.unit}s pass`
    return nameMapping[package_.unit]
}

const PricingTable = (props) => (
    <View>
        {
            props.packages.map(package_ => (
                <View key={package_._id} style={{flexDirection: 'row', width: '100%', paddingLeft: 10, paddingTop: 5}}>
                    <View style={{flex: 1}}>
                        <Text style={{fontFamily: 'Lato-Regular'}}>{getName(package_)}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text>{(package_.priceOfUnit * package_.duration).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB / {props.service.capacity} desk</Text>
                    </View>                        
                </View>
            ))
        }
    </View>
)

const showAlert = (deskType, back)=> {
    Alert.alert(
        'Empty',
        `No available ${deskType}`
      );
}

const WorkspaceDesk = (props) => (
    <Container style={{...styles.subContainer, alignItems: "center"}} >
        <Text style={styles.title}>What kind of workspace do you need?</Text>
        <ScrollView>
        <TouchableOpacity style={{...styles.desk}} onPress={() => props.enclosed.length ? props.selectDesk('enclosed') : showAlert('private office', () => props.prevStep())}>
        <Text style={styles.deskTitle}>Private Office</Text>
            <Text style={styles.deskText}>Private enclosed offices are in prime office space, with big
bright windows, carpeting, and
attractive furnishing.
Offices come in varying sizes,
from 2 desks to 4 desks, 6 desks,
8 desks, and 10 desk suites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.desk}} onPress={() => props.dedicated.length ? props.selectDesk('dedicated') : showAlert('dedicated desks', () => props.prevStep())}>
        <Text style={styles.deskTitle}>Dedicated Desk</Text>
            <Text style={styles.deskText}>Dedicated desks are fixed for
exclusive use by the member
and are located in open
coworking areas with nearby
phone booths for private
conversations, with lockable drawers</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{...styles.desk}} onPress={() => props.hot.length ? props.selectDesk('hot') : showAlert('Day Pass', () => props.prevStep())}>
            <Text style={styles.deskTitle}>Day Pass</Text>
            <Text style={styles.deskText}> Day passes give
                member access to non-
                dedicated workspaces,
                lounges, café, and other areas. Day Pass come in single day
                pass, 10 and 20 day passes,
                and special student weekend
                pass.
            </Text>
        </TouchableOpacity>
        </ScrollView>
        {/* <FooterActions {...props} actions={actions(props)} /> */}
    </Container>
)

export default WorkspaceDesk