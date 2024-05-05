import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { Container, Content } from 'native-base';
import HeaderTitle from '../common/HeaderTitle';
import AxiosInstance from '../interceptor'
import { NoContent, Popup } from '../common';
import dayjs from 'dayjs'
import { Icon } from 'react-native-elements';
import Bill from '../common/bill';

const deskTypeDescription = {
    hot: 'Day Pass',
    enclosed: 'Private Office',
    dedicated: 'Dedicated Desk'
}
class AccountBill extends Component {
    // static navigation 
    static navigationOptions = {
        headerTitle: <HeaderTitle title='My Bills' />
    };
    constructor(props){
        super(props)
        
        this.state = {
            type: 'workspace',
            loading: false,
            bills: [],
            modalVisible: false,
            bill: {}
        }
    }

    getWorkspaceTotal = (bill) => {
        let pricing = bill.pricing.history
        let total = pricing.unitPrice * bill.typeObject.numberOfDesks
        // console.log('> total', total, pricing.unitPrice, bill.typeObject.numberOfDesks)
        return bill.duePaid ? pricing.duration * total : pricing.advanceDuration * total
    }

    getTotal = (bill) => {
        switch(bill.type){
            case 'workspace':
                return this.getWorkspaceTotal(bill)
            default:
                return 0
        }
    }

    getBillName = (bill) => {
        switch(bill.type){
            case 'workspace':
                return deskTypeDescription[bill.typeObject.type]
            default:
                return 'other'
        }
    }

    componentDidMount(){
        this.getBills()
    }

    getBills = (type) => {
        this.setState({loading: true})
        if(!type)
            type = this.state.type
        
        AxiosInstance.get(`Accounts/me/bills?filter[where][type]=${type}&filter[include]=service&filter[include]=pricing&ilter[order]=createdAt DESC`)
            .then(response => {
                console.log('> bills fetched', response)
                response = response.map(bill => {
                    bill.total = (this.getTotal(bill)*1.15).toFixed(2)
                    bill.name = this.getBillName(bill)
                    bill.createdAt = dayjs(bill.createdAt).format('MMM DD, YYYY')
                    if(bill.typeObject.dueDate)
                        bill.typeObject.dueDate = dayjs(bill.typeObject.dueDate).format('MMM DD, YYYY')
                    return bill
                })
                this.setState({loading: false, bills: response})
            })
            .catch(error => {
                console.log('> erro fetching bills', error)
                this.setState({loading: false})
            })
    }

    getBillProps = (bill) => {
        switch(bill.type){
            case 'workspace':
                return this.getWorkspaceBillProps(bill)
            default: 
                return {
                    subtotal: 0,
                    items: []
                }
        }
    }

    getWorkspaceBillProps = (bill) => ({
        subtotal: bill.total,
        items: [
            {
                key: 'Workspace type',
                value: deskTypeDescription[bill.typeObject.deskType]
            },
            {
                key: 'Capacity',
                value: bill.typeObject.numberOfDesks
            },
            {
                key: 'Duration',
                value: bill.pricing.history.duration
            },
            {
                key: 'Advance',
                value: `${bill.pricing.history.advanceDuration} ${bill.pricing.history.unit}`
            }
        ]
    })

    _renderItem = ({item}) => (
        <View style={{marginTop: 10, backgroundColor: '#fff', padding: 10}}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontFamily: 'Lato-Heavy', color: '#2691cf', flex: 3}}>{item.name}</Text>
                {
                    item.typeObject.dueDate ?
                <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 10}}>{item.duePaid ? 'Fully Paid' : `Due Date: ${item.typeObject.dueDate}`}</Text>:null
                }
            </View>
            <View style={{alignItems: 'flex-end', flexDirection: 'row'}}>
                <Text style={{flex: 3}}>{item.createdAt}</Text>
                <Text style={{fontFamily: 'Lato-Heavy', paddingRight: 5}}>Total</Text>
                <TouchableOpacity style={{paddingRight: 5}} onPress={() => this.setState({bill: item, modalVisible: true})}>
                    <Icon name="info" color="#999"/>
                </TouchableOpacity>
                <Text>{item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB</Text>
            </View>
        </View>
    )

    _keyExtractor = (item, index) => item.id;

    render(){
        return (
            <Container style={{}}>
                <Content scrollEnabled>
                <FlatList
                    data={this.state.bills}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    onRefresh={this.getBills}
                    refreshing={this.state.loading}
                    ListEmptyComponent={<NoContent text="No billing" />}
                    />
                </Content>
                <Popup back={() => this.setState({modalVisible: false})} visible={this.state.modalVisible}>
                <View style={{alignSelf: 'center', marginLeft: 10, marginRight: 10, width: '95%', backgroundColor: '#fff'}} onPress={() => props.setModalVisible(!props.modalVisible)}>
                    <Bill {...this.getBillProps(this.state.bill)} />
                </View>
                </Popup>
            </Container>
        )
    }
}

export default AccountBill