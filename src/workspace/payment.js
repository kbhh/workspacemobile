import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';
import { uploadImage, addWorkspace } from './actions';
import { Loading } from '../common';


class PaymentWorkSpace extends Component {
    static navigationOptions = {
        title: 'WorkSpace Payment'
      };

  constructor(props){
    super(props)

    this.state = {
      pickedImage: null,
      workspace: props.navigation.getParam('workspace', {})
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

  uploadImage = () => {
    console.log(this.state.pickedImage, 'image =============')
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

    this.props.uploadImage(imageData, image => {
      this.props.addWorkspace({...this.state.workspace, paymentAttached: image.imageId})
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Upload bank receipt</Text>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>

          <Button title={this.state.pickedImage ? "Change Image" : "Pick Image"} onPress={this.pickImageHandler} />

          <Button title="Reset" onPress={this.resetHandler} />

        </View>
        <View style={{...styles.button, width: "100%"}}>
        <Button title="           Upload        " disabled={!this.state.pickedImage} style={{width: '100%'}} onPress={this.uploadImage}/>
        </View>
        {
          this.props.loading ?
          <Loading />
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems:"center"
  },
  textStyle: {
    fontWeight:"bold",
    fontSize:30,
    textAlign:"center",
    color:"red",
    marginTop:10
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "70%",
    height: 280,
    marginTop:50,
  },
  button: {
    width: "80%",
    marginTop:20,
    flexDirection:"row",
    justifyContent: "space-around"
  },
  previewImage: {
      width: "100%",
      height: "100%"
  }
});

const mapStateToProps = (state) => ({
  ...state.workspaceReducer
});

const mapDispatchToProps = (dispatch) => ({
  uploadImage: (data, onSuccess) => dispatch(uploadImage(data, onSuccess)),
  addWorkspace: workspace => dispatch(addWorkspace(workspace))
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentWorkSpace)