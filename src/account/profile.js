import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity} from 'react-native';
import { Container, Content } from 'native-base';
import { ProfileCard, Loading } from '../common';
import styles from '../styles';
import { fetchProfile } from './actions';
import { connect } from 'react-redux';
import HeaderTitle from '../common/HeaderTitle';
import ImagePicker from "react-native-image-picker";
import AxiosInstance, { URL } from '../interceptor';
import { Icon } from 'react-native-elements';
import UploadImage from '../common/UploadImage';

const cover = require('../../assets/account.png');

const keys = ['firstName', 'lastName', 'Email', 'Phone', 'Profession', 'Bio'];
class Profile extends Component {
  static navigationOptions = {
    // title: 'Profile'
    headerTitle: <HeaderTitle title='Profile' />
    
  };

  constructor(props) {
    super(props);
    this.state = {
      pickedImage: null,
      loading: false,
      showImagePicker: false,
      type: ''
    }
  }

  pickImageHandler = (type) => {
    // ImagePicker.showImagePicker({title: "Upload profile picture", maxWidth: 800, maxHeight: 600}, res => {
    //   if (res.didCancel) {
    //     console.log("User cancelled!");
    //   } else if (res.error) {
    //     console.log("Error", res.error);
    //   } else {
    //     this.setState({
    //       pickedImage: res
    //     }, () => this.uploadImage(type));

    //   }
    // });

    this.setState({
      type: type,
      showImagePicker: true
    })
  }

  resetHandler = () =>{
    this.setState({pickedImage: null})
  }

  uploadImage = (file) => {
     
    let data = {}
    data[this.state.type] = file
    console.log("> data", data, '----------------------------------------')
    AxiosInstance.patch('Accounts/me', data)
      .then(response => {
        this.props.fetchProfile()
        console.log('> uploading done')
      })
      .catch(error => {
          console.log(error, 'error uploading................')
      })
  }

  // uploadId

  

  
  componentDidMount() {
    this.props.fetchProfile();
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
  
  render() {
    return (
        <Container>
          <Content style={[styles.content]}>
            <View>
              <View>
                  <Image
                    style={{width: 156, height: 151, marginBottom: 35, alignSelf:"center", borderRadius: 78}}
                    source={this.props.currentProfileImage ? {uri: `${URL}Containers/account/download/${this.props.currentProfileImage}`} : cover}
                  />
                  <TouchableOpacity style={{backgroundColor: 'rgba(0, 0, 0, 0.3)', position: "absolute", top: 130, alignSelf: 'center', flexDirection: 'row'}} onPress={() => this.pickImageHandler('currentProfileImage')}>
                    <Text style={{color: '#eee'}}>Change</Text>
                  </TouchableOpacity>
                  {
                    this.state.loading ? 
                    <Loading />
                    :null
                  }
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 20, flex: 3, marginLeft: 20}}>{this.props.firstName} {this.props.lastName}</Text>
                <TouchableOpacity style={{flexDirection: 'row', paddingRight: 20}} onPress={() => this.props.navigation.navigate('EditProfile', {profile: {...this.props}})}>
                  <View style={{alignSelf: 'center', marginLeft: 10}}>
                  <Icon name="edit" size={14} />
                  </View>
                  <Text style={{alignSelf: 'center', marginLeft: 5}}>Edit</Text>
                </TouchableOpacity>
              </View>
          </View>

          <ProfileCard 
            keys={keys}
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            Email={this.props.email}
            Phone={this.props.phone}
            Profession={this.props.profession}
            Bio={this.props.bio}
            Mode={this.props.isPublic ? 'Public' : 'Private'}
            navigation={this.props.navigation}
            uploadImage={this.pickImageHandler}
            {...this.props}
            />
          
        </Content>  
        {this.renderLoading()}
        <UploadImage 
          visible={this.state.showImagePicker} 
          back={() => this.setState({showImagePicker: false})} 
          onSuccess={this.uploadImage} 
          onError={() => console.log('error onError')} 
          container="account"
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.accountReducer)
  return {
    ...state.accountReducer
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProfile() {
    dispatch(fetchProfile())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);