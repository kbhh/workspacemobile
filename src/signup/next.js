import React, {Component} from 'react';
import { View, Text, Image, Picker } from 'react-native';
import { Container, Content, Label } from 'native-base';
import {Button, Input, Loading, CustomIcon, Popup, } from '../common';
import styles from '../styles';
import { connect } from 'react-redux';
import { signupProcessor } from './actions';
import HeaderTitle from '../common/HeaderTitle';

const cover = require('../../assets/launch_screen.1.png');


class NextSignup extends Component {
    static navigationOptions= {
        // title: 'Sign up'
        headerTitle: <HeaderTitle title='Signup' />,
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            // username: '',
            password: '',
            confirmPassword: '',
            emailErr: '',
            usernameErr: '',
            passwordErr: '',
            confirmPasswordErr: '',
            emailFocused: '',
            passwordFocused: '',
            confirmPasswordFocused: '',
            businessType: 'International Corporate',
            companyName: '',
            visible: this.props.registered
        };
        this.renderSuccess = this.renderSuccess.bind(this);
        this.signup = this.signup.bind(this);
        this.validate = this.validate.bind(this);
        this.validatePassword= this.validatePassword.bind(this);
        this.validateConfirmPassword= this.validateConfirmPassword.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    }

    renderLoading() {
        if (this.props.loading) {
            return ( <Loading />)
        } else {
            return null
        }
    }

    renderSuccess() {
        return (
            <Popup
                visible={this.state.visible}
                back={()=>this.props.navigation.navigate('Login')}>
                <View style={{
                        width: '80%', paddingTop: 16,
                        alignSelf: 'center', backgroundColor: '#F1F9FF',
                        justifyContent: 'center', alignItems: 'center',
                         borderRadius: 20 }}>
                    <Text style={{
                        color:'#6D6F72', 
                        fontSize:18, textAlign: "center",
                    }}>
                        Registration Success. We have sent you an email. Please verify your account. </Text>
                    <CustomIcon onPress={() => this.setState({visible: false})} name='checked-circle' style={{fontSize: 50, color: '#01BAE6', padding: 10}}/>
                </View>
            </Popup>
        )
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.registered){
            this.setState({visible: true})
        }
    }

    signup() {
        this.validate();
        if(this.state.emailErr === '' && this.state.passwordErr === ''
            && this.state.confirmPasswordErr === '') {
                let user = {
                    "firstName": this.props.firstName,
                    "lastName": this.props.lastName,
                    "phone": `+251${this.props.phone}`,
                    "email": this.state.email,
                    "password": this.state.password,
                    "birthDate": this.props.birthDate,
                    "businessType": this.state.businessType,
                    "companyName": this.state.companyName
                };
                this.props.signupProcessor(user);
            }
    }

    validate() {
        this.validateEmail();
        this.validatePassword();
        this.validateConfirmPassword();
        this.validateUsername();
    }

    onEmailChange(value) {
        console.log(value)
        this.setState({email:value});
        if(this.state.emailFocused){
            this.validateEmail();
        }
    }

    onUsernameChange = (value) => {
        this.setState({username: value})
    }

    onChangePassword(value) {
        this.setState({password:value});
        if(this.state.passwordFocused) {
            this.validatePassword();
        }
    }

    onChangeConfirmPassword(value) {
        this.setState({confirmPassword:value});
        if(this.state.confirmPasswordFocused) {
            this.validateConfirmPassword();
        }
    }

    validateEmail() {
        let emailErr = '';
        if (!this.state.email) {
          emailErr = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) {
          emailErr = 'Invalid email address'
        }
        this.setState({emailErr, emailFocused: true});
    }

    validatePassword() {
        let passwordErr = '';
        if (!this.state.password) {
            passwordErr = 'Required'
        } else if (this.state.password.length < 6) {
            passwordErr = 'Must be 6 characters or more'
        }
        this.setState({passwordErr, passwordFocused: true});
    }

    validateUsername = () => {
        let usernameErr = '';
        if (!this.state.username) {
            usernameErr = 'Required'
        }
        this.setState({usernameErr: usernameErr});
    }

    validateConfirmPassword() {
        let confirmPasswordErr = '';
        if (!this.state.confirmPassword) {
            confirmPasswordErr = 'Required'
        } else if( this.state.confirmPassword.length < 6) {
            confirmPasswordErr = 'Must be 6 characters or more'
        } else if( this.state.confirmPassword !== this.state.password ) {
            confirmPasswordErr = 'Confirmation password must be the same as password'
        }
        this.setState({confirmPasswordErr, confirmPasswordFocused: true})
    }

    render() {
        // console.log(this.props.firstName)
        // if(this.props.registered && !this.state.updated)
        //     this.setState({visible: true})
        return (
            <Container>
                <Content style={{...styles.content, backgroundColor: '#fff'}}>
                    <Image
                        style={{marginBottom: 5, alignSelf:'center', resizeMode: 'center', height: 100}}
                        source={cover}
                    />
                    <View style={{...styles.contentCenter, padding: 20}}>
                        <Label>Business Type</Label>
                        <Picker
                            mode="dropdown"
                            iosIcon={<CustomIcon name="arrow-down" />}
                            style={{ flex: 1}}
                            placeholder="Select your business type"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.businessType}
                            onValueChange={value => this.setState({businessType: value})}
                            >
                                <Picker.Item key="corporate" label="International Corporate" value="International Corporate" />
                                <Picker.Item key="domestic" label="Domestic Company" value="Domestic Company" />
                                <Picker.Item key="ngo" label="NGO" value="NGO" />
                                <Picker.Item key="startup" label="Startup" value="Startup" />
                                <Picker.Item key="consultant" label="Consultant" value="Consultant" />
                                <Picker.Item key="visitor" label="Visitor" value="Visitor" />
                                <Picker.Item key="other" label="Other" value="Other" />
                        </Picker>
                        <Input
                            label="Company Name"
                            value={this.state.companyName}
                            error={this.state.companyNameErr}
                            onChange={(value)=>this.setState({companyName: value})}
                            // onBlur={thi}
                            />
                        <Input
                            label="Email"
                            value={this.state.email}
                            error={this.state.emailErr}
                            onChange={(value)=>this.onEmailChange(value)}
                            onBlur={this.validateEmail}
                            keyboardType='email-address' />
                        
                        <Input
                                label="Password"
                                value={this.state.password}
                                error={this.state.passwordErr}
                                onChange={(value)=>this.onChangePassword(value)}
                                onBlur={this.validatePassword}
                                secureTextEntry={true} />
                        <Input
                                label="Confirm password"
                                value={this.state.confirmPassword}
                                error={this.state.confirmPasswordErr}
                                onChange={(value)=>this.onChangeConfirmPassword(value)}
                                onBlur={this.validateConfirmPassword}
                                secureTextEntry={true} />

                        <Button label="Signup" action={this.signup} />

                        {this.renderSuccess()}
                    </View>
                    {this.renderLoading()}
                </Content>
                
            </Container>
        )
    }
}

function mapStateToProps(state){
    return {...state.signupReducer}
}
const mapDispatchToProps = dispatch => ({
    signupProcessor(user){
        dispatch(signupProcessor(user))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(NextSignup);