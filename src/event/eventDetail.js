import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Body, Loading } from '../common';
import styles from '../styles'
import HeaderTitle from '../common/HeaderTitle';
import { Container, Content } from 'native-base';
import dayjs from 'dayjs'
import EventSpaceCard from './eventSpaceCard';
import Guests from './guests';
import AxiosInstance, { URL } from '../interceptor';
import { Alert } from 'react-native'
import { Icon } from 'react-native-elements';
import ImagePicker from "react-native-image-picker";

const defaultPicture = require('../../assets/1.jpg')

export default class Event extends Component {
    static navigationOptions = {
      // title: 'Event Detail'
      headerTitle: <HeaderTitle title='Event Detail' />,
    };

    constructor(props){
      super(props)

      this.state = {
        pickedImage: null
      }
    }
  
  cancel = (id) => {
    this.setState({loading: true})
    AxiosInstance.patch('EventBookings/' + id, {status: 'canceled'})
      .then(response => {
        this.setState({loading: false}, () => {
          this.props.navigation.goBack()
        })
      })
      .catch(error => {
        this.setState({loading: false})
        console.log('> erro cancelling')
      })
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

    AxiosInstance.post(`Containers/event/upload`, imageData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      }
    })
    .then(response => {
        console.log('image uploaded................................................', response)
        this.setState({loading: false})
        let data = {}
        data[type] = response.result.files.images[0].name
        const event = this.props.navigation.getParam('event', {});
        console.log("> data", data, '----------------------------------------')
        AxiosInstance.patch('EventBookings/' + event.id, data)
          .then(response => {
            // this.props.fetchProfile()
            this.setState({image: response.result.files.images[0].name, loading: false})
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
  
  render() {
    const { navigation } = this.props;
    const event = navigation.getParam('event', {});
    return (
      <Container style={{...styles.container, backgroundColor: '#fff', alignItems: 'flex-start'}}>
        <Content scrollEnabled style={{width: '100%'}}>
          <View style={{backgroundColor: '#ddd'}}>
            <Image source={this.state.pickedImage ? this.state.pickedImage : event.picture ? {uri: `${URL}Containers/event/download/${event.picture}`} : defaultPicture } style={{width: '100%', height: 200}}/>
            <TouchableOpacity onPress={() => this.pickImageHandler('picture')} style={{position: 'absolute', right: 0, top: 160, backgroundColor: 'rgba(0, 0, 0, 0.4)' , borderRadius: 5, padding: 5}}>
              <Icon name="edit" />
            </TouchableOpacity>
          </View>
           <View style={{margin: 20, flexDirection: 'row', width: '100%'}}>
              <View style={{flex: 3}}>
                <Text style={{flex: 3, color: '#2691cf', fontSize: 18, fontFamily: 'Lato-Regular'}}>{event.title ? event.title : 'Untitled Event'}</Text>
                <Text style={{fontFamily: 'Lato-LightItalic'}}>Starts {dayjs(event.startDate).format('MMM DD, YYYY')} @ {event.startTime}</Text>
                <Text>Type: {event.eventType.name}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{color: '#f5831f'}}>{event.status}</Text>
                <TouchableOpacity style={{}} onPress={() => this.cancel(event.id)}>
                  {
                    event.status === 'pending'?
                    <Text style={{color: 'red', fontFamily: 'Lato-Heavy'}}>Cancel</Text>
                    :null
                  }
                </TouchableOpacity>
              </View>
           </View>

           {
             event.eventDescription ?
             <View style={{padding: 20, paddingTop: 0}}>
               <Text style={{fontFamily: 'Lato-regular'}}>Event Description</Text>
                <Text>{event.eventDescription}</Text>
             </View> : null
           }
           {
             event.orderDescription ?
             <View style={{padding: 20, paddingTop: 0}}>
               <Text style={{fontFamily: 'Lato-regular'}}>Order Description</Text>
                <Text>{event.orderDescription}</Text>
             </View> : null
           }

           {
             event.eventSpace ?
             <View style={{padding: 20, paddingTop: 0}}>
             <Text style={{fontFamily: 'Lato-Regular'}}>Event Space</Text>
             {/* <Text>{event.eventSpace.name}</Text> */}
             <EventSpaceCard eventSpace={event.eventSpace} />
           </View>:null
           }

           <Guests item={event} type="event"/>
        </Content>
        {
          this.state.loading ? 
          <Loading />
          :null
        }
      </Container>
    );
  }
}
