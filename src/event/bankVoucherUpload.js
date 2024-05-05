import React, { Component } from 'react'
import ImagePicker from "react-native-image-picker";
import { View } from 'react-native'

import WorkspacePayment from '../workspace/add/payment';
import { Loading } from '../common'
import axios from '../interceptor'
import SubscriptionSuccess from '../workspace/add/success';
import HeaderTitle from '../common/HeaderTitle';
import { StackActions, HeaderBackButton } from 'react-navigation'

class BankVoucherUpload extends Component {
    static navigationOptions = ({ navigation }) => {
        let goBack = navigation.goBack;
        
        return {
            headerLeft: <HeaderBackButton onPress={() => {
                let getParam = navigation.getParam('getSuccess', () => false)
                const popAction = StackActions.pop({
                    n: 5,
                });
                  
                navigation.dispatch(popAction);
                navigation.navigate('Event')
            }} tintColor={'#999'} />,
            headerTitle: (<HeaderTitle title='Select Payment ' />),

        };
    }

    constructor(props){
        super(props)

        this.state = {
            pickedImage: null,
            loading: false
        }
    }

    reset = () => {
        this.setState({
          pickedImage: null
        });
      }
    
    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
          if (res.didCancel) {
            console.log("User cancelled!");
          } else if (res.error) {
            console.log("Error", res.error);
          } else {
            this.setState({
              pickedImage: res
            });
          }
        });
      }
    
    resetHandler = () =>{
        this.reset();
    }

    getSuccess = () => {
        return this.state.success
    }
    
    uploadImage = () => {
          this.setState({loading: true})
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

        axios.post(`Containers/meeting/upload`, imageData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => {
            console.log('image uploaded................................................', response)
            let meeting = this.props.navigation.getParam('meeting', {})
            let addonsId = this.props.navigation.getParam('addonsId', [])
            axios.post(`MeetingBookings/${meeting.id}/addAddons`, {addons: addonsId})
                .then(response => {
                    console.log('> addons added', response)
                })
                .catch(error => {
                    console.log('> addons ading error', error)
                })
            axios.patch(`MeetingBookings/${meeting.id}`, {
                paymentMethod: 'bank',
                paymentAttached: response.result.files.images[0].name
            })
            .then(update => {
                this.setState({success: true, loading: false})
            })
        })
        .catch(error => {
            console.log(error, 'error uploading................')
            this.setState({loading: false})
        })
    }

    render(){
        return (
            <View style={{width: '100%', height: '100%'}}>
                {
                    this.state.success ? 
                        <SubscriptionSuccess navigation={this.props.navigation} longText={`lorem ipsum dolor sit amet un dous als k ks lorem ipsum dolor sit amet un dous als k ks `} title={`Meeting Booked Successfuly`} onListPress='Event'/>
                    :
                    <WorkspacePayment 
                        pickedImage={this.state.pickedImage}
                        pickImageHandler={this.pickImageHandler}
                        resetHandler={this.resetHandler}
                        uploadImage={this.uploadImage}
                        />
                }
                {
                    this.state.loading ?
                    <Loading />
                    : null
                }
            </View>
        )
    }
}

export default BankVoucherUpload