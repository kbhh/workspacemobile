import React, { Component } from 'react'
import { View } from 'react-native'
import PaymentChoice from './add/paymentChoice';
import SubscriptionSuccess from './add/success';
import { Loading } from '../common';

class FinishBooking extends Component {
    constructor(props){
        super(props)

        this.state = {
            workspace: '',
            success: false
        }
    }

    book = (paymentObj) => {
        console.log('ehsadlfk', paymentObj)
        switch(paymentObj.paymentType){
            case 'bank':
                this.props.navigation.navigate('FinishWorkspaceBookingVoucherUpload', {workspace: this.props.navigation.getParam('workspace', {})})
                break;
            default:
                this.setState({
                    success: true
                }, () => this.props.navigation.goBack())
        }
    }

    render(){
        return (
            <View style={{width: '100%', height: '100%'}}>
                {
                    this.state.success ? 
                        <SubscriptionSuccess navigation={this.props.navigation} onListPress='WorkSpaceList'/>
                    : <PaymentChoice changeState={this.book} />
                }
                {
                    this.state.loading ? 
                    <Loading />: null
                }
            </View>
        )
    }
}

export default FinishBooking