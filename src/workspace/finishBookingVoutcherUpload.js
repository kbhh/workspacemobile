import React, { Component } from 'react'
import ImagePicker from "react-native-image-picker";
import { View } from 'react-native'

import WorkspacePayment from './add/payment';
import { Loading } from '../common'
import axios from '../interceptor'
import SubscriptionSuccess from './add/success';
import UploadImage from '../common/UploadImage';

class BankVoucherUpload extends Component {
    constructor(props){
        super(props)

        this.state = {
            pickedImage: null,
            loading: false,
            showImagePicker: false
        }
    }

    reset = () => {
        this.setState({
          pickedImage: null
        });
      }
    
    pickImageHandler = () => {
        // ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
        //   if (res.didCancel) {
        //     console.log("User cancelled!");
        //   } else if (res.error) {
        //     console.log("Error", res.error);
        //   } else {
        //     this.setState({
        //       pickedImage: res
        //     });
        //   }
        // });
        this.setState({
            showImagePicker: true
        })
      }
    
    resetHandler = () =>{
        this.reset();
    }
    
    uploadImage = (file) => {
          this.setState({loading: true})
        
            let workspace = this.props.navigation.getParam('workspace', {})
            axios.patch(`WorkspaceSubscriptions/${workspace.id}`, {
                paymentType: 'bank',
                status: 'Approval requested',
                paymentAttached: file
            })
            .then(update => {
                this.setState({success: true, loading: false})
                // this.props.navigation.goBack()
                // this.props.navigation.goBack()
            })
            .catch(error => {
                this.setState({loading: false})
            })
    }

    render(){
        return (
            <View style={{width: '100%', height: '100%'}}>
                {
                    this.state.success ? 
                        <SubscriptionSuccess navigation={this.props.navigation} numberOfBack={3} onListPress='WorkSpaceList'/>
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
                <UploadImage
                    container="workspaceSubscription"
                    visible={this.state.showImagePicker}
                    back={() => this.setState({showImagePicker: false})}
                    onSuccess={this.uploadImage}
                    onError={() => console.log('Error uploading voucher')}
                />
            </View>
        )
    }
}

export default BankVoucherUpload