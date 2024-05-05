import { StyleSheet, Dimensions } from 'react-native';

const {height: screenHeight, width: screenWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  //top container 
  content: {
    backgroundColor: '#eee',
  },
  contentCenter: {
    flex: 1, 
    // height: screenHeight*0.85, 
    paddingTop: 50,
    justifyContent: 'center'
  },
  contentSpaced: {
    justifyContent:'space-evenly',
    backgroundColor: '#eee'
  },
  footerContainer: {
    borderTopWidth: 1, 
    borderColor: '#B4B4B4',
    backgroundColor: '#eee',
  },
  popup: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: screenHeight,
    width: screenWidth,
  },
  loading: {
    position: 'absolute',
    height: screenHeight,
    width: screenWidth,
    backgroundColor: "rgba(0,0,0,0.5)",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999
  },
  feedback: {
    width: '80%', 
    paddingTop: 16,
    backgroundColor: '#F1F9FF',
    alignSelf: 'center', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 5 
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eee',
    width: '100%',
  },
  
  row: {flexDirection:"row"},
  spaced: { justifyContent: 'space-between', },

  
  welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
  },
  cardTitle: { 
    fontFamily: 'Lato-Heavy',
    color: '#6D6D6D'
  },
  body: {
    color: '#6D6D6D',
    marginBottom: 10
  },
  italic: {
    color: '#6D6D6D',
    marginBottom: 10,
    fontFamily: 'Lato-LightItalic'
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    backgroundColor: '#01BAE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  listContainer: {
    flexDirection:'row', 
    padding: 10, 
    backgroundColor: '#fff',
    borderBottomColor: '#D0D0D0', 
    borderBottomWidth: 1
  },
  account: {
    fontSize: 50, 
    color: '#E4E4E4'
  },
  bodyCard: {
    flexDirection: 'column', 
    padding: 15,
    borderRadius: 5, 
    alignItems: 'flex-start',
    justifyContent:'flex-start',
    margin: 16, 
    backgroundColor: '#fff', 
    width: "90%", 
    height: 'auto',
    shadowOffset:{  width: 1,  height: 1,  }, 
    shadowColor: 'black', 
    shadowOpacity: 0.1,
  },
  subWorkspaceTitle:{
    fontSize: 20, 
    fontFamily: 'Lato-Heavy',
    color: '#6D6D6D',
    marginBottom:10, 
    marginTop:10,
  },
  primary: {
    color: '#2691cf',
  },
  secondary: {
    color: '#4cbae6'
  },
  tertiary: {
    color: '#f5831f'
  }

  });

  export default styles;