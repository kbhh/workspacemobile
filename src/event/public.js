import React, {Component} from 'react';
import { View, Text } from 'react-native'
import { Content } from 'native-base';
import { ImageCard, NoContent, Loading } from '../common';
import styles from '../styles';
import { connect } from 'react-redux';
import HeaderTitle from '../common/HeaderTitle';

class Screen extends Component {
  static navigationOptions = ({navigation}) => ({
    // title: 'My Event',
    headerTitle: <HeaderTitle title='Events' />,
  });
  
  constructor(props) {
    super(props);
    this.state = {}
    this._renderContent = this._renderContent.bind(this);
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
        <Content style={[styles.content]}>
        {this._renderContent()}
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {}
};

export default connect( mapStateToProps )(Screen);