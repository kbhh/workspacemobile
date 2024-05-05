import React, {Component} from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native'
import { Content } from 'native-base';
import { ImageCard, NoContent, Loading } from '../common';
import styles from '../styles';
import { connect } from 'react-redux';
import HeaderTitle from '../common/HeaderTitle';
import AxiosInstance from '../interceptor';
import EventThumbnail from './eventThumbnail';
import MeetingThumbnail from './meetingThumbnail';

class Screen extends Component {
  static navigationOptions = ({navigation}) => ({
    // title: 'My Event',
    headerTitle: <HeaderTitle title='Meetings' />,
  });
  
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      meetingBookings: []
    }
  }

  componentDidMount() {
    this.loadmeetingBookings()
  }

  loadmeetingBookings = () => {
    this.setState({loading: true})
    AxiosInstance.get('Accounts/me/meetingBookings?filter[include]=meetingRoom&filter[include]=pricing&filter[order]=createdAt DESC')
      .then(meetingBookings => {
        console.log('> meetingBookings', meetingBookings)
        this.setState({loading: false, meetingBookings: meetingBookings})
      })
      .catch(error => {
        this.setState({loading: false})
      })
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
    <MeetingThumbnail {...item} navigation={this.props.navigation} key={item.id}/>
  );

  render() {
    return (
      <Content style={[styles.content]}>
        <FlatList
          data={this.state.meetingBookings}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onRefresh={this.loadmeetingBookings}
          refreshing={this.state.loading}
          ListEmptyComponent={<NoContent text="No meeting bookings" />}
        />
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    // ...state.eventReducer
  }
};

export default connect( mapStateToProps )(Screen);