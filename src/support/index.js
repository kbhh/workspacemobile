import React, {Component} from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { CustomIcon, Loading, NoContent } from '../common';
import styles from '../styles';
import { fetchTickets } from './actions';
import { connect } from 'react-redux';
import HeaderTitle from '../common/HeaderTitle';
import { Icon } from 'native-base';

const keys = ['title', 'status', 'body'];

const SupportCard = (props) => {
  // console.log(props.ticket.resolved, '========================')
  return (
    <TouchableOpacity onPress={props.navigate}
          style={{flexDirection:'row', backgroundColor: '#fff',
            borderBottomColor: '#D0D0D0', borderBottomWidth: 1, padding: 10}} >
            <Text style={{flex: 3, fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',}}>{props.ticket.title}</Text>
            <Text style={{fontSize: 18, color: '#FF7C00',}}>{props.ticket.resolved == true ? 'Resolved' : 'Pending'}</Text>
    </TouchableOpacity>
  )
};
class Screen extends Component {
  static navigationOptions = ({navigation}) => ({
    // title: 'Support',
    headerTitle: <HeaderTitle title='Support' />,
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('TicketForm', {type: 'add'})} style={{paddingRight: 10}}>
        <Icon name="add" />
      </TouchableOpacity>)
  });

  constructor(props) {
    super(props);
    this.state = {}
    this._renderContent = this._renderContent.bind(this);
    this._keyExtractor = this._keyExtractor.bind(this);
    this._noItem = this._noItem.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    this.props.fetchTickets();
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

  _keyExtractor = (item, index) => item._id;

  _noItem = () => {
    return <NoContent text="No Support added yet" />
  }

  _renderItem = ({item}) => {
    // console.log(item, 'item ===============')
      return(
        <SupportCard 
        ticket={item}
        keys={keys}
        navigate={() => {
          this.props.navigation.navigate('Ticket', { ticket: item })
        }}/>
      )
  };

  _renderContent() {
    return (
      <FlatList
        data={this.props.tickets}
        ListEmptyComponent={this._noItem}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />)
  }


  render() {
    return (
      <View style={styles.container}>
        {this.renderLoading()}
        <ScrollView style={{width:'100%'}}>
            {this._renderContent()}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    tickets: state.supportReducer.tickets,
    loading: state.supportReducer.loading
  }
};

const mapDispatchToProps = dispatch => ({
  fetchTickets() {
    dispatch(fetchTickets())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);