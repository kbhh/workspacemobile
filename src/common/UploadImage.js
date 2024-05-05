import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import Popup from './popup';
import { View } from 'native-base';
import Loading from './loading';
import AxiosInstance from '../interceptor';

class UploadImage extends Component {

    constructor(props){
        super(props)

        this.state = {
            loading: false
        }
    }

    uploadImage = (image) => {
        this.setState({
            loading: true
        })
        const imageData = new FormData();
        imageData.append('name', 'images');
        imageData.append('images', {
            // uri: `data:${image.mime};base64,`,
            uri: image.path,
            type: image.mime,
            name: image.path.split('/').pop(),
            data: image.data,
        });

        // console.log('form > data> ', imageData, source)

        AxiosInstance.post(`Containers/${this.props.container}/upload`, imageData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => {
            this.setState({loading: false})
            this.props.back()
            this.props.onSuccess(response.result.files.images[0].name)
        })
        .catch(error => {
            this.setState({
                loading: false
            })
            this.props.back()
            this.props.onError(error)
        })
    }

    selectFromGallery = () => {
        ImagePicker.openPicker({
            // width: 300,
            // height: 400,
            // cropping: true,
            includeBase64: true,
            includeExif: true,
          }).then(image => {
            this.uploadImage(image)
          });
    }

    selectFromCamera = () => {
        ImagePicker.openCamera({
            // width: 300,
            // height: 400,
            // cropping: true,
            includeBase64: true,
            includeExif: true,
        }).then(image => {
            // console.log('image >>>>>>>>\n', image)
            this.uploadImage(image)
        })
    }

    render(){
        const {visible, back, title} = this.props
        const {loading} = this.state

        return <Popup visible={visible} back={back}>
                    {
                        loading ?
                        <Loading />
                        :
                        <View style={{flexDirection: 'column', backgroundColor: '#fff', padding: 10, borderRadius: 5}}>
                            <Text style={{padding: 10, fontSize: 18, fontWeight: "bold"}}>{title ? props.title : 'Upload Image'}</Text>
                            <TouchableOpacity style={{margin: 5, padding: 10}} onPress={this.selectFromCamera}>
                                <Text style={{fontSize: 18}}>Take picture</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{margin: 5, padding: 10}} onPress={this.selectFromGallery}>
                                <Text style={{fontSize: 18}}>Choose from gallery</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </Popup>
    }
}

export default UploadImage