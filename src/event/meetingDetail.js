import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import HeaderTitle from '../common/HeaderTitle';
import { Container, Content } from 'native-base';
import AxiosInstance, { URL } from '../interceptor';
import ImagePicker from "react-native-image-picker";
import { Loading } from '../common';
import dayjs from 'dayjs';
import { Icon } from 'react-native-elements';
import Guests from './guests';

class MeetingDetail extends Component {
    static navigationOptions = {
        headerTitle: <HeaderTitle title='Meeting Detail' />,
    }
    constructor(props){
        super(props)

        this.state = {
            meeting: {}, 
            loading: false,
            meetingRoom: {},
            attendants: [],
            addons: []
        }
    }

    pickImageHandler = (type) => {
        ImagePicker.showImagePicker({title: "Upload profile picture", maxWidth: 800, maxHeight: 600}, res => {
          if (res.didCancel) {
            console.log("User cancelled!");
          } else if (res.error) {
            console.log("Error", res.error);
          } else {
            this.setState({
              pickedImage: res
            }, () => this.uploadImage(type));
    
          }
        });
      }
    
      resetHandler = () =>{
        this.setState({pickedImage: null})
      }
    
      uploadImage = (type) => {
          // this.setState({loading: true})
        // console.log(this.state.pickedImage, 'image =============')
        this.setState({
            loading: true
        })
        let formData = new FormData()
        let source = { uri: this.state.pickedImage.uri };
        const imageData = new FormData();
        imageData.append('name', 'images');
        imageData.append('images', {
            uri: this.state.pickedImage.uri,
            type: this.state.pickedImage.type,
            name: this.state.pickedImage.fileName,
            data: this.state.pickedImage.data
        });
    
        AxiosInstance.post(`Containers/meeting/upload`, imageData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          }
        })
        .then(response => {
            console.log('image uploaded................................................', response)
            this.setState({loading: false})
            let data = {
                paymentAttached: response.result.files.images[0].name, 
                paymentMethod: 'bank'
            }
            
            const meeting = this.props.navigation.getParam('meeting', {});
            console.log("> data", data, '----------------------------------------')
            AxiosInstance.patch('MeetingBookings/' + meeting.id, data)
              .then(response => {
                // this.props.fetchProfile()
                this.setState({meeting: response, loading: false})
                console.log('> uploading done')
              })
              .catch(error => {
                this.setState({loading: false})
              })
              // .catch(error =)
            // onSuccess(response)
        })
        .catch(error => {
          this.setState({loading: false})
            console.log(error, 'error uploading................')
        })
      }

      cancel = () => {
        this.setState({loading: true})
        AxiosInstance.patch(`MeetingBookings/${this.state.meeting.id}`, {
          status: "canceled"
        })
        .then(res => {
          this.setState({meeting: res, loading: false})
        })
        .catch(err => this.setState({loading: false}))
      }

    componentDidMount(){
        let meeting = this.props.navigation.getParam('meeting', {})
        this.setState({meeting: meeting})
        AxiosInstance.get(`MeetingBookings/${meeting.id}?filter[include]=addons&filter[include]=meetingRoom`)
            .then(response => {
              console.log('> meeting room',  response)
                this.setState({meeting: response, meetingRoom: response.meetingRoom})
            })
            .catch(error => {
                console.log('> error loading meeting room')
            })
    }

    render(){
        return(
            <Container>
                <Content scrollEnabled style={{backgroundColor: '#fff'}}> 
                    <View style={{backgroundColor: '#eee', height: 200}}>
                        <Image source={{uri: `${URL}Containers/meeting/download/${this.state.meeting.paymentAttached}`}} style={{width: '100%', height: 200}} />
                        <TouchableOpacity onPress={() => this.pickImageHandler()} style={{backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'relative', top: -20}}>
                            <Text style={{color: '#eee', alignSelf: "flex-end", paddingRight: 10}}>{this.state.meeting.paymentAttached ? 'Change bank voucher' : 'Upload bank voucher'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{padding: 10, flexDirection: 'row', width: "100%"}}>
                        {/* <Text style={{flex: 3, color: '#2691cf', fontFamily: 'Lato-Regular'}}>{this.state.meeting.title ? this.state.meeting.title : 'Untitled Meeting'}</Text> */}
                        <Text style={{color: '#f5831f'}}>{this.state.meeting.status}</Text>
                    </View>
                        {
                          this.state.meeting.status != "approved" || this.state.meeting.status != "canceled" ?
                        <TouchableOpacity style={{padding: 5, alignSelf: "flex-end"}} onPress={() => this.cancel()}>
                          <Text style={{color: 'red'}}>Cancel</Text>
                        </TouchableOpacity>
                        :null
                        }
                    <View style={{paddingLeft: 10, paddingRight: 10, flexDirection: 'row'}}>
                        <Text style={{fontFamily: 'Lato-Regular', fontSize: 12}}>Start </Text>
                        <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 12}}>{dayjs(this.state.meeting.startDate).format('MMM DD, YYYY')} @ {this.state.meeting.startTime}</Text>
                    </View>
                    <View style={{paddingLeft: 10, paddingRight: 10, flexDirection: 'row'}}>
                        <Text style={{fontFamily: 'Lato-Regular', fontSize: 12}}>Duration </Text>
                        <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 12}}>{this.state.meeting.duration} hour{this.state.meeting.duration > 1 ? 's' : ''}</Text>
                    </View>
                    <View style={{paddingLeft: 10, paddingRight: 10, flexDirection: 'row'}}>
                        <Text style={{fontFamily: 'Lato-Regular', fontSize: 12}}>Meeting Room </Text>
                        <Text style={{fontFamily: 'Lato-LightItalic', fontSize: 12}}>{this.state.meetingRoom.name}</Text>
                    </View>
                    
                    {
                      this.state.meeting && this.state.meeting.addons && this.state.meeting.addons.length ?
                      <View style={{padding: 10}}>
                        <Text style={{fontFamily: 'Lato-Regular', borderBottomWidth: 1, borderBottomColor: '#ddd'}}>Addons</Text>
                       {
                         this.state.meeting.addons.map(addon => (
                           <View style={{flexDirection: 'row'}}>
                            <Text style={{flex: 3}}>{addon.name}</Text>
                            <Text>{addon.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ETB / {addon.unit}</Text>
                          </View>
                         ))
                       }
                    </View>: null
                    }
                    <Guests item={this.props.navigation.getParam('meeting', {})} type="meeting"/>
                </Content>
                {
                    this.state.loading 
                    ? <Loading /> :null
                }
            </Container>
        )
    }
}

export default MeetingDetail