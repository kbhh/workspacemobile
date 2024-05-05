import React, { Component } from 'react'
import {Text, View, Alert } from 'react-native'
import { Container, Content } from 'native-base';
import { styles } from './styles';
import HeaderTitle from '../common/HeaderTitle';
import { Loading } from '../common';
import AxiosInstance, { URL } from '../interceptor';
import EventSpaceCard from './eventSpaceCard';

class SelectEventScreen extends Component {
    static navigationOptions = {
        // title: 'Add Event'
        headerTitle: <HeaderTitle title='Select Event Space' />,
    };
      
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            eventSpaces: []
        }
    }

    componentDidMount() {
        this.loadEventSpaces()
    }

    loadEventSpaces = () => {
        this.setState({
            loading: true
        })
        AxiosInstance.get('EventSpaces?filter[include]=eventRates')
            .then(response => {
                console.log('> response event spaces', response)
                this.setState({
                    eventSpaces: response,
                    loading: false
                })
            })
            .catch(error => {
                console.log('error loading spaces', error)
            })
    }

    select = (eventSpace) => {
        if(eventSpace.available){
            if(eventSpace.eventRates.length)
                this.props.navigation.navigate('AddEvent', {eventSpace: eventSpace})
            else 
                Alert.alert('Selected event space does not have available rates, try another')
        } else {
            Alert.alert('Event space is not available');
        }
    }

    renderLoading() {
        if (this.state.loading) {
            return ( <Loading />)
        } else {
            return null
        }
      }

    render() {
        return (
            <Container>
                <Content style={{...styles.content, paddingTop: 20,}}>
                    <Text style={styles.title}>Where do you want to host your event?</Text>
                    <View style={{padding: 20}}>
                        {
                            this.state.eventSpaces.map(eventSpace => (
                                <EventSpaceCard eventSpace={eventSpace} select={this.select} />
                            ))
                        }
                    </View>
                </Content>
                {this.renderLoading()}
            </Container>
        )
    }
}

export default SelectEventScreen