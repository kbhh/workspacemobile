import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Container, Content, Form, Item, DatePicker, Label, Toast, Textarea } from 'native-base';
import HeaderTitle from '../common/HeaderTitle';
import { Input, Button, Loading } from '../common';
import AxiosInstance from '../interceptor';
import { NavigationActions } from 'react-navigation';
import { StackActions } from 'react-navigation';

class EditProfile extends Component {
    static navigationOptions = {
        headerTitle: <HeaderTitle title='Edit Profile' />,
    }
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            profile: {},
            dirty: false
        }
    }

    updateProfile = () => {
        if(this.state.dirty){
            this.setState({loading: true})
            AxiosInstance.patch('Accounts/me', this.state.profile)
                .then(response => {
                    this.setState({loading: false}, () => {
                        Toast.show({
                            text: 'Profile updated successfuly',
                            buttonText: '',
                            position: 'top',
                            textStyle: {
                                fontFamily: 'Lato-Light'
                            }
                        })
                        const popAction = StackActions.pop({
                            n: 2,
                        });
                          
                        this.props.navigation.dispatch(popAction);
                        this.props.navigation.navigate('Profile')
                    })
                })
                .catch(error => {
                    this.setState({loading: false}, () => {
                        Toast.show({
                            text: 'Error updating profile, Check your inputs',
                            buttonText: '',
                            position: 'top',
                            textStyle: {
                                fontFamily: 'Lato-Light'
                            }
                        })
                    })
                })
        } else {

        }
    }

    componentDidMount(){
        let profile = this.props.navigation.getParam('profile', '')
        if(profile)
            this.setState({
                profile: {
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    phone: profile.phone,
                    birthDate: new Date(),
                    bio: profile.bio,
                    profession: profile.profession
                }
            })
        else 
            this.props.navigation.goBack()
    }

    render(){
        return (
            <Container>
                <Content scrollEnabled style={{backgroundColor: '#fff'}}>
                    <Form style={{padding: 10}}>
                        <Input label="First Name" value={this.state.profile.firstName} onChange={(value) => this.setState({profile: {...this.state.profile, firstName: value}, dirty: true})}/>
                        <Input label="Last Name" value={this.state.profile.lastName} onChange={(value) => this.setState({profile: {...this.state.profile, lastName: value}, dirty: true})}/>
                        <Input label="Phone" value={this.state.profile.phone} keyboardType="number-pad" onChange={(value) => this.setState({profile: {...this.state.profile, phone: value}, dirty: true})}/>
                        <Input label="Profession" value={this.state.profile.profession} onChange={(value) => this.setState({profile: {...this.state.profile, profession: value}, dirty: true})}/>
                        <Item>
                            <Label>Date of birth</Label>
                            <DatePicker
                                // defaultDate={this.state.profile.birthDate}
                                minimumDate={new Date(1950, 1, 1)}
                                maximumDate={new Date(2015, 12, 31)}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select Date of birth"
                                textStyle={{ color: "#ddd" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={(newDate) => this.setState({profile: {...this.state.profile, birthDate: newDate}, dirty: true})}
                                disabled={false}
                                />
                        </Item>
                        <Item stackedLabel>
                            <Label>Bio</Label>
                            <Textarea rowSpan={5} bordered placeholder="Enter your bio"
                                value={this.state.profile.bio}
                                onChangeText={text => this.setState({profile: {...this.state.profile, bio: text}, dirty: true})}
                                placeholderStyle={{fontFamily: 'Lato-LightItalic', fontSize: 12}}
                                style={{width: '100%', fontFamily: 'Lato-Light'}}
                                />
                        </Item>
                    </Form>
                    <Button backgroundColor={this.state.dirty ? '#2691cf' : '#fff'}
                            color={this.state.dirty ? '#fff' : '#ddd'}
                            label="Update" action={() => this.state.dirty ? this.updateProfile() : console.log('update')} />
                </Content>
                {
                    this.state.loading ? 
                    <Loading />
                    :null
                }
            </Container>
        )
    }
}

export default EditProfile