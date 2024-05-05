import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Tab, Tabs } from 'native-base';
import { Loading, CustomIcon } from '../common';
import styles from '../styles';
import { fetchEvent } from './actions';
import { connect } from 'react-redux';
import Tab1 from './eventsList';
import Tab2 from './meetingsList';
import HeaderTitle from '../common/HeaderTitle';

class Screen extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: <HeaderTitle title='Bookings' />,
    cardStyle: {
      shadowColor: 'transparent',
    },
    headerStyle: {
      shadowOpacity: 0,
      elevation: 0,
      shadowOffset: {
        height: 0,
        width:0
      },
      shadowRadius: 0,
      shadowColor: '#fff'
    }
  });

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchEvent();
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

  render() {
    return (
      <Container>
        <Tabs 
          tabsBorderBottomWidth={0}
          tabBarBackgroundColor={{ backgroundColor: '#F1F9FF' }}>
          <Tab heading="Events">
            <Tab1 navigation={this.props.navigation} activeTextStyle={{ fontWeight: 'normal'}}/>
          </Tab>
          <Tab heading="Meetings" activeTextStyle={{ fontWeight: 'normal'}}>
            <Tab2 navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
        {/* {this.renderLoading()} */}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.eventReducer
  }
};

const mapDispatchToProps = dispatch => ({
  fetchEvent() {
    dispatch(fetchEvent())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);