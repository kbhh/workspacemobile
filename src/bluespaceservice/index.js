import React, {Component} from 'react';
import { View, TouchableOpacity, FlatList, Text, Dimensions} from 'react-native';
import { CustomIcon, Workspace, Loading, NoContent } from '../common';
import styles from '../styles';
import { fetchServices } from './actions';
import { connect } from 'react-redux';
import HeaderTitle from '../common/HeaderTitle';
import dayjs from 'dayjs'

const keys = ['start', 'end', 'pass', 'usage', 'approved'];

class Screen extends Component {
  static navigationOptions = ({navigation}) => ({
    // title: 'Service',
    headerTitle: <HeaderTitle title='Service' />,
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('AddService')}>
        <CustomIcon name="add" style={{marginRight:20, padding: 10, fontSize: 18, color: '#6D6D6D'}}/>
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {}
  }
  
  componentDidMount() {
    this.props.fetchServices();
  }

  renderLoading() {
    if (this.props.loading) {
      return (
        <Loading />        
      )
    } else {
      return null
    }
  }

  getTotal = (item) => {
    let total = 0
        item.addons.forEach(addon => {
            switch(addon.unit){
                case 'person':
                case 'invitation':
                case 'hour':
                    total += this.getQuantity(addon.id, item) * parseFloat(addon.price)
                    break
                default:
                    if(addon.price != -1)
                        total += parseFloat(addon.price)
            }
        });
      return total
  }

  getQuantity = (addonId, item) => {
    let quantityItem = item.addonQuantities ? item.addonQuantities.filter(quantity => addonId == quantity.addonId) : []
    if(quantityItem.length)
      return quantityItem[0].quantity
    return 1
  }

  _renderItem = ({item}) => (
    <View style={{backgroundColor: '#fff', padding: 10, marginBottom: 5, width: Dimensions.get("window").width}}>
      <View style={{flexDirection: "row"}}>
      <Text style={{flex: 3, color: '#2691cf'}}></Text>
      <Text style={{flex: 1, textAlign: 'right', color: '#f5831f'}}>{item.status}</Text>
      </View>
      <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 12}}>{dayjs(item.createdAt).format('MMMM DD, YYYY @ HH:mm A')}</Text>
      <Text>Addons</Text>
      <View style={{padding: 10}}>
        {
          item.addons.map(addon => (
            <View style={{flexDirection: 'row'}}>
              <Text style={{flex: 3}}>{`${this.getQuantity(addon.id, item.addonQuantities)} ${addon.name}`}</Text>
              <Text>
                {`${addon.price == -1 ? 'TBD' : addon.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'ETB '} ${addon.price != -1 && addon.unit !== 'service' ? '/ ' + addon.unit : ''}`}
              </Text>
            </View>
          ))
        }
        <Text style={{textAlign: 'right', paddingTop: 10, fontFamily: 'Lato-Regular'}}>Total: {(this.getTotal(item)*1.15).toFixed(2)}</Text>
      </View>

    </View>
  )

  _keyExtractor = (item, index) => item.id;

  render() {
    return (
      <View style={{...styles.container, backgroundColor: this.props.services.length? '#eee' : '#fff', width: '100%'}}>
        <FlatList
          data={this.props.services}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onRefresh={this.props.fetchServices}
          refreshing={this.props.loading}
          ListEmptyComponent={<NoContent text="No service bookings" />}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.serviceReducer
  }
}

const mapDispatchToProps = dispatch => ({
  fetchServices() {
    dispatch(fetchServices())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Screen);