import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { styles } from './styles';
import { Body } from '../common';
import { Container, Content } from 'native-base';
import HeaderTitle from '../common/HeaderTitle';
import { Icon } from 'react-native-elements';
import AxiosInstance, { URL } from '../interceptor';
import { fetchAvailable } from '../workspace/actions';
import { connect } from 'react-redux';

const unitDescription = {
  day: 'Daily',
  month: 'Monthly',
  year: 'Yearly'
}

const Services = (props) => {
  return (
    <View 
          style={{flexDirection:'row', backgroundColor: '#fff',
            borderBottomColor: '#D0D0D0', borderBottomWidth: 1, height:55,}} >
        <View style={{ padding:10, flexDirection:'column', width:"100%",alignSelf:"center", }}>
          <View style={{flex:1, flexDirection:'row',  margin: 5, justifyContent:"space-between"}}>
            <Text style={{fontSize: 18, color: '#6D6D6D',}}>{props.equipment}</Text>
            <Text style={{fontSize: 18, color: '#6D6D6D',}}>{props.equipmentPrice}</Text>
          </View>
        </View>
    </View>
  )
};

// services at a branch table
/**
 * 
    <View style={{ flexDirection:'row', marginTop:5,}}>
              <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',}}>Services</Text>
            </View>
    <View style={{flexDirection:'column'}}>
      <View style={{flexDirection:'row'}}>
        <Services equipment="Private Office" equipmentPrice="300" />
      </View>
      <View style={{flexDirection:'row'}}>
        <Services equipment="Hot Desk" equipmentPrice="300" />
      </View>
      <View style={{flexDirection:'row'}}>
        <Services equipment="10 day pass" equipmentPrice="250" />
      </View>
      <View style={{flexDirection:'row'}}>
        <Services equipment="20 day pass" equipmentPrice="300" />
      </View>
      <View style={{flexDirection:'row'}}>
        <Services equipment="Private Office" equipmentPrice="300" />
      </View>
      <View style={{flexDirection:'row'}}>
        <Services equipment="Private Office" equipmentPrice="300" />
      </View>
    </View>
 */
class Location extends Component {
    static navigationOptions = {
      // title: 'Site Detail',
      headerTitle: <HeaderTitle title='Location Detail' />,
    };

    constructor(props){
      super(props)

      this.state = {
        services: []
      }
    }

    componentDidMount(){
      // AxiosInstance.get('SubscriptionServices?filter[include]=pricings')
      //   .then(response => {
      //     this.setState({
      //       services: response
      //     })
      //   })
      // console.log(this.props.hot)
    const location = this.props.navigation.getParam('location', {});      
      this.props.fetAvailable(location.id)
    }
  render() {
    const { navigation } = this.props;
    const location = navigation.getParam('location', {});
    const image = navigation.getParam('image', require('../../assets/1.jpg'))
    return (
      <Container style={{...styles.container}}>
        <Content>
        <View style={{height:'30%', width: '100%', alignItems: 'flex-start'}}>
          <Image
            style={{height:'100%', resizeMode: 'cover', width: '100%'}}
            source={{uri: `${URL}${image}`}}/>
            <View style={{position: 'relative', bottom: 80, width: '100%', padding: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
              <Text style={{...styles.title, textAlign: "left", color: '#fff', fontSize: 28, textShadowColor: '#000'}}>{location.name}</Text>
              <Text style={{color: '#fff', textShadowColor: '#000'}}>{location.address}</Text>
            </View>
        </View>
        <View style={{padding: 10, backgroundColor: '#fff', borderBottomColor: '#eee', borderBottomWidth: 1, width: '100%', flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', borderRightColor: '#eee', flex: 1, borderRightWidth: 1, paddingRight: 10}}>
              <TouchableOpacity style={{padding: 1}}>
              <Icon name="map-marker" type="font-awesome" size={14} color="#999"/>
              </TouchableOpacity>
              <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 10, paddingLeft: 5, paddingRight: 5}}>{location.address}</Text>
          </View>
          <View style={{flexDirection: 'row', borderRightColor: '#eee', flex: 1, borderRightWidth: 1, paddingLeft: 10, paddingRight: 10}}>
              <TouchableOpacity style={{padding: 1}}>
              <Icon name="at" type="font-awesome" size={14} color="#999"/>
              </TouchableOpacity>
              <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 10, paddingLeft: 5}}>{location.email}</Text>
          </View>
          <View style={{flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
              <TouchableOpacity style={{padding: 1}}>
              <Icon name="phone" type="font-awesome" size={14} color="#999"/>
              </TouchableOpacity>
              <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 10, paddingLeft: 5}}>{location.phone}</Text>
          </View>
        </View>
        <View style={{marginTop: 0, backgroundColor: '#fff', width: '100%', flexDirection: 'row'}}>
          <View style={{flex: 1, borderLeftColor: '#eee', borderLeftWidth: 1, padding: 10}}>
            <Text style={{...styles.title, textAlign: 'left', color: '#999'}}>Curator</Text>
            <View style={{padding: 5, alignItems: 'flex-start', flexDirection: 'row', }}>
              <Icon name="user" type="font-awesome" color="#999" size={12} />
                  <Text style={{fontSize: 10, paddingLeft: 10}}>{`${location.curator ? location.curator.firstName : ''} ${location.curator ? location.curator.lastName : ''}`}</Text>
            </View>
            <View style={{padding: 5, alignItems: 'flex-start', flexDirection: 'row', }}>
              <Icon name="at" type="font-awesome" color="#999" size={12} />
              <Text style={{fontSize: 10, paddingLeft: 10}}>{location.curator ? location.curator.email : ''}</Text>
            </View>
            <View style={{padding: 5, alignItems: 'flex-start', flexDirection: 'row', }}>
              <Icon name="phone" type="font-awesome" color="#999" size={12} />
              <Text style={{fontSize: 10, paddingLeft: 10}}>{location.curator ? location.curator.phone : ''}</Text>
            </View>
          </View>
          <View style={{flex: 1, padding: 10}}>
            <Text>{`${location.addressDescription}`}</Text>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.title}>PRICING</Text>
          <View style={{width: '100%', flexDirection: 'column'}}>
            {
              this.props.hot && this.props.hot.length ? 
              <View style={{marginTop: 20, backgroundColor: '#fff', margin: 10, borderRadius: 5, flex: 1, borderRightColor: '#eee', borderRightWidth: 1}}>
              <View style={{borderBottomColor: '#ddd', borderBottomWidth: 1, padding: 5}}>
              <Text style={{color: '#2691cf', textAlign: 'center', fontFamily: 'Lato-Regular'}}>Day Pass</Text>
              </View>
              {
                this.props.hot[0].pricings.map(pricing => (
                  <View style={{backgroundColor: '#fff', flexDirection: 'row', width: '100%', padding: 10}}>
                    <View style={{flex: 1}}>
                    <Text style={{fontFamily: 'Lato-Regular'}}>{pricing.duration > 1 ? pricing.duration : 'Single'} day pass</Text>
                    </View>
                    <View style={{flex: 1}}>
                    <Text style={{textAlign: "right"}}>{`${(pricing.unitPrice * pricing.duration).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB / desk`}</Text>
                    </View>
                  </View>
                ))
              }
              
              
            </View>
              : <Text style={{color: '#999', textAlign: 'center', padding: 5}}>No day pass pricing found</Text>
            }

            {
              this.props.enclosed && this.props.enclosed.length ? 
              <View style={{marginTop: 20, backgroundColor: '#fff', margin: 10, borderRadius: 5, flex: 1, borderRightColor: '#eee', borderRightWidth: 1}}>
              <View style={{borderBottomColor: '#ddd', borderBottomWidth: 1, padding: 5}}>
              <Text style={{color: '#2691cf', textAlign: 'center', fontFamily: 'Lato-Regular'}}>Private Office</Text>
              </View>
              {
                this.props.enclosed[0].pricings.map(pricing => (
                  <View style={{backgroundColor: '#fff', flexDirection: 'row', width: '100%', padding: 10}}>
                    <View style={{flex: 1}}>
                    <Text style={{fontFamily: 'Lato-Regular'}}>{pricing.duration > 1? `${pricing.duration} ${pricing.unit}`: unitDescription[pricing.unit]}</Text>
                    </View>
                    <View style={{flex: 1}}>
                    <Text style={{textAlign: "right"}}>{`${pricing.unitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB / ${pricing.unit} / desk`}</Text>
                    </View>
                  </View>
                ))
              }
              
              
            </View>
              : <Text style={{color: '#999', textAlign: 'center', padding: 5}}>No private office pricing found</Text>
            }
            {
              this.props.dedicated && this.props.dedicated.length ? 
              <View style={{marginTop: 20, backgroundColor: '#fff', margin: 10, borderRadius: 5, flex: 1, borderRightColor: '#eee', borderRightWidth: 1}}>
              <View style={{borderBottomColor: '#ddd', borderBottomWidth: 1, padding: 5}}>
              <Text style={{color: '#2691cf', textAlign: 'center', fontFamily: 'Lato-Regular'}}>Dedicated Desk</Text>
              </View>
              {
                this.props.enclosed[0].pricings.map(pricing => (
                  <View style={{backgroundColor: '#fff', flexDirection: 'row', width: '100%', padding: 10}}>
                    <View style={{flex: 1}}>
                    <Text style={{fontFamily: 'Lato-Regular'}}>{pricing.duration > 1? `${pricing.duration} ${pricing.unit}`: unitDescription[pricing.unit]}</Text>
                    </View>
                    <View style={{flex: 1}}>
                    <Text style={{textAlign: "right"}}>{`${pricing.unitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB /${pricing.unit} / desk`}</Text>
                    </View>
                  </View>
                ))
              }
              
              
            </View>
              : <Text style={{color: '#999', textAlign: 'center', padding: 5}}>No dedicated desk pricing found</Text>
            }
          </View>
          <View style={{margin: 10, flexDirection: 'column'}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddWorkSpace', {location: location})} style={{...styles.flatView, flex: 1, backgroundColor: '#2691cf', alignItems: 'center', padding: 10}}>
              <Icon name="plus" type="material-community" color="#fff"/>
              <Text style={{fontFamily: 'Lato-Regular', color: '#fff'}}>Book Workspace</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AddTour')} style={{...styles.flatView, flex: 1, backgroundColor: '#4cbae6', alignItems: 'center', padding: 10}}>
              <Icon name="walk" type="material-community" color="#fff"/>
              <Text style={{fontFamily: 'Lato-Regular', color: '#fff'}}>Book A Tour</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 340, backgroundColor: '#eee'}}>
            {/* <Text>ABC</Text> */}
          </View>
        </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.workspaceReducer
})

const mapDispatchToProps = (dispatch) => ({
  fetAvailable: locationId => dispatch(fetchAvailable(locationId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Location)