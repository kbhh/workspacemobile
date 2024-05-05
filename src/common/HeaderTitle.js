import React from 'react'
import { Text } from 'react-native'

const HeaderTitle = (props) => (
    <Text style={{fontFamily: 'Lato-Regular', paddingLeft: 10}}>{props.title}</Text>
)

export default HeaderTitle