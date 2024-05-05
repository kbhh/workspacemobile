import React, {Component} from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux'
import { Button } from './button';
import styles from '../styles';
import HeaderTitle from '../common/HeaderTitle';
import { fetchProfile } from './actions';
import { URL } from '../interceptor';

const cover = require('../../assets/account.png');

class Account extends Component {
    static navigationOptions = {
      // title: 'My Account'
      headerTitle: <HeaderTitle title='My Account' />
    };

  componentDidMount(){
    this.props.fetchProfile()
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={{width: 179.26, height: 151.67, marginBottom: 35, alignSelf:"center", borderRadius: 90}}
            source={this.props.currentProfileImage ? {uri: `${URL}Containers/account/download/${this.props.currentProfileImage}`} : cover} defaultSource={cover} />
        </View>
        <View style={{alignSelf:'center', alignItem: 'center'}}>
          <Button label="My Profile" icon={ "profile" } action={() => this.props.navigation.navigate('Profile')}/>
          <Button label="Billing Summary" icon={"billing"} action={() => this.props.navigation.navigate('Billing')}/>
          <Button label="My Company" icon={"company"} action={() => this.props.navigation.navigate('Company')} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.accountReducer
})

const mapDispatchToProps = (dispatch) => ({
  fetchProfile: () => fetchProfile()
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)