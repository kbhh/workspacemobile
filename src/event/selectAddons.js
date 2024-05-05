import React, { Component } from 'react'
import { Container, Content, Label } from 'native-base'
import { Text, View, Alert } from 'react-native'
import AxiosInstance from '../interceptor';
import { Loading, Button, Popup, CustomIcon } from '../common';
import AddonsMultipleSelect from '../common/addonsMultipleSelect';
import { StackActions } from 'react-navigation';
import SubscriptionSuccess from '../workspace/add/success';
import { HeaderBackButton } from 'react-navigation'
import HeaderTitle from '../common/HeaderTitle';

class SelectAddonsScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            addons: [],
            selectedAddons: [],
            total: 0
        }
    }

    static navigationOptions = ({ navigation }) => {
        let goBack = navigation.goBack;
        
        return {
            headerLeft: <HeaderBackButton onPress={() => {
                let getParam = navigation.getParam('getSuccess', () => false)
                const popAction = StackActions.pop({
                    n: 3,
                });
                  
                navigation.dispatch(popAction);
                navigation.navigate('Event')
            }} tintColor={'#999'} />,
            headerTitle: (<HeaderTitle title='Select Event Addons' />),

        };
    }

    getTotalNumberOfHours = () => {
        return 1
    }

    getTotal = () => {
        // let eventSpace = this.props.navigation.getParam('eventSpace', '')
        let event = this.props.navigation.getParam('event', {})
        let total = 0
        // console.log('> event', event.eventRate, event.numberOfGuests)
        // total += event.eventRate ? event.eventRate.rate * event.numberOfGuests : 0
        // console.log('> event', event)
        if(event){
            this.state.selectedAddons.forEach(addon => {
                switch(addon.unit){
                    case 'person':
                    case 'invitation':
                        total += event.numberOfGuests * parseFloat(addon.price)
                        break
                    case 'hour':
                        total += this.getTotalNumberOfHours() * parseFloat(addon.price)
                        break
                    default:
                        if(addon.price != -1)
                            total += parseFloat(addon.price)
                }
            });
            // console.log('> event space', eventSpace.workingHours[0])
        } else {
            Alert('Warning', 'Event Space not selected')
        }
        console.log('> total', total)
        this.setState({total: total})
    }

    book = () => {
        this.setState({loading: true})
        // let eventSpace = this.props.navigation.getParam('eventSpace', '')
        let event = this.props.navigation.getParam('event', '')

        if(event){
            let data = {
                guests: event.numberOfGuests,
                // eventRateId: event.eventRate.id,
                // startTime: event.workingHour.start,
                startDate: event.startDate,
                endDate: event.endDate,
                addons: this.state.selectedAddons,
                eventTypeId: event.type.id,
                // eventSpaceId: eventSpace.id,
                // orderDescription: event.orderDescription,
                eventDescription: event.eventDescription,
                title: event.title,
            }

            AxiosInstance.post('EventBookings', data)
                .then(response => {
                    console.log('> event booking done')
                    this.setState({success: true, loading: false})
                })
                .catch(error => {
                    console.log('> error submitting event subscription request', error)
                    this.setState({loading: false})
                })
        }
    }

    getSuccess = () => {
        return this.state.success
    }

    componentDidMount() {
        // this.props.navigation.getParam('type',)
        this.getAddons()
        this.getTotal()
    }

    inSelectedAddons = (addon) => {
        return this.state.selectedAddons.filter(selectedAddon => selectedAddon.id === addon.id).length
    }

    toggleAddon = (addon) => {
        this.inSelectedAddons(addon) ? 
            this.setState({selectedAddons: this.state.selectedAddons.filter(selected => selected.id !== addon.id)}, () => this.getTotal()) // remove if already selected
            : this.setState({selectedAddons: [...this.state.selectedAddons, {...addon}]}, () => this.getTotal()) // select addon
    }

    getAddons = () => {
        this.setState({loading: true})
        AxiosInstance.get(`Addons?filter[include]=categories&filter[include]=packages&filter[active]=true`)
            .then(addons => {
                // console.log('> addons', addons.length)
                let flatAddons = []
                addons = addons.filter(addon => {
                    let cat = false
                    addon.categories.forEach(category => {
                        cat = category.name === 'event' ? true : cat
                    });
                    return cat
                })

                addons.forEach(addon => {
                    if (addon.packages.length){
                        addon.packages.forEach(singlePackage => {
                            flatAddons.push(
                                {
                                    ...addon, 
                                    id: singlePackage.id, 
                                    name: `${addon.name} \n ${singlePackage.name}`, 
                                    price: singlePackage.price
                                }
                            )
                        })
                    } else {
                        flatAddons.push(addon)
                    }
                })

                // console.log('> flat addons', flatAddons.length)
                this.setState({
                    addons: flatAddons,
                    loading: false
                })
            })
            .catch(error => {
                // console.log(error)
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        if(this.state.success)
            return <SubscriptionSuccess type='event' numberOfBack={2} navigation={this.props.navigation} longText={`Your event booking has been submited successfuly. One of our curators will contact you in a while. You can track or modify your booking details under 'My bookings'. Thank you!`} title={`Event Booked Successfuly`} onListPress='Event'/>
        return (
            <Container style={{backgroundColor: '#fff'}}>
                <Content style={{backgroundColor: '#fff'}}>
                    <View style={{padding: 20}}>
                    <Label>Select Addons</Label>
                    <AddonsMultipleSelect 
                        addons={this.state.addons} 
                        selectedAddons={this.state.selectedAddons} 
                        toggle={this.toggleAddonSelection}
                        toggleAddon={this.toggleAddon}
                        inSelectedAddons={this.inSelectedAddons}
                    />
                    </View>
                </Content>
                <View style={{ backgroundColor: '#fff', padding: 20, borderTopWidth: 1, borderBottomWidth: 1, flexDirection: 'row'}}>
                        <View style={{flexDirection: 'row', flex: 3}}>
                            <Text style={{fontFamily: 'Lato-Heavy', fontSize: 18}}>Total</Text>
                        </View>
                        <Text>{(this.state.total * 1.15).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB</Text>
                </View>
                <Button label="Book Event" action={this.book}/>
                {
                    this.state.loading ? 
                    <Loading />
                    :null
                }

                {/* {
                    this.state.success ?
                    <Popup
                        visible={this.props.success}
                        back={()=>{this.setState({success: false}, () => {
                            const popAction = StackActions.pop({
                                n: 3,
                            });
                              console.log('>>> popping')
                            props.navigation.dispatch(popAction);
                            props.navigation.navigate('Event')
                        })}}>
                        <View style={{
                                width: '80%', paddingTop: 16,
                                alignSelf: 'center', backgroundColor: '#F1F9FF',
                                justifyContent: 'center', alignItems: 'center',
                                borderRadius: 20 }}>
                            <Text style={{
                                color:'#6D6F72', 
                                fontSize:18, textAlign: "center",
                            }}>Event Booking Request submitted succesfully.</Text>
                            <CustomIcon name='checked-circle' style={{fontSize: 50, color: '#01BAE6', padding: 10}} onPress={()=>{this.setState({success: false}, () => this.props.navigation.navigate('Event'))}}/>
                        </View>
                    </Popup>
                    :null
                } */}
            </Container>
        )
    }
}

export default SelectAddonsScreen