import React from 'react'
import { styles } from './styles'
import { View } from 'native-base';
import { Button } from '../../common';


const FooterActions = (props) => (
    <View style={styles.footerAction}>
        {
            props.actions.map((action) => (
                <Button label={action.label} backgroundColor='#fff' color='#2691cf' action={() => action.action(action.nextStep)} disabled={action.disabled}/>
            ))
        }
    </View>
)

export default FooterActions