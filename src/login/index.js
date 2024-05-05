import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Button, Loading, Input } from '../common';
import { Container, Content, Footer } from 'native-base';
import styles  from '../styles';

const cover = require('../../assets/launch_screen.1.png');

import { authProcessor }  from './actions';
import { connect } from 'react-redux';
import HeaderTitle from '../common/HeaderTitle';
class LoginForm extends Component {
    static navigationOptions= {
        //  title: 'Login'
        headerTitle: <HeaderTitle title="Login" />
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailErr: '',
            passwordErr: '',
            emailFocused: false,
            passwordFocused: false,
        }
        this.login = this.login.bind(this);
        this.validate = this.validate.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    async validate() {

      this.validateEmail();

      this.validatePassword();

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

    onEmailChange(value) {
        this.setState({email:value});
        if(this.state.emailFocused){
            this.validateEmail();
        }
    }

    onPasswordChange(value) {
        this.setState({password:value});
        if(this.state.passwordFocused){
            this.validatePassword();
        }
    }

    renderLoading() {
        if (this.props.loading) {
          return (
            <Loading />        
          )
        } else {
          return null
        }
      }

    async login() {
        await this.validate();
        if(this.state.emailErr === '' && this.state.passwordErr === ''){
            this.props.authProcessor(this.state.email, this.state.password);
        }
    }

    render() {
        return (
            <Container>
                <Content padder style={{...styles.content, backgroundColor: '#fff'}}>

                    <View style={[styles.contentCenter]}>

                        <View />
              
                        <Image
                            style={{marginBottom: 5, alignSelf:'center', resizeMode: 'center', height: '20%'}}
                            source={cover}
                        />
                        {/* <Text style={{alignSelf: "center", fontFamily: 'Lato-Light'}}>blueSpace</Text> */}

                        <View style={{flexDirection: 'column', justifyContent: 'space-between', marginTop: 30 }}>
                            <Input
                                    label="Email"
                                    value={this.state.email}
                                    error={this.state.emailErr}
                                    onBlur={this.validateEmail}
                                    onChange={(value)=>this.onEmailChange(value)}
                                    keyboardType='email-address' />
                            <Input
                                    style={{marginBottom: 5}}
                                    label="Password"
                                    secureTextEntry={true}
                                    error={this.state.passwordErr}
                                    value={this.state.password}
                                    onChange={(value)=>this.onPasswordChange(value)}
                                    onBlur={this.validatePassword}  />
                                
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('ForgotPassword')}
                                style={{ alignSelf: 'center', justifyContent: 'center'}}>
                                <Text style={{alignSelf:'center', color: '#6D6D6D'}}>Forgot your password?</Text>
                            </TouchableOpacity>
                        </View>

                        <Button label="LOG IN" action={() => this.login()}  />

                    </View>

                </Content>

                <Footer style={[styles.footerContainer]}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Signup')}
                        style={{
                            height: 40, justifyContent: 'center', width: '100%', 
                            borderTopWidth: 1, borderColor: '#B4B4B4',
                        }}>
                        <Text style={{alignSelf:'center', color: '#6D6D6D'}}>Not a member yet? Join today</Text>
                    </TouchableOpacity>
                    </Footer>

                {this.renderLoading()}

            </Container>
          
        );
    }

}

function mapStateToProps(state){
    return {
        authenticated: state.loginReducer.authenticated,
        loading: state.loginReducer.loading,
        token: state.loginReducer.token,
    }
}
const mapDispatchToProps = dispatch => ({
    authProcessor(email, password){
        dispatch(authProcessor(email, password))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);