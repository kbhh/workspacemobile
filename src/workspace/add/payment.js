import React from 'react'
import { View, Container } from 'native-base'
import { styles } from './styles'
import { Button } from '../../common'
import { Image, Text } from 'react-native'

const WorkspacePayment = (props) => (
    <Container style={styles.paymentContainer}>
        <Text>Upload bank deposit voucher</Text>
        <View style={styles.placeholder}>
          <Image source={props.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button label={props.pickedImage ? "Change  " : "Upload bank deposit voucher"} action={props.pickImageHandler} width={props.pickedImage ? '40%' : '90%'}/>
            { props.pickedImage ?
          <Button label="Reset" action={props.resetHandler} width="40%"/>
                : null
            }
        </View>
        <View style={{...styles.button, width: "100%"}}>
        {
            props.pickedImage ? 
        <Button label="Done" disabled={!props.pickedImage} style={{width: '100%'}} action={props.uploadImage}/>
            : null
        }
        </View>
        
    </Container>
)

export default WorkspacePayment