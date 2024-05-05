import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Button, Input, Loading, Popup, CustomIcon } from '../common';
import { Container, Content, Footer } from 'native-base';
import styles from '../styles';

const cover = require('../../assets/blueSpace_icon.png');

import { resetPassword }  from './actions';
import { connect } from 'react-redux';

class ForgotPassword extends Component {
    static navigationOptions= {
         title: 'Password Recovery'
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailErr: '',
            emailFocused: false,
        }
        this.reset = this.reset.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
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

    validateEmail() {
        let emailErr = '';
        if (!this.state.email) {
          emailErr = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) {
          emailErr = 'Invalid email address'
        }
        this.setState({emailErr, emailFocused: true});
    }

    onEmailChange(value) {
        this.setState({email:value});
        if(this.state.emailFocused){
            this.validateEmail();
        }
    }

    reset() {
        this.validateEmail();
        if(this.state.emailErr === '' ){
            this.props.resetPassword(this.state.email);
        }
    }

    renderSuccess() {
        return (
            <Popup
                visible={this.props.reseted}
                back={()=>this.props.navigation.navigate('Login')}>
                <View style={[styles.feedback]}>
                    <Text style={{
                        color:'#6D6F72', 
                        fontSize:18, textAlign: "center",
                    }}>{this.props.message}</Text>
                    <CustomIcon name='checked-circle' style={{fontSize: 50, color: '#01BAE6', padding: 10}}/>
                </View>
            </Popup>
        )
    }

    render() {
        return (
            <Container>
                <Content padder style={[styles.content]}>

                    <View style={[styles.contentCenter]}>

                        <Image
                            style={{width: 150, height: 150, marginBottom: 5, alignSelf: 'center'}}
                            source={cover}
                        />

                        <View>
                            <Input
                                label="Email"
                                value={this.state.email}
                                error={this.state.emailErr}
                                onBlur={this.validateEmail}
                                onChange={(value)=>this.onEmailChange(value)}
                                keyboardType='email-address' />

                            <View>
                                <Button label="REQUEST PASSWORD" action={() => this.reset()} style={{flex:1, width:'100%'}} />
                            </View>
                        </View>
                        
                    </View>

                </Content>

                <Footer style={[styles.footerContainer]}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Signup')}
                        style={{
                            height: 40, alignSelf: 'center', justifyContent: 'center',
                            width: '100%',
                        }}>
                        <Text style={{alignSelf:'center', color: '#6D6D6D'}}>Not a member yet? Join today</Text>
                    </TouchableOpacity>
                </Footer>

                {this.renderLoading()}

                {this.renderSuccess()}

            </Container>
        );
    }

}

function mapStateToProps(state){
    return {...state.loginReducer}
}
const mapDispatchToProps = dispatch => ({
    resetPassword(email){
        dispatch(resetPassword(email))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)