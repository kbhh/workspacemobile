import React from 'react'
import { Content, View, Body } from 'native-base';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import axios, { URL } from '../interceptor';
import AxiosInstance from '../interceptor';

const categoryDescription = {
    'hot desk': 'Day Pass',
    'enclosed': 'Private Office',
    'dedicated': 'Dedicated Desk'
}

class WorkspaceCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            service: {},
            loading: true,
        }
    }

    componentDidMount(){
        console.log(this.props.workspace)
        this.getService(this.props.workspace.serviceId)
    }

    cancel = () => {
        this.setState({loading: true})
        AxiosInstance.patch(`WorkspaceSubscriptions/${this.props.workspace.id}`, {status: "cancelled"})
        .then(res => {
            this.props.reload()
            this.setState({loading: false})
        })
        .catch(err => this.setState({loading: false}))
    }

    getService = (id) => {
        // axios.get(`/subscription_service/service?_id=${id}`)
            // .then(response => {
                // console.log(response, 'response')
                // this.setState({service: response, loading: false})
            // })
            // .catch(error => {
                // console.log(error)
            // })
    }

    render(){
        let service = this.props.workspace.service
        let canBeCanceled = ["Approval requested", "pending"]
        return (
            <Content style={{paddingLeft: 0, paddingRight: 0}}>
                {/* <Text>{this.props.workspace.paymentAttached}</Text> */}
                {
                    this.props.workspace.paymentAttached ?
                    <Image source={{uri: `${URL}/Containers/workspaceSubscription/download/${this.props.workspace.paymentAttached}`}} style={{width: '100%', height: 200, padding: 0, margin: 0, backgroundColor: '#bbb'}}/>
                    :
                    null
                }
                <Body style={{backgroundColor: '#fff', width: '100%', marginBottom: 8}}>
                    <View style={{flexDirection: 'row', width: '100%'}}>
                        <View style={styles.body}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 4}}>
                            <Text style={styles.title}>{`${service && service.tag ? service.tag : ''} ${service ? categoryDescription[service.category] : ''}`}</Text>
                            </View>
                            <View style={{flex: 2}}>
                            <Text style={{color: this.props.workspace.status == 'approved' ? 'green' : '#ff6a00'}}>{this.props.workspace.status}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                        <Text style={styles.dayLabel}>From </Text>
                        <Text style={styles.day}>{this.props.workspace.start} </Text>
                        <Text style={styles.dayLabel}>to </Text>
                        <Text style={styles.day}>{this.props.workspace.end}</Text>
                        </View>
                        <View style={{padding: 3}}>
                            <Text style={styles.description}>
                                {this.props.workspace.passType}
                            </Text>
                        </View>
                        <View style={styles.actions}>
                            <View style={{flex: 2}}>
                                
                                <Text style={styles.description}>{this.props.workspace.pricing.history.unitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ETB / ' + this.props.workspace.pricing.history.unit}</Text>
                            
                            </View>
                                                        
                            <View style={{flex: 1}}>
                                {
                                    canBeCanceled.includes(this.props.workspace.status) ?
                                    <TouchableOpacity style={{padding: 5}} onPress={() => this.cancel()}>
                                        <Text style={{color: "red"}}>Cancel</Text>
                                    </TouchableOpacity>
                                    :
                                <Text style={styles.description}>{this.props.workspace.usage}% used</Text>
                                }
                            </View>
                            {
                                this.props.workspace && this.props.workspace.paymentType && this.props.workspace.paymentType.includes('later') ?
                                    <View style={{flex: 1}}>
                                        <Text style={{color: '#01bae6'}} onPress={() => this.props.navigation.navigate('FinishWorkspaceBooking', {workspace: this.props.workspace})}> Finish Payment </Text>
                                    </View> 
                                :null
                            }
                            
                        </View>
                        </View>
                    </View>
                </Body>
            </Content>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Lato-Heavy', 
        fontSize: 18,
        color: '#0080c6'
    },
    actions: {
        flexDirection: 'row',
        paddingTop: 12
    },
    dayLabel: {
        fontSize: 10,
        color: '#999'
    },
    day: {
        fontSize: 10,
        color: '#999',
        fontFamily: 'Lato-LightItalic'
    },
    description: {
        fontSize: 12,
        color: '#5f5e5e',
        fontFamily: 'Lato-LightItalic'
    },
    bold: {
        fontWeight: "bold",
        fontSize: 18
    },
    guests: {
        flex: 1, 
        flexDirection: 'column',
        backgroundColor: '#01bae6',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingTop: 20,
        height: '100%'
    },
    white: {
        color: '#fff'
    },
    guestText: {
        color: '#00000075',
        fontSize: 18,
        fontFamily: 'Lato-Heavy'
    },
    body: {
        padding: 10,
        flex: 3,
        flexDirection: 'column'
    }
  });

const mapStateToProps = (state) => ({
    ...state.workspaceReducer
})

export default WorkspaceCard