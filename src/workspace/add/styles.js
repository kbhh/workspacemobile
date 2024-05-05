import { StyleSheet, Dimensions } from 'react-native'

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;


export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        // paddingBottom: 20,
        width: deviceWidth,
        height: deviceHeight
    },
    paymentContainer: {
        alignItems: 'center'
    },
    subContainer: {
        paddingTop: 40,
        // paddingBottom: 240
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        color: '#555',
        fontFamily: 'Lato-Regular'
    },
    footerAction: {
        position: 'absolute',
        bottom: deviceHeight*0.1,
        flexDirection: 'row',
        // flex: 1,
        width: '100%'
        // zIndex: 10
    },
    locationsContainer: {
        marginTop: 10,
        // marginBottom: 10,
        // height: deviceHeight*0.4
    },
    locationItem: {
        borderRadius: 5, 
        // alignItems: 'center',
        margin: 5, 
        backgroundColor: '#fff', 
        zIndex:2, 
        width: deviceWidth, 
        height: deviceHeight*0.2,
        shadowOffset:{  width: 1,  height: 1 }, 
        shadowColor: 'black', 
        shadowOpacity: 0.2,

        flexDirection: 'row'
    },
    emptyLocations: {
        width: '100%',
        alignItems: 'center',

        borderRadius: 5, 
        // alignItems: 'center',
        margin: 5, 
        backgroundColor: '#fff', 
        zIndex:2, 
        // width: deviceWidth*0.90, 
        height: deviceHeight*0.20,
        shadowOffset:{  width: 1,  height: 1 }, 
        shadowColor: 'black', 
        shadowOpacity: 0.2,
        paddingTop: 40
    },
    descriptionText: {
        color: '#555', 
        fontFamily: 'Lato-LightItalic', 
        textAlign: 'center',
        padding: 20,
    },
    locationPictureContainer: {
        flex: 2,
    },
    locationPicture: {
        width: '100%',
        height: '100%'
    },
    locationDetail: {
        flex: 4,
        padding: 5
    },
    desk: {
        borderRadius: 5, 
        // alignItems: 'center',
        margin: 5, 
        backgroundColor: '#fff', 
        zIndex:2, 
        width: deviceWidth*0.80, 
        // height: deviceHeight*0.23,
        shadowOffset:{  width: 1,  height: 1 }, 
        shadowColor: 'black', 
        shadowOpacity: 0.2,
        padding: 10,
        alignItems: 'center'
    },
    hotDesk: {
        backgroundColor: '#2691cf'
    },
    enclosed: {
        backgroundColor: '#4cbae6'
    },
    dedicated: {
        backgroundColor: '#f5831f'
    },
    deskTitle: {
        color: '#4cbae6',
        // fontFamily: 'Lato-Heavy',
        fontSize: 24
    },
    deskText: {
        color: '#555',
        textAlign: 'center',
        fontFamily: 'Lato-LightItalic'
    },
    pickerContainer: {
        width: '100%',
        padding: 20,
        alignItems: 'center'
    },
    picker: {
        width: '80%',
        height: 30,
        borderRadius: 5,
        borderColor: '#999',
        borderWidth: 1
    },
    bill: {
        backgroundColor: '#fff',
        padding: 10,
        width: '100%',
        height: '100%'
    },
    billItemContainer: {
        flexDirection: 'row',
        // flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 30,
        paddingRight: 30
        // marginLeft: 30,
        // marginRigsht: 30
    },
    billItem: {
        flex: 1
    },
    billItemTitle: {
        fontFamily: 'Lato-Heavy',
        color: '#555'
    },
    billItemContent: {
        textAlign: 'right'
    },
    totalContainer: {
        marginTop: 30,
        borderColor: '#555',
        borderTopWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
    },
    textStyle: {
        fontWeight:"bold",
        fontSize:30,
        textAlign:"center",
        color:"red",
        marginTop:10
      },
      placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "70%",
        height: 280,
        marginTop:50,
      },
      button: {
        width: "80%",
        marginTop:20,
        marginLeft: 10,
        flexDirection:"row",
        justifyContent: "space-around"
      },
      previewImage: {
          width: "100%",
          height: "100%"
      },
      buttonSmall: {
          flex: 1,
      }
})