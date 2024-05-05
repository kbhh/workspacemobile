import React, { Component } from 'react'
import { View } from 'react-native'
import PaymentChoice from '../workspace/add/paymentChoice';
import SubscriptionSuccess from '../workspace/add/success';
import { Loading } from '../common';
import { StackActions } from 'react-navigation'
import { HeaderBackButton } from 'react-navigation'
import HeaderTitle from '../common/HeaderTitle';
import AxiosInstance from '../interceptor';

class Screen extends Component {

    static navigationOptions = ({ navigation }) => {
        let goBack = navigation.goBack;
        
        return {
            headerLeft: <HeaderBackButton onPress={() => {
                let getSuccess = navigation.getParam('getSuccess', () => false)
                if(getSuccess()){
                    let getBackNumber = navigation.getParam('getBackNumber', 4)
                    console.log('> get back number', getBackNumber)
                    const popAction = StackActions.pop({
                        n: 4,
                    });
                  
                    navigation.dispatch(popAction);
                    navigation.navigate('Event')
                } else {
                    goBack()
                }
            }} tintColor={'#999'} />,
            headerTitle: (<HeaderTitle title='Select Payment ' />),

        };
    }
    
    constructor(props){
        super(props)

        this.state = {
            meeting: '',
            success: false
        }
    }

    componentDidMount(){
        this.props.navigation.setParams({getSuccess: () => this.state.success})
    }

    book = (paymentObj) => {
        console.log('ehsadlfk', paymentObj)
        let meeting = this.props.navigation.getParam('meeting', {})
        let addonsId = this.props.navigation.getParam('selectedAddons', []).map(addon => addon.id)
        switch(paymentObj.paymentType){
            case 'bank':
                this.props.navigation.navigate('EventBankVoucherUpload', {meeting: meeting, addonsId: addonsId})
                break;
            default:
                AxiosInstance.post(`MeetingBookings/${meeting.id}/addAddons`, {addons: addonsId})
                    .then(response => {
                        console.log('> addons added', response)
                    })
                    .catch(error => {
                        console.log('> addons ading error', error)
                    })
                this.setState({
                    success: true
                })
        }
    }

    getSuccess = () => {
        return this.state.success
    }

    render(){
        return (
            <View style={{width: '100%', height: '100%'}}>
                {
                    this.state.success ? 
                        <SubscriptionSuccess type="event" navigation={this.props.navigation} longText={`Your meeting booking has been submited successfuly. You can track your meeting bookings under 'My bookings'. Thank you!`} title={`Meeting Booked Successfuly`} numberOfBack={4} onListPress='Event'/>
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

export default Screen