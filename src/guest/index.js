import React, {Component} from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { CustomIcon, Loading, NoContent} from '../common';
import styles from '../styles';
import { fetchMeetupSessions, deleteMeetupSession } from './actions';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import GuestSessionCard from './guestSessionCard';
import HeaderTitle from '../common/HeaderTitle';
import { Icon } from 'native-base';

const GuestCard = (props) => {
  return (
      <TouchableOpacity onPress={props.navigate} style={{flexDirection:'row', backgroundColor: '#fff',
              borderBottomColor: '#D0D0D0', borderBottomWidth: 1}}
      >
        <View style={{ width:"100%",backgroundColor:"#fff", flexDirection:"row",justifyContent:"space-between",}}>
          <View style={{ flexDirection:'column',  margin: 5}}>
            <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',}}>Start</Text>
            <Text>{dayjs(props.guest.start).format('MMM DD, YYYY')}</Text>
            <Text>{dayjs(props.guest.start).format('hh:mm A')}</Text>
          </View>
          <View style={{ flexDirection:'column', margin: 5}}>
            <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',}}>End</Text>
            <Text>{dayjs(props.guest.end).format('MMM DD, YYYY')}</Text>
            <Text>{dayjs(props.guest.end).format('hh:mm A')}</Text>
          </View>
          <View style={{ flexDirection:'column', margin: 5}}>
            <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',}}>Guests</Text>
            <Text>{props.guest.guests.length}</Text>
          </View>
        </View>
      </TouchableOpacity>
  )
};
class Screen extends Component {
  static navigationOptions = ({navigation}) => ({
    drawerLabel: 'Guest Sessions',
    // title: 'Guest Sessions',
    headerTitle: <HeaderTitle title='Guest Sessions' />,
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('AddMeetupSession')}>
        <Icon name="add" style={{marginRight:20, padding: 10, fontSize: 28, color: '#6D6D6D'}}/>
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {}
    this._renderContent = this._renderContent.bind(this);
  }

  componentDidMount() {
    this.props.fetchMeetupSessions();
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

  _renderContent() {
    if(this.props.meetupSessions !== undefined && this.props.meetupSessions !== null && this.props.meetupSessions.length > 0) {
      return (this.props.meetupSessions.map((guest) => {
        return (
          <GuestSessionCard 
              guest={guest}
              edit={() => this.goToEditSession(guest)}
              delete={() => this.props.deleteMeetupSession(guest.id)}
              navigate={() => {
                this.props.navigation.navigate('GuestDetail', { meetupSession: guest })
              }}/>
        )
      }))
    } else {
      return <NoContent text="No meetup sessions added yet" />
    }
  }

  goToEditSession = (session) => {
    this.props.navigation.navigate('AddMeetupSession', { meetupSession: session, type: 'edit'})
  }


  render() {
    if(this.props.loading)
      return <Loading />
      
    return (
      <View style={styles.container}>
        <ScrollView style={{width:'100%'}}>
            <Text style={{padding: 30, textAlign: 'center', backgroundColor: '#fff'}}>You can invite guest to visit you at specific time. Your guests can stay for 3 hours inside blueSpace free of charges. How ever, charges will be applied for further stays at a rate of 100 ETB per hour.</Text>
            {this._renderContent()}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state.guestReducer, '=============================')
  return {
    ...state.guestReducer
  }
};

const mapDispatchToProps = dispatch => ({
  fetchMeetupSessions() {
    dispatch(fetchMeetupSessions())
  },
  deleteMeetupSession(id){
    dispatch(deleteMeetupSession(id))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);