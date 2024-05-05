import React, {Component} from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import { ProfileCard, Member, NoContent, Loading } from '../common';
import { Container, Content, Form, Item, Label } from 'native-base';
import styles from '../styles';
import { Icon } from 'react-native-elements';
import ImagePicker from "react-native-image-picker";
import AxiosInstance, { URL } from '../interceptor';
import { fetchCompany } from '../account/actions';
import HeaderTitle from '../common/HeaderTitle';
import Popup from './popup';
import Input from './input';
import Button from './button';

const cover = require('../../assets/account.png');

export default class CompanyDetail extends Component {
    static navigationOptions = {
        headerTitle: <HeaderTitle title='Company Detail' />,
    };

    constructor(props) {
        super(props);
        this.state = {
            company: {},
            member: '',
            pickedImage: null,
            loading: false,
            loggedInUserId: '',
            action: 'add',
            currentMember: {

            },
            popupVisible: false
        };
    }

    componentDidMount(){
        console.log('================')
        console.log('================')
        this.setState({
            company: this.props.navigation.getParam('company', {}),
            member: this.props.navigation.getParam('member', '')
        }, () => this.fetchMembers())
        this.getLoggedInUser()
    }

    getLoggedInUser = () => {
        AsyncStorage.getItem('userId')
            .then(result => {
                console.log('> found userId', JSON.parse(result))
                this.setState({loggedInUserId: JSON.parse(result)})
            })
            .catch(error => {
                console.log('> error getting user')
            })
    }

    fetchCompany = () => {
        this.setState({loading: true})
        AxiosInstance.get(`Accounts/me/companies/${this.state.company.id}?filter[include]=members`)
            .then(response => {
                console.log('> company', response)
                this.setState({
                    company: response,
                    loading: false
                })
            })
            .then(error => {
                console.log('> error fetching company', error)
                this.setState({loading: false})
            })
    }

    fetchMembers = () => {
        this.setState({loading: true})
        AxiosInstance.get(`CompanyMembers?filter[where][companyId]=${this.state.company.id}&filter[include]=member`)
            .then(response => {
                console.log('> members fetched', response)
                // response = this.state.member && this.state.member.role == 'admin' ?
                //         response.filter(member => this.state.member.memberId != member.id)
                //     :
                //     response
                this.setState({loading: false, members: response.filter(member => member.member)})
            })
            .catch(error => {
                console.log('> error fetching members', error)
                this.setState({loading: false})
            })
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: "Upload company picture", maxWidth: 800, maxHeight: 600}, res => {
          if (res.didCancel) {
            console.log("User cancelled!");
          } else if (res.error) {
            console.log("Error", res.error);
          } else {
            this.setState({
              pickedImage: res
            }, () => this.uploadImage());
    
          }
        });
      }
    
      resetHandler = () =>{
        this.setState({pickedImage: null})
      }
    
      uploadImage = () => {
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
    
        AxiosInstance.post(`Containers/company/upload`, imageData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          }
        })
        .then(response => {
            console.log('image uploaded................................................', response)
            this.setState({loading: false})
            let data = {}
            data['currentProfileImage'] = response.result.files.images[0].name
            console.log("> data", data, '----------------------------------------')
            AxiosInstance.put(`Accounts/me/companies/${this.state.company.id}`, data)
              .then(response => {
                // this.props.fetchProfile()
                console.log('> uploading done')
              })
              // .catch(error =)
            // onSuccess(response)
        })
        .catch(error => {
            console.log(error, 'error uploading................')
        })
      }

    updateMember = (member) => {

    }

    deleteMember = (id) => {
        this.setState({loading: true})
        AxiosInstance.delete(`CompanyMembers/${id}`)
            .then(response => {
                this.fetchMembers()
            })
            .catch(erro => {
                conso.log('error')
                this.setState({loading: false})
            })
    }

    addMember = () => {
        this.setState({loading: true, popupVisible: false})
        let data = {
            userData: this.state.currentMember,
            companyId: this.state.company.id,
            role: 'member'
        }
        AxiosInstance.post(`CompanyMembers`, data)
            .then(response => {
                console.log('> member added', response)
                this.fetchMembers()
            })
            .catch(error => {
                console.log('> error adding member', error)
                this.setState({loading: false, popupVisible: true})
            })
    }

    sendMessage = (sender) => {
        console.log('> sender1 ', sender)
        AsyncStorage.getItem('authData')
            .then(result => {
                // console.log('> found user', JSON.parse(result))
                this.props.navigation.navigate('Messages', {
                    sender: sender,
                    user: JSON.parse(result).user
                })
            })
            .catch(error => {
                console.log('> error getting user')
            })
    }

  render() {
    const company = this.state.company
    const member = this.state.member
    console.log('> company', company)
    // const members = company.team;
    console.log(company)
    return (
        <Container>
            <Content padder style={[styles.content]}>
                <View>
                    <View>
                        <Image
                                style={{width: '100%', height: 151, marginBottom: 35, alignSelf:"center"}}
                                source={this.state.pickedImage ? 
                                    this.state.pickedImage : 
                                        company.currentProfileImage !== null && company.currentProfileImage !== undefined && company.currentProfileImage !== '' ? 
                                            {uri: `${URL}/Containers/company/download/${company.currentProfileImage}`}: 
                                        cover
                                }
                            />
                        {
                            company.adminId == this.state.loggedInUserId ?
                            <TouchableOpacity onPress={this.pickImageHandler} style={{flexDirection: "row", backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'relative', bottom: 50, right: 0}}>
                                <Icon name="edit" color="#999" color="#eee"/>
                                <Text style={{alignSelf: 'center', color: '#eee'}}>Change</Text>
                            </TouchableOpacity>
                            : null
                        }
                        <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 20, flex: 3}}>{company.name}</Text>
                        {
                            company.adminId == this.state.loggedInUserId ? 
                            <TouchableOpacity style={{flexDirection: "row"}}>
                                {/* <Icon name="edit" color="#999"/> */}
                                {/* <Text style={{alignSelf: 'center',}}>Edit</Text> */}
                            </TouchableOpacity>
                            :null
                        }
                        </View>
                    </View>

                    <View>
                        <ProfileCard 
                            keys={['Motto', 'Description', 'Category', 'Phone', 'Email', 'Website']}
                            Moto={company.motto}
                            Description={company.description}
                            Phone={company.phone}
                            Email={company.email}
                            Category={company.category}
                            Website={company.website}
                            type="company"
                            />
                    </View>
                    <View>
                        <FlatList
                            data={this.state.members ? this.state.members : []}
                            renderItem={({item})=> <Member sendMessage={this.sendMessage} delete={() => this.deleteMember(item.id)} canSendMessage={item.member.id !== this.state.loggedInUserId}  canUpdate={company.adminId == this.state.loggedInUserId && this.state.loggedInUserId != item.member.id} key={item.id} role={item.role} member={item.member} />}
                            ListHeaderComponent={
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{padding:20, flex: 3}}>Members</Text>
                                { company.adminId == this.state.loggedInUserId ?
                                <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress={() => this.setState({popupVisible: true})}>
                                    <Icon name="add" />
                                </TouchableOpacity>
                                :null
                                }
                            </View>
                            }
                            ListEmptyComponent={<NoContent text="No member" />}
                            />
                    </View>
                </View>
                <Popup visible={this.state.popupVisible}  back={() => this.setState({popupVisible: false})}>
                    <Form style={{width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 5}}>
                        <Text style={{textAlign: 'center'}}>Add Member</Text>
                        {/* <Label>Full Name</Label> */}
                        <Input label="First Name" value={this.state.currentMember.firstName} onChange={(text) => this.setState({currentMember: {...this.state.currentMember, firstName: text}}, () => console.log(this.state.currentMember))}/>
                        <Input label="Last Name" value={this.state.currentMember.lastName} onChange={(text) => this.setState({currentMember: {...this.state.currentMember, lastName: text}}, () => console.log(this.state.currentMember))}/>
                        <Input label="Email" keyboardType="email-address" value={this.state.currentMember.email} onChange={(text) => this.setState({currentMember: {...this.state.currentMember, email: text}}, () => console.log(this.state.currentMember))}/>

                        <Input label="Phone" value={this.state.currentMember.phone} keyboardType="number-pad" onChange={(text) => this.setState({currentMember: {...this.state.currentMember, phone: text}}, () => console.log(this.state.currentMember))}/>
                        <Text style={{color: 'red'}}>{this.state.error}</Text>
                        <Button style={{marginTop: 20, alignSelf: 'center', padding: 20}} label={'Add'} action={this.addMember} />
                        
                    </Form>
                </Popup>
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