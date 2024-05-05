import { StyleSheet, Dimensions } from 'react-native'

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee'
    },
    header: {
        padding: 20,
    },
    title: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        textAlign: 'center',
        color: '#2691cf'
    },
    headerDescription: {
        textAlign: 'center'
    },
    content: {
        // padding: 10
    },
    facilityList: {
        // padding: 5,
        flexDirection: 'column'
    },
    facilityItem: {
        width: 120, 
        height: 100,
        backgroundColor: '#fff',
        paddingTop: 10
    },
    flatView: {
        borderRadius: 5, 
        // alignItems: 'center',
        margin: 5, 
        backgroundColor: '#fff', 
        padding: 5,
        alignItems: 'center'
    },
    raisedView: {
        borderRadius: 5, 
        // alignItems: 'center',
        margin: 5, 
        backgroundColor: '#fff', 
        zIndex:2, 
        width: deviceWidth*0.80, 
        height: deviceHeight*0.23,
        shadowOffset:{  width: 1,  height: 1 }, 
        shadowColor: 'black', 
        shadowOpacity: 0.2,
        padding: 10,
        alignItems: 'center'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: deviceWidth,
        alignSelf: 'center',
        // backgroundColor: '#2691cf',
        height: deviceHeight*0.1
    },
    locationImage: {
        // resizeMode: 'center',
        width: '100%',
        height: 200,
    },
    locationHeaderText: {

    }
})