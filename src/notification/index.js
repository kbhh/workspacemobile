import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import HeaderTitle from '../common/HeaderTitle';
import AxiosInstance from '../interceptor';
import ProfileIcon from '../common/profileIcon'
const data = [
    // {
    //     key: '1',
    //     message: 'closed for holiday',
    //     datetime: 'Nov 21, 2018 17:08',
    //     read: false
    // },
    // {
    //     key: '2',
    //     message: 'No internet connection',
    //     datetime: 'Nov 24, 2018 17:08',
    //     read: true
    // },
    // {
    //     key: '3',
    //     message: 'closed for holiday',
    //     datetime: 'Nov 21, 2018 17:08',
    //     read: true
    // },
    // {
    //     key: '4',
    //     message: 'No internet connection',
    //     datetime: 'Nov 24, 2018 17:08',
    //     read: false
    // }
];
export default class Notification extends Component {
    static navigationOptions = {
    //   title: 'Notification'
    headerTitle: <HeaderTitle title='Notifications' />,
    };

    constructor(props){
      super(props)

      this.state = {
        notifications: [],
        loading: false
      }
    }

    getNotifications = () => {
      this.setState({loading: true})
      AxiosInstance.get(`Accounts/me/inbox?filter[include]=from&filter[include]=to&filter[order]=createdAt DESC`)
        .then(response => {
          this.setState({notifications: response, loading: false})
          console.log(response)
          let getUnreadMessage = this.props.navigation.getParam('getUnreadMessages', () => console.log('not found'))
          getUnreadMessage()
        })
        .catch(error => {
          this.setState({loading: false})
          console.log(error)
        })
    }

    read = (id) => {
      AxiosInstance.patch('Messages/' + id, {
        status: 'seen'
      })
      .then(response => {
        console.log('> unread changed')
      })
      .catch(error => {
        console.log('> cannot change unread')
      })
    }

    componentDidMount(){
      this.getNotifications()
    }
  render() {
    return (
      <View style={{...styles.container, backgroundColor: '#fff'}}>
        <FlatList
            data={this.state.notifications}
            ListEmptyComponent={<Text style={{padding: 40, textAlign: 'center', fontSize: 24}}>No Notifications</Text>}
            onRefresh={this.getNotifications}
            refreshing={this.state.loading}
            renderItem={({item})=> (
                <TouchableOpacity 
                    onPress={()=> {
                      this.read(item.id)
                      this.props.navigation.navigate('Messages', {
                        sender: item.from,
                        user: item.to
                      })
                    }}
                    style={{
                        flexDirection:'row', justifyContent: 'space-between',
                        backgroundColor: '#fff', padding: 10,
                        alignItems: 'center',
                    }}>
                    {
                        item.from.currentProfileImage ?
                    <Image source={{uri: item.from.currentProfileImage}} style={{backgroundColor: '#eee', width: 50, height: 50, borderRadius: 25}} />
                    : 
                        <ProfileIcon />
                    }
                    <View style={{flex: 3, marginLeft: 5, alignSelf: 'flex-start', borderBottomWidth: 1, height: 50, borderColor: '#eee'}}>
                      <Text style={{fontFamily: 'Lato-Regular'}}>{item.from.firstName} {item.from.lastName}</Text>
                      <Text style={{flexWrap: 'nowrap'}}>{item.body.slice(0, 60)}</Text>
                    </View>
                </TouchableOpacity>
            )}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F9FF',
  },
  unread: {
      color: '#6D6D6D',
      fontSize: 17,
      fontFamily: 'Lato-Heavy'
  },
  read: {
      color: '#6D6D6D',
      fontSize: 20,
  }

});
