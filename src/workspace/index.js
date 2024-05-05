import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, View, Icon } from 'native-base'
import { StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native'
import styles from '../styles'
import AddNewButton from './ActionButton';
import { fetchAvailable } from './actions'
import HeaderTitle from '../common/HeaderTitle';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class Screen extends Component {
  static navigationOptions = {
    // title: 'workSpace'
    headerTitle: <HeaderTitle title="workspace" />
  };
  constructor(props){
    super(props)

    this.state = {

    }
  }

  componentDidMount(){
    // this.props.fetchAvailable()
  }

  render(){
    return (
      <Container style={stylesSelf.container}>
        <View>
          <Text style={{textAlign: 'center', fontSize: 18, fontFamily: 'Lato-Regular', color: '#555'}}>Workspace that fits your needs.</Text>
        </View>
        <View style={{alignItems: "center", padding: 20}}>
          <Text style={{color: '#555', fontFamily: 'Lato-LightItalic', textAlign: 'center'}}>
          blueSpace offers a premier workspace experience, whether you need a pass for a day, a dedicated desk for your business, or an office suite for your entire company.
          </Text>
          <Text style={{color: '#555', fontFamily: 'Lato-LightItalic', textAlign: 'center'}}>

We provide furnished and fully serviced workspaces with flexible options along with meeting rooms and event spaces, and lifestyle amenities that make life a little better, every day.
</Text>
<Text style={{color: '#555', fontFamily: 'Lato-LightItalic', textAlign: 'center'}}>

Why put off living while you work?
          </Text>
        </View>
        <View style={{...stylesSelf.createContainer, ...stylesSelf.item, marginBottom: 20}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AddWorkSpace')} style={{width: '100%', paddingTop: 20, paddingBottom: 20}}>
            <View style={{flexDirection: 'column', paddingLeft: 20, alignItems: 'center'}}>
            <Text style={{fontFamily: 'Lato-Heavy', fontSize: 36, ...styles.primary}}>+</Text>
            <Text style={{padding: 10, fontSize: 18}}>Book New</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{...stylesSelf.createContainer, ...stylesSelf.item, marginBottom: 40}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('WorkSpaceList')} style={{width: '100%', paddingTop: 20, paddingBottom: 20}}>
          <View style={{flexDirection: 'column', paddingLeft: 20, alignItems: 'center'}}>
          <Icon style={{fontFamily: 'Lato-Heavy', fontSize: 36, ...styles.primary}} name="calendar"/>
          <Text style={{padding: 10, color: '#555', fontSize: 18}}>My Bookings</Text>
          </View>
        </TouchableOpacity>
        </View>
        {/* <View style={{flexDirection: 'row', margin: 0, marginBottom: 40}}>
            <TouchableOpacity onPress={() => console.log('hot desk')} style={{...stylesSelf.availableContainer, backgroundColor: '#2691cf'}}>
                <Text style={{fontFamily: 'Lato-Heavy', fontSize: 18, color: '#fff'}}>{this.props.hot.length}</Text>
                <Text style={{color: '#fff'}}>Day Pas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('enclosed')} style={{...stylesSelf.availableContainer, backgroundColor: '#4cbae6'}}>
                <Text style={{fontFamily: 'Lato-Heavy', fontSize: 18, color: '#fff'}}>{this.props.enclosed.length}</Text>
                <Text style={{color: '#fff'}}>Private Office</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('dedicated')} style={{...stylesSelf.availableContainer, backgroundColor: '#f5831f'}}>
                <Text style={{fontFamily: 'Lato-Heavy', fontSize: 18, color: '#fff'}}>{this.props.dedicated.length}</Text>
                <Text style={{color: '#fff'}}>Dedicated </Text>
            </TouchableOpacity>
          </View> */}
      </Container>
    )
  }
}

const stylesSelf = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    padding: 20,
    alignItems: 'center'
  },
  createContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // border: 
  },
  item: {
    borderRadius: 5, 
    alignItems: 'center',
    margin: 5, 
    backgroundColor: '#fff', 
    zIndex:2, 
    width: deviceWidth*0.90, 
    // height: deviceHeight*0.20,
    shadowOffset:{  width: 1,  height: 1 }, 
    shadowColor: 'black', 
    shadowOpacity: 0.2,
  },
  availableContainer: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 5, 
    alignItems: 'center',
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    zIndex:2, 
    shadowOffset:{  width: 1,  height: 1 }, 
    shadowColor: 'black', 
    shadowOpacity: 0.2,
    paddingLeft: 0
  }
})

const mapStateToProps = (state) => ({
  ...state.workspaceReducer
})

const mapDispatchToProps = (dispatch) => ({
  fetchAvailable: () => dispatch(fetchAvailable())
})

export default connect(mapStateToProps, mapDispatchToProps)(Screen)