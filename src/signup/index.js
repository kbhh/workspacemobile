import React, {Component} from 'react';
import { View, Image } from 'react-native';
import { Container, Content, DatePicker, Label } from 'native-base';
import { Button, Input } from '../common';
import styles from '../styles';
import { gotoNext }  from './actions';
import { connect } from 'react-redux'
import HeaderTitle from '../common/HeaderTitle';

const cover = require('../../assets/launch_screen.1.png');

class Screen extends Component {
    static navigationOptions= {
        // title: 'Sign up'
        headerTitle: <HeaderTitle title='Signup' />,
    };

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            firstNameErr: '',
            lastNameErr: '',
            emailErr: '',
            phoneErr: '',
            birthDate: '',
            firstNameFocused: false,
            lastNameFocused: false,
            phoneFocused: false,
        }
        this.next = this.next.bind(this);
        this.validate = this.validate.bind(this);
        this.onfirstNameChange = this.onfirstNameChange.bind(this);
        this.onlastNameChange = this.onlastNameChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.validatePhone = this.validatePhone.bind(this);
        this.validatefirstName = this.validatefirstName.bind(this);
        this.validatelastName = this.validatelastName.bind(this);
    }

    next() {
        this.validate();
        console.log(this.state.firstNameErr === '' && this.state.lastNameErr === '' && this.state.phoneErr === '')
        if(this.state.firstNameErr === '' && this.state.lastNameErr === '' && this.state.phoneErr === ''){
            this.props.gotoNext(
                this.state.firstName,
                this.state.lastName,
                this.state.phone
            )
        }
    }

    validate() {
        this.validatefirstName();
        this.validatelastName();
        this.validatePhone();
    }

    onfirstNameChange(value) {
        this.setState({firstName:value});
        if(this.state.firstNameFocused){
            this.validatefirstName();
        }
    }

    onlastNameChange(value) {
        this.setState({lastName:value});
        if(this.state.lastNameFocused){
            this.validatelastName();
        }
    }

    onPhoneChange(value) {
        this.setState({phone:value});
        if(this.state.phoneFocused){
            this.validatePhone();
        }
    }

    validatePhone() {
        console.log(this.state.phone)
        let phoneErr = '';
        if (!this.state.phone) {
            phoneErr = 'Required'
        } else if (this.state.phone.length < 10 || this.state.phone.length > 15) {
            console.log('Has error', this.state.phone.length)
            phoneErr = 'Invalid phone'
        }
        this.setState({phoneErr, phoneFocused: true});
    }

    validatefirstName() {
        let firstNameErr = '';
        if (!this.state.firstName) {
            firstNameErr = 'Required';
          } 
        this.setState({firstNameErr, firstNameFocused: true});
    }

    validatelastName() {
        let lastNameErr = '';
        if (!this.state.lastName) {
            lastNameErr = 'Required';
          } 
        this.setState({lastNameErr, lastNameFocused: true});
    }

    render() {
        return (
            <Container style={{margin: 0, padding: 0}}>
                <Content style={{...styles.content, backgroundColor: '#fff'}}>
                    <Image
                        style={{alignSelf:'center', resizeMode: 'center', width: '40%', height: 100, padding: 0, margin: 0}}
                        source={cover}
                    />
                    <View style={{...styles.contentCenter, padding: 30, margin: 0}}>
                        <Input
                                label="First name"
                                value={this.state.firstName}
                                error={this.state.firstNameErr}
                                onChange={(value)=>this.onfirstNameChange(value)}
                                onBlur={this.validatefirstName} />

                        <Input
                                label="Last name"
                                value={this.state.lastName}
                                error={this.state.lastNameErr}
                                onChange={(value)=>this.onlastNameChange(value)}
                                onBlur={this.validatelastName} />
                        
                        <Input 
                            label="Phone"
                            keyboardType='phone-pad'
                            maxLength={15}
                            value={this.state.phone}
                            onBlur={this.validatePhone}
                            error={this.state.phoneErr}
                            onChange={(value) => this.onPhoneChange(value)} />
                        <Label>Date of birth</Label>
                        <DatePicker
                            // defaultDate={new Date(2018, 4, 4)}
                            minimumDate={new Date(1950, 1, 1)}
                            maximumDate={new Date(2015, 12, 31)}
                            locale={"en"}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={false}
                            animationType={"fade"}
                            androidMode={"default"}
                            placeHolderText="Date of birth"
                            textStyle={{ color: "#ddd" }}
                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                            onDateChange={(newDate) => this.setState({birthDate: newDate})}
                            disabled={false}
                            />
                        <View>
                            <Button label="Next" action={this.next} />
                        </View>
                        
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    gotoNext(firstName, lastName, phone, birthDate){
        dispatch(gotoNext(firstName, lastName, phone, birthDate))
    }
})
export default connect(null, mapDispatchToProps)(Screen)