import React, {Component} from 'react';
import { FlatList, TouchableOpacity} from 'react-native';
import { CustomIcon, Workspace, Loading, NoContent } from '../common';
import styles from '../styles';
import { fetchWorkspace } from './actions';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import WorkspaceCard from './workspaceCard';
import HeaderTitle from '../common/HeaderTitle';

const keys = ['start', 'end', 'pass', 'usage', 'approved'];

class Screen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // title: 'WorkSpace',
      headerTitle: <HeaderTitle title='My Bookings' />,
      // headerRight: (
      //   <TouchableOpacity onPress={() => navigation.navigate('AddWorkSpace')}>
      //     <CustomIcon name="add-circle" style={{marginRight:20, padding: 10, fontSize: 28, color: '#6D6D6D'}}/>
      //   </TouchableOpacity>
      // )
    }
  };

  constructor(props) {
    super(props);
    this.state = {}
  }
  
  componentDidMount() {
    this.props.fetchWorkspace();
    console.log(this.props.workspaces)
  }

  renderLoading() {
    if (this.props.loading) {
      return (
        <Loading />        
      )
    } else {
      console.log(this.props.workspaces)
      return null
    }
  }

  _keyExtractor = (item, index) => item._id;

  _noItem = () => {
    return <NoContent text="No workspace subscribed" />
  }

  _renderItem = ({item}) => {
    // console.log(item)
      return(
          <WorkspaceCard 
            workspace={item} 
            keys={keys} 
            reload={this.props.fetchWorkspace}
            navigation={this.props.navigation}/>
      )
  };

  render() {
    return (
      <Container>
        <Content>
        <FlatList
                data={this.props.workspaces}
                extraData={this.props}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                onRefresh={this.props.fetchWorkspace}
                refreshing={this.props.loading}
                ListEmptyComponent={this._noItem}
            />
        </Content>
        {/* {this.renderLoading()} */}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.workspaceReducer
  }
}

const mapDispatchToProps = dispatch => ({
  fetchWorkspace() {
    dispatch(fetchWorkspace())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Screen);