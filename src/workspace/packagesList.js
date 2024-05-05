import React from 'react'
import { Container, View } from 'native-base';
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native'

export const durationDescriptions = {
    30: 'Monthly',
    90: 'Quarterly',
    180: 'Semi-Annually',
    360: 'Annually'
}

const PackagesList = ({packages, selectedPackage, type, selectPackage, service}) => (
    <View style={{margin: 20}}>
        {packages.length ? 
            <View>
                <Text style={{...styles.title, color: '#555', textAlign: 'center'}}>Available Packages</Text>
                <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        packages.map(package_ => (
                            <TouchableOpacity onPress={() => selectedPackage && selectedPackage._id === package_._id ? selectPackage('') : selectPackage(package_)} style={{height: 130}}>
                                <View style={{...styles.packageContainer, backgroundColor: `${selectedPackage ? selectedPackage._id === package_._id ? '#f5831f': '#4cbae6' : '#4cbae6'}`}} onPress={() => console.log(package_)}>
                                    <View style={{flexDirection: 'row'}}>
                                        {
                                            type === 'workspace' ?
                                            <View>
                                                <Text style={styles.descriptionTitle}></Text>
                                                {/* <Text style={styles.description}></Text> */}
                                            </View>
                                            : null
                                        }
                                    </View>
                                    {
                                        type !== 'workspace' ? 
                                        <View>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={styles.descriptionTitle}>Min: </Text>
                                                <Text style={styles.description}>{`   ${package_.targetMin} ${package_.targetType}`}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={styles.descriptionTitle}>Max: </Text>
                                                <Text style={styles.description}>{`   ${package_.targetMax} ${package_.targetType}`}</Text>
                                            </View>
                                        </View>
                                        : null
                                    }
                                    <View style={{alignItems: 'center', flexDirection: 'column', paddingTop: 10}}>
                                    <Text style={styles.price}>{package_.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB</Text>
                                    {
                                        type === 'workspace' ?
                                            <Text style={styles.priceDescription}>{durationDescriptions[package_.time] ? durationDescriptions[package_.time] : `${package_.time} days pass`}</Text>
                                        : null
                                    }
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
        :
         <Text style={styles.noContent}>No Available Packages</Text>
        }
    </View>
)

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Lato-Heavy',
        fontSize: 18,
        marginTop: 20,
        color: '#222'
    },
    noContent: {
        color: '#ddd'
    },
    packageContainer: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#fff',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        width: 130,
        height: 120,
        padding: 10,
        backgroundColor: '#4cbae6',
    },
    contentContainer: {
        // marginTop: 50,
        paddingVertical: 5,
        // backgroundColor: '#F5FCFF',
    },
    descriptionTitle: {
        fontSize: 10,
        color: '#fff',
        fontFamily: 'Lato-Heavy'
    },
    description: {
        fontSize: 12,
        color: '#fff',
    },
    price: {
        fontFamily: 'Lato-Heavy',
        fontSize: 20,
        color: '#fff'
    },
    priceDescription: {
        color: '#fff'
    }
})

export default PackagesList