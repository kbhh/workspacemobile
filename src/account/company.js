import React, {Component} from 'react';
import { FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { CommunityCard, NoContent, Loading, CustomIcon, Popup, Input } from '../common';
import { Container, Content, Card, CardItem, Thumbnail, Button, Left, Body, Right, Form, Item, Label, View, Row } from 'native-base';
import styles from '../styles';
import { fetchCompany } from './actions';
import { connect } from 'react-redux';
import HeaderTitle from '../common/HeaderTitle';
import { Icon, ThemeConsumer } from 'react-native-elements';
import AxiosInstance, { URL } from '../interceptor';

class CompanyCard extends Component {
  constructor(props){
    super(props)

    this.state = {
      popupVisible: false,
      members: [],
      name: '',
      email: '',
      phone: '',
      error: '',
      loading: false
    }
  }
  
  componentDidMount() {
    this.fetchMembers()
  }

  setValues = (name, value) => {
    let state = Object.assign({}, this.state)
    state[name] = value
    this.setState({...state})
  }

  fetchMembers = () => {
    this.setState({loading: true})
    AxiosInstance.get(`CompanyMembers?filter[include]=member&filter[where][companyId]=${this.props.company.id}`)
      .then(response => {
        console.log('> members', response)
        this.setState({members: response, loading: false})
      })
      .catch(err => {
        this.setState({loading: false})
      })
  }

  addMember = () => {
    let valid = this.state.name && this.state.email && this.state.phone
    console.log('> valid', valid)
    if(valid){
      this.setState({popupVisible: false, loading: true})
      AxiosInstance.post(`CompanyMembers`, {
        companyId: this.props.company.id,
        userData: {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone
        },
        status: 'pending'
      })
      .then(response => {
        console.log('> member added')
        this.setState({name: '', email: '', phone: '', error: '', loading: false})
        this.fetchMembers()
      })
      .catch(err => {
        this.setState({loading: false})
      })
    }
    else 
      this.setState({error: 'All fields are required'})
  }

  render(){
    let item = this.props.company
    return (
      <Card key={item.id}>
              <CardItem header>
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <View style={{flex: 3}}>
                  <Text style={{fontFamily: 'Lato-Heavy'}}>{item.name}</Text>
                  </View>
                  <TouchableOpacity style={{alignSelf: 'flex-end'}} style={{backgroundColor: '#fff'}}>
                    {/* <Icon name="edit" /> */}
                  </TouchableOpacity>
                </View>
              </CardItem>
              <CardItem>
              <Image 
                    source = { item.currentProfileImage !== null && item.currentProfileImage !== undefined && item.currentProfileImage !== ''
                              ?  { uri: `${URL}/Containers/company/download/${item.currentProfileImage}` } 
                              :  require('../../assets/1.jpg')}
                    style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {item.motto}
                </Text>
                <Text>
                  {item.description}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Button transparent>
                <Icon active type="material-community" name="account-multiple" />
                  <Text>{this.state.members.length} Members</Text>
                </Button>
              </Body>
            </CardItem>
            {/* <Popup visible */}
            
          </Card>
    )
  }
}

class Screen extends Component {
    static navigationOptions = ({ navigation }) => {
      return {
        // title: 'Company',
        headerTitle: <HeaderTitle title='Company' />,
        
        // headerRight: (
        //   <TouchableOpacity onPress={() => navigation.navigate('AddCompany')}>
        //     <CustomIcon name="add-circle" style={{marginRight:20, padding: 10, fontSize: 28, color: '#6D6D6D'}}/>
        //   </TouchableOpacity>
        // )
      }
    };

    constructor(props) {
        super(props);
        this.state = {
          company: '',
          popupVisible: false
        };
      }
    
      componentDidMount() {
        this.props.fetchCompany();
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

    _keyExtractor = (item, index) => item._id;

    _renderItem = ({item}) => {
        
        return(
            <TouchableOpacity key={item.id} onPress={() => this.props.navigation.navigate('CompanyDetail', {company: item.company, member: item})}>
              <CompanyCard navigation={this.props.navigation} member={item} company={item.company} key={item.company.id} />
            </TouchableOpacity>
        )
    }
  render() {
    // conso
    return (
        <Container>
            <Content padder style={[styles.content]}>
                <FlatList
                    data={this.props.companies}
                    extraData={this.props}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ListEmptyComponent={<NoContent text="No Company" />} 
                />
                {/* <Text>{this.props.companies.length}</Text> */}
            </Content>
            {this.renderLoading()}
        </Container>
     
    );
  }
}

function mapStateToProps(state) {
    return {
      ...state.companyReducer   
    }
  };
  
  const mapDispatchToProps = dispatch => ({
    fetchCompany() {
      dispatch(fetchCompany())
    }
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Screen);