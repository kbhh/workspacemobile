import React, { Component } from 'react'
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';
import Input from './input';

export const AddonItem = ({addon, inSelectedAddons, toggleAddon, quantity, setAddonQuantity}) => (
    <View>
        <TouchableOpacity onPress={() => toggleAddon(addon)} style={{flexDirection: "row", padding: 20, borderBottomColor: '#eee', borderBottomWidth: 1}}>
        <View style={{ width: 18, height: 18, padding: 2, borderWidth: 1, borderRadius: 12, borderColor: inSelectedAddons(addon) ? '#000' : '#ddd', alignSelf: 'center'}}>
            {
                inSelectedAddons(addon) ?
                <Icon name="check" size={12}/>
                :null
            }
        </View>
        <View style={{flex: 1}}>
            <Text style={{fontFamily: 'Lato-LightItalic', paddingLeft: 10}}>{addon.name}</Text>
        </View>
        <Text style={{textAlign: 'right'}}>{`${addon.price == -1 ? 'TBD' : addon.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ETB'} ${addon.price != -1 && addon.unit !== 'service' ? '/' + addon.unit : ''}`}</Text>
    </TouchableOpacity>
    {
        quantity && inSelectedAddons(addon) && addon.price != -1 && addon.unit !== 'service' ?
            <View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10, }}>
            <Input label={`Enter number of ${addon.unit}s`} keyboardType="number-pad" value={addon.quantity} onChange={text => setAddonQuantity(addon, text)} />
            </View>
        :null
    }
    </View>
)

class AddonsMultipleSelect extends Component{
    constructor(props){
        super(props);

        this.state = {
            addons: [],
            selectedAddons: []
        }
    }

    render(){
        const props = this.props
        console.log(props.addons[0], "first addons", props.addons)
        return (
            <ScrollView style={{width: '100%', borderRadius: 5, borderWidth: 1, borderColor: '#eee'}}>
                {
                    props.addons.map(addon => {
                        return <AddonItem addon={addon} key={addon.id} {...this.props} />
                    })
                }
            </ScrollView>
        )
    }
}
 

export default AddonsMultipleSelect