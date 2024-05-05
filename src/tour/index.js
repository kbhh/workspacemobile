import React, {Component} from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { CustomIcon, Loading, NoContent} from '../common';
import styles from '../styles';
import { fetchTours } from './actions';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import HeaderTitle from '../common/HeaderTitle';
import dayjs from 'dayjs'
import { Icon } from 'react-native-elements';

const TourCard = (props) => {
  return (
      <View style={{flexDirection:'row', backgroundColor: '#fff',
              borderBottomColor: '#D0D0D0', borderBottomWidth: 1}}
      >
        <View style={{ width:"100%",backgroundColor:"#fff", flexDirection:"row",justifyContent:"space-between",}}>
          <View style={{ flexDirection:'column',  margin: 5}}>
            <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',}}>Date</Text>
            <Text>{dayjs(props.tour.start).format('MMM DD, YYYY')}</Text>
          </View>
          <View style={{ flexDirection:'column', margin: 5}}>
            <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',}}>Time</Text>
            <Text>{dayjs(props.tour.start).format('hh:mm A')}</Text>
          </View>
          <Text style={{color: '#f5831f', alignSelf: 'center'}}>{props.tour.status}</Text>
          <View style={{ flexDirection:'column', margin: 5}}>
            {/* <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',}}>Guests</Text>
            <Text>12</Text> */}
          </View>
        </View>
      </View>
  )
};
class Screen extends Component {
  static navigationOptions = ({navigation}) => ({
    drawerLabel: 'Tour',
    // title: 'Tour',
    headerTitle: <HeaderTitle title='Tour' />,
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('AddTour')}>
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
    this.props.fetchTours();
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

  _renderContent({item}) {
    return (
      <TourCard tour={item} key={item.id}/>
    )
  }


  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Text style={{borderRadius: 5, margin: 5, backgroundColor: '#fff', padding: 30, textAlign: 'center'}}>You are always welcome to take a tour of our workSpaces. Please book for a tour at your convinient time and we will be waiting for you.</Text>
          <FlatList 
              data={this.props.tours}
              extraData={this.props}
              keyExtractor={(item)=> item._id}
              renderItem={this._renderContent}
              ListEmptyComponent={<NoContent text="No registered tour yet" />}
          />
        </Content>
        {this.renderLoading()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.tourReducer
  }
};

const mapDispatchToProps = dispatch => ({
  fetchTours() {
    dispatch(fetchTours())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
