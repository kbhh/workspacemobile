import React from 'react'
import { Container, Toast } from 'native-base'
import { styles } from './styles'
import { Button, Loading } from '../../common'
import FooterActions from './footerActions'
import ImagePicker from "react-native-image-picker"
import { Text, View, TouchableOpacity } from 'react-native'


const PaymentChoice = (props) => (
    <Container style={{...styles.subContainer, alignItems: "center"}} >
    <Text style={styles.title}>Pay Via</Text>
    <View style={{backgroundColor: '#fff', borderRadius: 5, width: '85%'}}>
        <View style={{...styles.desk, margin: 0}}>
        <Text style={styles.deskTitle}>Bank</Text>
        <Text style={styles.deskText}>
        You can pay through banks by depositing the payable amount to one of the banks listed below and upload the bank deposit voucher using your app under ‘My Bookings’ section.
Birhan Bank: Acc. No: 100064756374
Dashen bank: Acc. No: 1753788938574
Press ‘Pay Later’ to save your booking until you do the deposit. Then select ‘Pay Now’ to complete your payment.
        </Text>
        </View>
        <View style={{flexDirection: 'row', width: '100%'}}>
            <TouchableOpacity style={{ borderBottomLeftRadius: 5, backgroundColor: '#2691cf', padding: 10, alignSelf: 'flex-start'}} onPress={() => props.changeState({paymentType: 'bank'}, () => props.book())}>
                <Text style={{color: '#fff', fontFamily: 'Lato-Regular'}}>Pay Now</Text>
            </TouchableOpacity>
            <View style={{flex: 1}}></View>
            <TouchableOpacity style={{ borderBottomRightRadius: 5, backgroundColor: '#2691cf', padding: 10, alignSelf: 'flex-end'}} onPress={() => props.changeState({paymentType: 'bank-later'}, () => props.book())}>
                <Text style={{color: '#fff', fontFamily: 'Lato-Regular'}}>Pay Later</Text>
            </TouchableOpacity>
        </View>
    </View>
    
    <View style={{backgroundColor: '#fff', borderRadius: 5, width: '85%', marginTop: 30}}>
    <View style={{...styles.desk, margin: 0}}>
        <Text style={styles.deskTitle}>Yene Pay</Text>
        <Text style={styles.deskText}>
        YenePay is an online payment platform that you can make payments easily from anywhere in Ethiopia. If you have a ‘YenePay’ account, please select ‘Pay Now’ button to pay for your booking.
        </Text>
        </View>
        <View style={{flexDirection: 'row', width: '100%'}}>
            <TouchableOpacity style={{ borderBottomLeftRadius: 5, backgroundColor: '#2691cf', padding: 10, alignSelf: 'flex-start'}} onPress={() => props.changeState({paymentType: 'yenepay'}, () => props.book())}>
                <Text style={{color: '#fff', fontFamily: 'Lato-Regular'}}>Pay Now</Text>
            </TouchableOpacity>
            <View style={{flex: 1}}></View>
            <TouchableOpacity style={{ borderBottomRightRadius: 5, backgroundColor: '#2691cf', padding: 10, alignSelf: 'flex-end'}} onPress={() => props.changeState({paymentType: 'yenepay-later'}, () => props.book())}>
                <Text style={{color: '#fff', fontFamily: 'Lato-Regular'}}>Pay Later</Text>
            </TouchableOpacity>
        </View>
    </View>
    {props.loading ? <Loading /> : null}
    {/* <FooterActions {...props} actions={actions(props)} /> */}
</Container>
)

export default PaymentChoice