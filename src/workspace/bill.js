import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { Container, Content, View } from 'native-base';
import { Body, Button, Loading } from '../common';
import styles from '../styles';
import dayjs from 'dayjs'
import { addWorkspace } from './actions';
import NavigationService from '../NavigationService';
import { StackActions } from 'react-navigation';
import SwitchSelector from 'react-native-switch-selector';
import HeaderTitle from '../common/HeaderTitle';


class Bill extends Component{ 
    static navigationOptions = {
        // title: 'WorkSpace Payment'
        headerTitle: <HeaderTitle title='workspace Payment' />,
    };

    constructor(props){
        super(props)

        this.state = {
            workspace: props.navigation.getParam('workspace', {})
        }
        
        this.getTotalPayment = this.getTotalPayment.bind(this)
        this.goToAmolePayment = this.goToAmolePayment.bind(this)
        this.goToBankPayment = this.goToBankPayment.bind(this)
    }

    getTotalPayment(){
        // const packages = this.props.navigation.getParam('packages', [])
        // if(this.state.workspace.workspaceCategory === 'hot desk'){
        //     return packages[0].amount * this.state.workspace.pass   
        // }
        // // TODO calculate payment
        // // const duration = this.state.workspace.duration * 30
        // // let package = packages.filter(package =>  package.time <== duration)
        // let package_ = this.props.navigation.getParam('package_', {})
        // return package_ ? package_.amount : 0
        return 1000
    }

    goToBankPayment(){
        NavigationService.navigate('PaymentWorkSpace');
        StackActions.reset({
            index: 0, 
            actions: [NavigationService.navigate('PaymentWorkSpace', {workspace: this.state.workspace})]
        });
    }

    goToAmolePayment(){
        console.log('amole')
    }

    render () {
        // WorkSpace.workspaceCategory
        let options = [
            {label: "Bank", value: "bank"},
            {label: "Amole", value: "amole", disabled: true},
        ]
        return (
            <Container>
                <Content style={[styles.content]}>
                    <Body>
                        {
                            this.props.loading ?
                            <Loading />
                            : null
                        }
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <View style={{padding: 2}}>
                                    <Text style={{fontSize: 18, fontFamily: 'Lato-Heavy'}}>Type</Text>
                                    {/* <Text>{this.state.workspace.workspaceCategory}</Text> */}
                                    <Text>Private Office</Text>
                                </View>
                                <View style={{padding: 2}}>
                                    <Text style={{fontSize: 18, fontFamily: 'Lato-Heavy'}}>Start</Text>
                                    <Text>{dayjs(this.state.workspace.start).format('MMM DD, YYYY HH:mm')}</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <View style={{padding: 2}}>
                                    <Text style={{fontSize: 18, fontFamily: 'Lato-Heavy'}}>Duration</Text>
                                    {/* <Text>{
                                        this.state.workspace.workspaceCategory == 'hot desk' ?
                                         `${this.state.workspace.pass} day${this.state.workspace.pass > 1 ? 's' : ''}` : 
                                         `${this.state.workspace.duration} month${this.state.workspace.duration > 1 ? 's' : ''}`
                                         }</Text> */}
                                        <Text>2 Months</Text>
                                </View>
                                <View style={{padding: 2}}>
                                    <Text style={{fontSize: 18, fontFamily: 'Lato-Heavy'}}>Total</Text>
                                    <Text>{this.getTotalPayment().toLocaleString("en-US", {minimumFractionDigits: 2})} ETB</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', padding: 2, paddingTop: 10}}>
                            <Text>Pay Via</Text>
                            {/* <SwitchSelector 
                                options={options} 
                                initial={0}
                                onPress={value => this.setState({ category: value })}
                                textColor='#01BAE6'
                                selectedColor='#ffffff'
                                buttonColor='#01BAE6'
                                borderColor='#01BAE6'
                                hasPadding /> */}
                            <View style={{flexDirection: 'column', padding: 2}}>
                                <Button label="Amole" action={this.goToAmolePayment}/>
                            </View>
                            <View style={{flexDirection: 'column', padding: 2}}>
                                <Button label="Bank" action={this.goToBankPayment}/>
                            </View>
                        </View>
                    </Body>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state)=> ({
    ...state.workspaceReducer
})

const mapDispatchToProps = dispatch => ({
    addWorkspace(workspace) {
      dispatch(addWorkspace(workspace))
    }
  })
  

export default connect(mapStateToProps, mapDispatchToProps)(Bill)