import React from 'react'
import { Text } from 'react-native'
import {View} from 'native-base'
import { TouchableOpacity } from 'react-native'

const AddNewButton = ({styles}) => (
    <TouchableOpacity onPress={() => console.log('add new workspace')} style={{width: '100%', paddingTop: 20, paddingBottom: 20}}>
        <View style={{flexDirection: 'column', paddingLeft: 20, alignItems: 'center'}}>
        <Text style={{fontFamily: 'Lato-Heavy', fontSize: 36, ...styles.primary}}>+</Text>
        <Text style={{padding: 10}}>Subscribe new workspace</Text>
        </View>
    </TouchableOpacity>
)

export default AddNewButton