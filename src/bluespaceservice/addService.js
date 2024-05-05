import React, { Component } from 'react'
import { Container, Content, Label, Toast } from 'native-base'
import { Text, View, Alert } from 'react-native'
import AxiosInstance from '../interceptor';
import { Loading, Button, Popup, CustomIcon, Input } from '../common';
import AddonsMultipleSelect from '../common/addonsMultipleSelect';
import { StackActions } from 'react-navigation';
import HeaderTitle from '../common/HeaderTitle';

class SelectAddonsScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            addons: [],
            selectedAddons: [],
            total: 0,
        }
    }

    static navigationOptions = ({ navigation }) => {        
        return {
            headerTitle: (<HeaderTitle title='Book A service' />),
        };
    }

    book = () => {
       this.setState({loading: true})
       AxiosInstance.post('AddonBookings', {status: 'pending'})
        .then(response => {
            AxiosInstance.post(`AddonBookings/${response.id}/addAddons`, {addons: this.state.selectedAddons})
                .then(addonsResponse =>{
                    this.setState({success: true})
                    console.log('> addon booking success', response)
                    Toast.show({
                        text: 'Service booking request submitted successfuly',
                        buttonText: '',
                        textStyle: {
                            fontFamily: 'Lato-Light'
                        }
                    })
                    const popAction = StackActions.pop({
                        n: 2,
                    });
                    
                    this.props.navigation.dispatch(popAction);
                    this.props.navigation.navigate('Service')
                })
                .catch(error =>{
                    this.setState({loading: false})
                })
        })
        .catch(error => {
            console.log('> error', error)
            this.setState({loading: false})
        })
    }

    getTotal = () => {
        let total = 0
        this.state.selectedAddons.forEach(addon => {
            switch(addon.unit){
                case 'person':
                case 'invitation':
                case 'hour':
                    total += (addon.quantity ? addon.quantity : 1) * parseFloat(addon.price)
                    break
                default:
                    if(addon.price != -1)
                        total += parseFloat(addon.price)
            }
        });

        this.setState({total: total})
    }

    setAddonQuantity = (addon, quantity) => {
        let selectedAddons = [...this.state.selectedAddons]
        selectedAddons = selectedAddons.map(addon_ => {
            addon_.quantity = addon.id == addon_.id ? quantity : addon_.quantity
            return addon_
        })
        this.setState({selectedAddons: selectedAddons}, () => this.getTotal())
    }

    componentDidMount() {
        // this.props.navigation.getParam('type',)
        this.getAddons()
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
        return (
            <Container style={{backgroundColor: '#fff'}}>
                <Content style={{backgroundColor: '#fff'}}>
                    <View style={{padding: 20}}>
                    <Label>Select Service</Label>
                    <AddonsMultipleSelect 
                        addons={this.state.addons} 
                        quantity={true}
                        selectedAddons={this.state.selectedAddons} 
                        toggle={this.toggleAddonSelection}
                        toggleAddon={this.toggleAddon}
                        inSelectedAddons={this.inSelectedAddons}
                        setAddonQuantity={this.setAddonQuantity}
                    />
                    </View>
                </Content>
                <View style={{ backgroundColor: '#fff', padding: 20, borderTopWidth: 1, borderBottomWidth: 1, flexDirection: 'row'}}>
                        <View style={{flexDirection: 'row', flex: 3}}>
                            <Text style={{fontFamily: 'Lato-Heavy', fontSize: 18}}>Total</Text>
                        </View>
                        <Text>{(this.state.total * 1.15).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB</Text>
                </View>
                <Button label="Book Service" action={this.book}/>
                {
                    this.state.loading ? 
                    <Loading />
                    :null
                }
            </Container>
        )
    }
}

export default SelectAddonsScreen