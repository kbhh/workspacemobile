import React, { Component } from 'react'
import { Container, Content, Label } from 'native-base'
import { Text, View, Alert } from 'react-native'
import AxiosInstance from '../interceptor';
import { Loading, Button, Popup } from '../common';
import AddonsMultipleSelect from '../common/addonsMultipleSelect';
import Bill from '../common/bill';
import dayjs from 'dayjs'
import { Icon } from 'react-native-elements';

class SelectMeetingAddonsScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            addons: [],
            selectedAddons: [],
            total: 0,
            meeting: {},
            modalVisible: false
        }
    }

    getTotalNumberOfHours = (startDate, endDate, eventSpace) => {
        
    }

    getTotal = () => {
        let total = 0
        total += this.state.pricing ? this.state.pricing.unitPrice * this.state.meeting.duration : 0
        this.state.selectedAddons.forEach(addon => {
            switch(addon.unit){
                case 'person':
                case 'invitation':
                    total += this.state.meeting.numberOfAttendants * parseFloat(addon.price)
                    break
                case 'hour':
                    total += this.state.meeting.duration * parseFloat(addon.price)
                    break
                default:
                    if(addon.price != -1)
                        total += parseFloat(addon.price)
            }
        });
        return total
    }

    componentDidMount() {
        // this.props.navigation.getParam('type',)
        this.getAddons()
        this.getTotal()
        console.log('> getBillProps', this.props.navigation.getParam('getBillProps', 'no'))
        this.setState({
            meetingRoom: this.props.navigation.getParam('meetingRoom', {}),
            meeting: this.props.navigation.getParam('meeting', {}),
            pricing: this.props.navigation.getParam('pricing', {})
        })
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
                        cat = category.name === 'meeting' ? true : cat
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

    getBillProps = () => {
        let meeting = this.state.meeting ? this.state.meeting : {}
        let meetingRoom = this.state.meetingRoom ? this.state.meetingRoom: {}
        let props =  {
            subtotal: this.getTotal(),
            items: [
                {
                    key: 'Meeting Room',
                    value: meetingRoom.name
                },
                {
                    key: 'Number of Attendants',
                    value: meeting.numberOfAttendants
                },
                {
                    key: 'Start Time',
                    value: meeting.startTime
                },
                {
                    duration: 'Duration',
                    value: meeting.duration
                },
                {
                    key: 'Start Date',
                    value: dayjs(meeting.startDate).format('MMM DD, YYYY')
                },
            ]
        }
        this.state.selectedAddons.forEach(addon => props.items.push({key: addon.name, value: `${addon.price}/${addon.unit}`}))
        return props
    }

    render() {
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
                <Popup visible={this.state.modalVisible} back={() => this.setState({modalVisible: false})}>
                        <View style={{alignSelf: 'center', marginLeft: 10, marginRight: 10, width: '95%', backgroundColor: '#fff'}} onPress={() => props.setModalVisible(!props.modalVisible)}>
                            <Bill {...this.getBillProps()}/>
                            {/* <Button action={() => props.setModalVisible(!props.modalVisible)} label="Ok" /> */}
                        </View>
                    </Popup>
                <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderTopWidth: 1, borderBottomWidth: 1}}>
                    <View style={{flex: 3, flexDirection: 'row'}}>
                        <Text style={{fontFamily: 'Lato-Heavy', fontSize: 18, paddingRight: 10}}>Total</Text>
                        <Icon size={25} name="info" onPress={() => this.setState({modalVisible: true})}/>
                    </View>
                    <Text>{(this.getTotal()*1.15).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB</Text>
                </View>
                <Button label="Checkout" action={() => this.props.navigation.navigate('EventPaymentChoice', {meeting: this.state.meeting, selectedAddons: this.state.selectedAddons})}/>
                {
                    this.state.loading ? 
                    <Loading />
                    :null
                }
            </Container>
        )
    }
}

export default SelectMeetingAddonsScreen