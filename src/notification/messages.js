import React, { Component } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { Container, Content, Textarea } from 'native-base';
import AxiosInstance, { URL } from '../interceptor';
import { Icon } from 'react-native-elements';
import ProfileIcon from '../common/profileIcon'

class Message extends Component {
    static navigationOptions = ({navigation}) => {
        let sender = navigation.getParam('sender', {})
        //   title: 'Notification'
        console.log('> sender ', sender)
        return {
            headerTitle: <View style={{flexDirection: 'row'}}>
                    {
                        sender.currentProfileImage ?
                <Image source={{uri: `${URL}Containers/account/download/${sender.currentProfileImage}`}} style={{backgroundColor: '#eee', width: 40, height: 40, borderRadius: 20}} />
                        : 
                        <ProfileIcon />
                    }
                    <View style={{flex: 3, marginLeft: 5, alignSelf: 'center'}}>
                      <Text style={{fontFamily: 'Lato-Regular'}}>{sender.firstName} {sender.lastName}</Text>
                    </View>
            </View>,
        }
        };
    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            sender: {},
            user: {},
            loading: false,
            message: ''
        }
    }

    getMessages = () =>{
        this.setState({loading: true})
        AxiosInstance.get(`Messages/${this.state.user.id}/conversation/${this.state.sender.id}`)
            .then(response => {
                this.setState({messages: response.messages, loading: false})
                // console.log('> messages', response)
            })
            .catch(error => {
                console.log('> error ', error)
                this.setState({loading: false})
            })
    }

    componentDidMount(){
        let sender = this.props.navigation.getParam('sender', {})
        let currentUser = this.props.navigation.getParam('user', {})

        this.setState({
            sender: sender,
            user: currentUser
        }, () => {
            this.getMessages()
        })
    }

    sendMessage = () => {
        if(this.state.message){
            AxiosInstance.post('Messages', {
                toId: this.state.sender.id,
                fromId: this.state.user.id,
                body: this.state.message,
                status: "unread"
            })
            .then(response => {
                this.setState({message: '', loading: false})
                this.getMessages()
            })
            .catch(error => {
                this.setState({loading: false})
            })
        }
    }

    _scrollEnd = (evt) => {
        this.refs.flatList.scrollToEnd();
    }

    render(){
        return (
            <Container>
                <FlatList
                    data={this.state.messages}
                    ListEmptyComponent={<Text style={{padding: 40, textAlign: 'center', fontSize: 24}}>No conversation yet</Text>}
                    onRefresh={this.getMessages}
                    refreshing={this.state.loading}
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({animated: false})}
                    onLayout={() => this.flatList.scrollToEnd({animated: false})}
                    renderItem={({item})=> (
                        <View
                            key={item.id}
                            style={{
                                flexDirection:'row', justifyContent: 'space-between',
                                backgroundColor: item.fromId == this.state.user.id ? '#2691cf': '#fff', 
                                padding: 10,
                                borderRadius: 5,
                                margin: 5,
                                width: '80%',
                                alignSelf: item.fromId == this.state.user.id ? 'flex-end' : 'flex-start',
                                alignItems: item.fromId == this.state.user.id ? 'flex-end' : "flex-start",
                            }}>
                            <Text style={{color: item.fromId == this.state.user.id ? '#fff' : '#000'}}>{item.body}</Text>
                        </View>
                    )}/>
                <View style={{backgroundColor: '#fff', padding: 0, shadowColor: '#eee', flexDirection: 'row'}}>
                    <Textarea value={this.state.message} style={{flex: 3}} rowSpan={2} onChangeText={(text) => this.setState({message: text})} placeholder="enter message"/>
                    <TouchableOpacity style={{alignSelf: "center", paddingRight: 5}} onPress={() => this.sendMessage()}>
                        <Icon name="send" />
                    </TouchableOpacity>
                </View>
            </Container>
        )
    }
}

export default Message