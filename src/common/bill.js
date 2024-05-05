import React from 'react'
import {View, Text} from 'react-native'
import { styles } from '../workspace/add/styles';

const Bill = (props) => (
    <View style={{width: '100%', borderTopWidth: 1, paddingTop: 10}}>
        {
            props.items.map(item => (
                <View style={styles.billItemContainer}>
                    <View style={styles.billItem}>
                        <Text style={styles.billItemTitle}>{item.key}</Text>            
                    </View>
                    <View style={styles.billItem}>
                        <Text style={styles.billItemContent}>{item.value}</Text>
                    </View>
                </View>
            ))
        }
        <View style={styles.billItemContainer}>
            <View style={styles.billItem}>
                <Text style={styles.billItemTitle}>Sub-total</Text>            
            </View>
            <View style={styles.billItem}>
                <Text style={styles.billItemContent}>{props.subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB</Text>
            </View>
        </View>
        <View style={styles.billItemContainer}>
            <View style={styles.billItem}>
                <Text style={styles.billItemTitle}>VAT(15%)</Text>            
            </View>
            <View style={styles.billItem}>
                <Text style={styles.billItemContent}>{(props.subtotal * 0.15).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB</Text>
            </View>
        </View>
        <View style={{...styles.billItemContainer, ...styles.totalContainer}}>
            <View style={styles.billItem}>
                <Text style={{...styles.billItemTitle, fontSize: 20}}>Total</Text>            
            </View>
            <View style={styles.billItem}>
                <Text style={{...styles.billItemContent, fontSize: 20}}> {(props.subtotal * 1.15).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB</Text>
            </View>
        </View>
    </View>
)

export default Bill