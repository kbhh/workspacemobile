import React, {Component} from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native'
import { Content } from 'native-base';
import { ImageCard, NoContent, Loading } from '../common';
import styles from '../styles';
import { connect } from 'react-redux';
import HeaderTitle from '../common/HeaderTitle';
import AxiosInstance from '../interceptor';
import EventThumbnail from './eventThumbnail';

class Screen extends Component {
  static navigationOptions = ({navigation}) => ({
    // title: 'My Event',
    headerTitle: <HeaderTitle title='Meetings' />,
  });
  
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      eventBookings: []
    }
  }

  componentDidMount() {
    this.loadEventBookings()
  }

  loadEventBookings = () => {
    this.setState({loading: true})
    AxiosInstance.get('Accounts/me/eventBookings?filter[include]=eventType&filter[include]=eventSpace&filter[include]=eventRate&filter[order]=createdAt DESC')
      .then(eventBookings => {
        console.log('> eventBookings', eventBookings)
        this.setState({loading: false, eventBookings: eventBookings})
      })
      .catch(error => {
        this.setState({loading: false})
      })
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
    <EventThumbnail {...item} navigation={this.props.navigation} key={item.id}/>
  );

  render() {
    return (
      <Content style={[styles.content]}>
        <FlatList
          data={this.state.eventBookings}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onRefresh={this.loadEventBookings}
          refreshing={this.state.loading}
          ListEmptyComponent={<NoContent text="No event bookings" />}
        />
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.eventReducer
  }
};

export default connect( mapStateToProps )(Screen);