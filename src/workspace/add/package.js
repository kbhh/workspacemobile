import React from 'react'
import { View, Container, Input, Form, Item, Label, Picker, Content, CheckBox } from 'native-base'
import { Text, Dimensions, Modal, TouchableOpacity, Linking, LinkingIOS } from 'react-native'
import { styles } from './styles'
import { Button, Popup } from '../../common'
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import Bill from '../../common/bill';


const deviceHeight = Dimensions.get("window").height;
// const deviceHeight = Dimensions.get

const maxUnit = (unit, pricings) => {
    if(unit == 'day')
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
    let durations = []
    return pricings.map(pricing => pricing.duration).filter(duration => {
        if (durations.includes(duration)) return false
        durations.push(duration)
        return true
    }).sort()
}

const paymentTypeDescription = {
    bank: 'You will be required to upload bank voucher after you paid through our bank account',
    amole: 'You will be redirected to amole'
}

const getUnitPickerItems = (pricings, props) => {
    let units = []
    let newPricings = []

    pricings.forEach(pricing => {
        if(!units.includes(pricing.unit)){
            units.push(pricing.unit)
            newPricings.push(pricing)
        }
    })
    if(!units.includes(props.unit)){
        props.changeState({unit: units[0]})
    }
    return newPricings
}

const deskTypeDescription = {
    hot: 'Day Pass',
    enclosed: 'Private Office',
    dedicated: 'Dedicated Desk'
}

const filterServices = (services) => {
    let serviceCapacities = []

    return services.filter(service => {
        if(serviceCapacities.includes(service.capacity))
            return false
        serviceCapacities.push(service.capacity)
        return true
    }).sort((service1, service2) => {
            if (service1.capacity < service2.capacity)
                return -1;
            if (service1.capacity > service2.capacity)
                return 1;
            return 0;
    })
}

const getBillProps = (props) => ({
        subtotal: props.total,
        items: [
            {
                key: 'Workspace type',
                value: deskTypeDescription[props.deskType]
            },
            {
                key: 'Location',
                value: props.location.name
            },
            {
                key: 'Capacity',
                value: `${props.deskType === 'hot' ? 
                            props.capacity : props.service.capacity
                        } Desk${props.deskType === 'hot' ? 
                            props.capacity > 1 ? 's' : '' : props.service.capacity > 1 ? 's' : ''
                        }`
            },
            {
                key: 'Duration',
                value: `${props.deskType === 'hot' ? 
                            props.pricing.duration:  props.duration
                        } ${props.deskType === 'hot' ? 
                            'day' : props.unit}${props.deskType === 'hot' ? 
                            props.pricing.duration > 1 ? 's': '' : props.duration>1? 's': ''}`
            },
            {
                key: 'Advance',
                value: `${props.pricing.advanceDuration} ${props.pricing.unit}s`
            }
        ]
})

const getTotalFormatted = (total) => {
    return total.toLocaleString("en-US", {minimumFractionDigits: 2})
}


const WorkspacePackage = (props) => (
    <Container style={{...styles.subContainer, height: deviceHeight, alignItems: "flex-start", backgroundColor: '#fff', paddingTop: 10}}>
       <Content style={{width: '100%', height: "100%"}}>
       <Form style={{width: '100%', paddingLeft: 20, paddingRight: 20}}>
                <Item stackedLabel picker>
                    <Label>Number of desks: </Label>
                    {
                        props.deskType === 'hot' ?
                        <Input value={'' + props.capacity} keyboardType="number-pad" onChangeText={text => {
                            console.log(text)
                            props.changeState({capacity: text})
                        }}/>
                        
                        :
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: '100%', color: '#999'}}
                            // placeholder="Select your SIM"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#999"
                            selectedValue={props.service.id}
                            onValueChange={value => props.selectService(value, () => console.log('> service selected', value))}
                        >
                            {
                                filterServices(props.services).map(service => (
                                    <Picker.Item key={service.id} label={`${service.capacity} desk${service.capacity > 1 ? 's': ''}`} value={service.id} />
                                ))
                            }
                        </Picker>
                    }
                </Item>
            {
                props.deskType === 'hot' ?
                    <View style={{paddingLeft: 10, paddingTop: 20}}>
                        <Item stackedLabel picker>
                        <Label style={{}}>Number of {props.unit}s:  </Label>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{width: '100%', color: '#999'}}
                            placeholder="Select number of days"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={props.pricing}
                            onValueChange={value => props.changeState({pricing: value}, () => console.log('> set pricing', props.pricing))}
                        >
                            {
                                props.service.pricings.map(pricing => (
                                    <Picker.Item key={pricing.id} label={`${pricing.duration}`} value={pricing} />
                                ))
                            }
                        </Picker>
                    </Item>
                    {
                        props.pricing.extra ?
                        <Item stackedLabel picker onPress={() => console.log('> pricing', props.pricing)}>
                        <Label>Pass Type:         </Label>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: '100%', color: '#999'}}
                            placeholder="Select number of days"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={props.passType}
                            onValueChange={value => props.changeState({passType: value})}
                        >
                            {
                                props.pricing.workingHour ?
                                    <Picker.Item label={`${props.pricing.workingHour.name ? props.pricing.workingHour.name : 'Full'} (${props.pricing.workingHour.start}-${props.pricing.workingHour.end})`} value="full" />
                                :null
                            }
                            {
                                props.pricing.extra ?
                                    <Picker.Item label={`${props.pricing.extra.name ? props.pricing.extra.name : 'Restricted'} (${props.pricing.extra.start}-${props.pricing.extra.end})`} value="restricted" />
                                :null
                            }
                        </Picker>
                    </Item>: null
                    }
                    
                    </View>
                :
                <View>
                    <Item picker stackedLabel style={{marginLeft: 18, paddingTop: 20}}>
                    <Label style={{}}>Duration: </Label>
                    {/* <Label></Label> */}
                    <View style={{flexDirection: "row"}}>
                    <Picker
                                mode="dropdown"
                                // iosIcon={<Icon name="arrow-down" />}
                                style={{ flex: 1, color: '#999'}}
                                placeholder="Select number of days"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#999"
                                selectedValue={props.duration}
                                onValueChange={value => props.changeState({duration: value})}
                            >
                                {
                                    maxUnit(props.unit, props.service.pricings).map(item => (
                                        <Picker.Item key={item} label={item + ''} value={item + ''} />
                                    ))
                                }
                        </Picker>
                        <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ flex: 1, color: '#999'}}
                                    placeholder="Select number of days"
                                    placeholderStyle={{ color: "#999" }}
                                    placeholderIconColor="#999"
                                    selectedValue={props.unit}
                                    onValueChange={value => props.changeState({unit: value})}
                                >
                                    {
                                        getUnitPickerItems(props.service.pricings, props).map(pricing => {
                                            return <Picker.Item label={pricing.unit} key={pricing.unit} value={pricing.unit} />
                                        })
                                    }                            
                                </Picker>
                    </View>
                    </Item>
                </View>
            }
            <Item stackedLabel style={{marginTop: 20}}>
                <Label>Start date:  </Label>
                <DatePicker
                    style={{width: '100%', alignItems: 'flex-start', paddingTop: 10}}
                    date={props.startDate}
                    mode="date"
                    placeholder="Select start date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Select"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                    },
                    dateInput: {
                        marginLeft: 0,
                        padding: 0,
                        borderColor: '#fff'
                    }
                    }}
                    onDateChange={(date) => {props.changeState({startDate: date})}}
                />
            </Item>
          </Form>
        
        </Content>
        <View style={{flex: 2, position: 'absolute', left: 0, right: 0, bottom: 100}}>
            <View style={{flexDirection: "row", borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: '#000', borderTopColor: '#000', marginTop: 10, padding: 20}}>
                <View style={{flexDirection: "row", flex: 1}}>
                    <Text style={{fontSize: 18, fontFamily: 'Lato-Heavy'}}>Total</Text>
                    <Popup visible={props.modalVisible} back={() => props.setModalVisible(false)}>
                        <View style={{alignSelf: 'center', marginTop: '5%', marginLeft: 10, marginRight: 10, width: '80%', backgroundColor: '#fff'}} onPress={() => props.setModalVisible(!props.modalVisible)}>
                            <Bill {...getBillProps(props)} />
                            {/* <Button action={() => props.setModalVisible(!props.modalVisible)} label="Ok" /> */}
                        </View>
                    </Popup>
                    <TouchableOpacity
                        onPress={() => {
                            props.setModalVisible(true);
                        }} style={{alignSelf: 'center', paddingLeft: 10}}>
                            <Icon name="info" color="#2691cf"/>
                        </TouchableOpacity>
                </View>
                <Text style={{alignSelf: 'center'}}>{(props.total*1.15).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB</Text>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 5, marginLeft: 15}}>
            <CheckBox checked={props.agreed} onPress={() => props.changeState({agreed: !props.agreed})}/>
            <TouchableOpacity onPress={() => {
                    Linking.canOpenURL('http://bluespace.work/agreement').then(supported => {
                      if (supported) {
                        Linking.openURL('http://bluespace.work/agreement');
                      } else {
                        console.log("Don't know how to open URI: " + 'http://bluespace.work/agreement');
                      }
                    });
            }} style={{marginLeft: 15, flexDirection: 'row'}}>
                <Text style={{color: '#4cbae6'}}>Agree to workspace Terms and conditions</Text>
            </TouchableOpacity>
            </View>
            <Button label="Checkout"
                color={props.startDate && props.agreed ? '#fff' : "#eee"} 
                backgroundColor={props.startDate && props.agreed ? '#2691cf' : "#fff"} 
                action={props.startDate && props.agreed ? () => props.toNextStep('summary'): () => console.log('not active')} 
                />
        </View>
    </Container>
)

export default WorkspacePackage