import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'native-base'
import { Text, ScrollView } from 'react-native'

import { fetchLocations } from './actions'
import { styles } from './styles'
import LocationCard from './locationCard';
import HeaderTitle from '../common/HeaderTitle';
import { Loading, NoContent } from '../common';


class LocationScreen extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  componentDidMount(){
    this.props.fetchLocations()
  }

  static navigationOptions = {
    headerTitle: <HeaderTitle title='blueSpace Locations' />,
  };

  _renderLoading = () => {
    if (this.props.loading && !this.props.locations.length) {
      return (
        <Loading />        
      )
    } else {
      return null
    }
  }

  render(){
    return (
      <Container style={this.props.locations.length ? styles.container : {backgroundColor: '#fff'}}>
        {
          !this.props.locations.length && !this.props.loading ?
            <NoContent text="No Available Locations"/>
          :
            null
        }
        <ScrollView>
          {
            this.props.locations.map(location => (
              <LocationCard key={location.id} location={location} navigation={this.props.navigation} />
            ))
          }     
        </ScrollView>
        {this._renderLoading()}
        
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.locationReducer
})

const mapDispatchToProps = (dispatch) => ({
  fetchLocations: () => dispatch(fetchLocations())
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen)