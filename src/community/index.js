import React, {Component} from 'react';
import { FlatList } from 'react-native';
import { Loading, NoContent, CommunityCard } from '../common'
import styles from '../styles';
import { fetchCommunity } from './actions';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import HeaderTitle from '../common/HeaderTitle';

class Screen extends Component {
  static navigationOptions = {
    // title: 'Community'
    headerTitle: <HeaderTitle title='blueFace' />,
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchCommunity();
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
    return <NoContent text="No blueFace available" />
  }

  _renderItem = ({item}) => {
      return(
          <CommunityCard 
            listKey={item.id}
            company={item}
            navigation={this.props.navigation}
          />
      )
  }

  render() {
    return (
      <Container>
        <Content style={[styles.content]}>
          <FlatList
            data={this.props.members}
            extraData={this.props}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            ListEmptyComponent={this._noItem} 
          />
        </Content>
        {this.renderLoading()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.communityReducer
  }
};

const mapDispatchToProps = dispatch => ({
  fetchCommunity() {
    dispatch(fetchCommunity())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Screen);