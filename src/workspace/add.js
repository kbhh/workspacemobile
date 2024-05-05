import React, {Component} from 'react';
import {Text, View, Picker, Alert } from 'react-native';
import { 
  Button, Body, CustomDatePicker, Input, Loading, Popup, CustomIcon 
} from '../common';
import styles from '../styles';
import { fetchWorkspace, addWorkspace, fetchAvailable } from './actions';
import { connect } from 'react-redux';
import SwitchSelector from 'react-native-switch-selector';

import dayjs from 'dayjs';
import { Container, Content } from 'native-base';
import NavigationService from '../NavigationService';
import { StackActions } from 'react-navigation';
import PackagesList from './packagesList';
import DatePicker from 'react-native-datepicker'
import { fetchLocations } from '../location/actions';
import HeaderTitle from '../common/HeaderTitle';

class Screen extends Component {
  static navigationOptions = {
    // title: 'Subscribe WorkSpace'
    headerTitle: <HeaderTitle title='Book workSpace' />,
  };
  constructor(){
    super();
    this.state={
      category: 'hot desk',
      start: '',
      month: '1',
      days: '10',
      passType: 'normal',
      chosenDate: new Date(),
      formatedDate: dayjs(new Date()).format('YYYY-MM-DD'),
      serviceId: null,
      amount: 0,
      package_: {},
      duration: 0,
      location: '',
      service: '',
    }
    this._renderDedicated = this._renderDedicated.bind(this);
    this._renderEnclosed = this._renderEnclosed.bind(this);
    this._renderHotDesk = this._renderHotDesk.bind(this);
    this._add = this._add.bind(this);
  }

  componentDidMount() {
    this.props.fetchAvailable();
    this.props.fetLocations();
  }

  onMonthChange(value) {
    this.setState({month: value})
  }

  selectPackage = (package_, serviceId) => {
    this.setState({
      package_: package_,
      month: package_.time
    })
  }

  _renderHotDesk() {
    if(this.state.category === 'hot desk') {
      return (
        <View style={{ width: '100%', flexDirection:"column",}}>
            <Text style={styles.subWorkspaceTitle}>
              Number of days 
            </Text>
            <Picker
              selectedValue={this.state.days}
              itemStyle={{height: 122, color: 'black',}}
              onValueChange={(itemValue) => this.setState({days: itemValue})}>
                  <Picker.Item label="10 days pass" value="10" />
                  <Picker.Item label="20 days pass" value="20" />
            </Picker>
            <Picker
              selectedValue={this.state.days}
              itemStyle={{height: 122, color: 'black',}}
              onValueChange={(itemValue) => this.setState({passType: itemValue})}>
                  <Picker.Item label="Normal pass" value="normal" />
                  <Picker.Item label="Student pass" value="student" />
            </Picker>
        </View>
      )
    } else {
      return null;
    }
    
  }

  _renderDedicated() {
    if(this.state.category === 'dedicated') {
      return (
        <View style={{flexDirection:"column"}}>
          {/* <View>
            <Text style={styles.subWorkspaceTitle}>Number of month</Text>
            <Input 
              keyboardType='phone-pad'
              value={this.state.month}
              onChange={(value)=> {this.setState({month:value})}}/>
          </View> */}
          {
            this.props.dedicated.length > 0 ? (
              <View>
                <Text style={styles.subWorkspaceTitle}>
                How many desk do you need?
                </Text>
                <Picker
                    selectedValue={this.state.days}
                    itemStyle={{height: 122, color: 'black',}}
                    onValueChange={(itemValue) => this.setState({serviceId: itemValue._id, service: itemValue})} >
                      {this.props.dedicated.map((service)=>{
                        return (
                          <Picker.Item label={`${service.packages[0].target} Desk`} value={service} />
                        )
                      })}
                </Picker>
                <PackagesList 
                  packages={this.state.service ? this.state.service.packages : []} 
                  selectedPackage={this.state.package_}
                  selectPackage={this.selectPackage}
                  type='workspace'
                  />
              </View>
            ) : (
                  Alert.alert(
                    'Warning',
                    'Sorry, there is no available dedicated workspace',
                  )
                )
          }
        </View>
      )
    } else {
      return null;
    }
  }

  _renderEnclosed() {
    if(this.state.category === 'enclosed') {
      return (
        <View style={{flexDirection:"column"}}>
          {/* <View>
            <Text style={styles.subWorkspaceTitle}>Number of month</Text>
            <Input 
              keyboardType='phone-pad'
              value={this.state.month}
              onChange={(value)=> {this.setState({month:value})}}/>
          </View> */}
          {
            this.props.enclosed.length > 0 ? (
              <View>
                {/* <Text style={styles.subWorkspaceTitle}>
                  Select an enclosed office
                </Text>
                <Picker
                    selectedValue={this.state.days}
                    itemStyle={{height: 122, color: 'black',}}
                    onValueChange={(itemValue) => this.setState({serialId: itemValue})} >
                      {this.props.enclosed.map((service)=>{
                        return (
                          <Picker.Item label={service.tag} value={service._id} />
                        )
                      })}
                </Picker> */}
                <Text style={styles.subWorkspaceTitle}>
                How many desk do you need?
                </Text>
                <Picker
                    selectedValue={this.state.days}
                    itemStyle={{height: 122, color: 'black',}}
                    onValueChange={(itemValue) => this.setState({serviceId: itemValue._id, service: itemValue})} >
                      {this.props.enclosed.map((service)=>{
                        return (
                          <Picker.Item label={`${service.packages[0].target} Desk`} value={service} />
                        )
                      })}
                </Picker>
                <PackagesList 
                  packages={this.state.service ? this.state.service.packages : []} 
                  selectedPackage={this.state.package_}
                  selectPackage={this.selectPackage}
                  type='workspace'
                  />
              </View>
            ) : (
                  Alert.alert(
                    'Warning',
                    'Sorry, there is no available enclosed workspace',
                  )
                )
          }
        </View>
      )
    } else {
      return null;
    }
  }

  onSelectedDate(value) {
    this.setState({chosenDate: value})
    let formatedDate = dayjs(value).format('YYYY-MM-DD');
    console.log(formatedDate);
    this.setState({formatedDate})
  }

  onSelectAndroidDate(day, month, year) {
    //dayjs('2019-01-25').format('{YYYY} MM-DDZ[Z]'); 
    let formatedDate = dayjs(`${year}-${month+1}-${day}`).format('YYYY-MM-DD');
    this.setState({formatedDate})
  }

  goToSupport = () => {
  
  }
  
  _add() {
    let packages = {}
    let workspace = {
      "workspaceCategory": "",
      "userId": "5c19226d872e80004d25d243",
      "start": this.state.formatedDate,
      "pass": null,
      "passType": "normal pass",
      "duration": null,
      "serviceId": null,
      "prePaid": 0,
      
  }
    // let package = {}
    if(this.state.category === 'hot desk') {
      if(this.props.hot.length > 0 ) {
        workspace.serviceId = this.props.hot[0]._id;   
      }
      workspace.workspaceCategory = 'hot desk';
      workspace.pass = this.state.days;
      if(this.state.days === 'student'){
        workspace.passType = 'student pass'
      }
      packages = this.props.hot[0].packages
    } else if(this.state.category === 'dedicated') {
      if(this.state.serviceId === null || this.props.dedicated.find(service => service.id === this.state.serviceId) === undefined ) {
        if(this.props.dedicated.length === 0){
          Alert.alert(
            'Warning',
            'Sorry, there is no available dedicated workspace',
          )
          return;
        }
        workspace.serviceId = this.props.dedicated[0]._id;
        packages = this.props.dedicated[0].packages
      } else {
        workspace.serviceId = this.state.serviceId;
        packages = this.props.dedicated.filter(service => service._id == this.state.serviceId)[0].packages 
      }

      workspace.workspaceCategory = 'dedicated';
      workspace.duration = this.state.month;
    } else if(this.state.category === 'enclosed') {
      if(this.state.serviceId === null || this.props.enclosed.find(service => service.id === this.state.serviceId) === undefined ) {
        if(this.props.enclosed.length === 0){
          Alert.alert(
            'Warning',
            'Sorry, there is no available enclosed workspace',
          )
          return;
        }
          
        workspace.serviceId = this.props.enclosed[0]._id;
        packages = this.props.enclosed[0].packages 
      } else {
        workspace.serviceId = this.state.serviceId;
        packages = this.props.enclosed.filter(service => service._id == this.state.serviceId)[0].packages 
      }
      workspace.workspaceCategory = 'enclosed';
      workspace.duration = this.state.month;  
                                                                                                                                                                                       
    }
    console.log('workspace request>>>>>')
    console.log(workspace)
    // this.props.addWorkspace(workspace);
    workspace.month = workspace.month/30
    if(workspace.workspaceCategory !== 'hot desk' && !this.state.serviceId){
      Alert.alert(
        'Warning',
        'Sorry, You have to select a package to continue',
      )
      return;
    }

    workspace.serviceId = this.state.serviceId
    workspace.locationId = this.state.location
    NavigationService.navigate('PaymentDetail');
    StackActions.reset({
        index: 0, 
        actions: [NavigationService.navigate('PaymentDetail', {workspace: workspace, packages: packages, package_: this.state.package_})]
    });

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

  renderSuccess() {
    return (
      <Popup
          visible={this.props.added}
          back={()=>this.props.navigation.navigate('WorkSpaces')}>
          <View style={{
                  width: '80%', paddingTop: 16,
                  alignSelf: 'center', backgroundColor: '#F1F9FF',
                  justifyContent: 'center', alignItems: 'center',
                    borderRadius: 20 }}>
              <Text style={{
                  color:'#6D6F72', 
                  fontSize:18, textAlign: "center",
              }}> Workspace subscribed successful </Text>
              <CustomIcon name='checked-circle' style={{fontSize: 50, color: '#01BAE6', padding: 10}}/>
          </View>
      </Popup>
    )
  }

  render() {
    const options = [
      { label: 'Day Pas', value: 'hot desk' },
      { label: 'Private Office', value: 'enclosed'},
      { label: 'Dedicated', value: 'dedicated' },
    ];
    return (
      <Container>
        <Content style={[styles.content]}>
          <Body>
              <View style={{flexDirection:"column", width:"100%"}}>
                <Text style={styles.subWorkspaceTitle}>Workspace type</Text>
                  <SwitchSelector 
                    options={options} 
                    initial={0}
                    onPress={value => this.setState({ category: value, package_: {}, serviceId: ''})}
                    textColor='#01BAE6'
                    selectedColor='#ffffff'
                    buttonColor='#01BAE6'
                    borderColor='#01BAE6'
                    hasPadding />

                {this._renderHotDesk()}

                {this._renderDedicated()}

                {this._renderEnclosed()}
                {/* Location Picker */}
                <Text style={styles.subWorkspaceTitle}>Location</Text>
                <Picker
                    selectedValue={this.state.location}
                    itemStyle={{height: 122, color: 'black',}}
                    onValueChange={(itemValue) => this.setState({location: itemValue._id})} >
                      {this.props.locations.map((location)=>{
                        return (
                          <Picker.Item label={location.name} value={location._id} />
                        )
                      })}
                </Picker>
                {/* Location Picker - END */}
                <Text style={styles.subWorkspaceTitle}>Start date</Text>

                <View  style={{ width: '100%',}}>
                  
                  {/* <CustomDatePicker 
                    onAndroidDate={(day, month, year)=>this.onSelectAndroidDate(day, month, year)}
                    onAndroidTime={(h, m)=>console.log(h, m)} 
                    onSelectedDate={(value)=>this.onSelectedDate(value)}
                    chosenDate={this.state.chosenDate} /> */}
                    <DatePicker
                      style={{width: 200}}
                      date={this.state.start}
                      mode="date"
                      placeholder="Select start date"
                      format="YYYY-MM-DD"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0,
                        },
                        dateInput: {
                          marginLeft: 0,
                          padding: 0,
                          borderColor: '#fff'
                        }
                      }}
                      onDateChange={(date) => {this.setState({start: date})}}
                    />
                </View>
                
                
                {/* <Text  style={styles.subWorkspaceTitle}>Total</Text> */}

                <Button style={{marginTop:60}} label="Next" action={() => this._add()} />
                </View> 
            </Body>
        </Content>
        {this.renderLoading()}
        {this.renderSuccess()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.workspaceReducer,
    ...state.locationReducer,
  }
}

const mapDispatchToProps = dispatch => ({
  addWorkspace(workspace) {
    dispatch(addWorkspace(workspace))
  },
  fetchAvailable() {
    dispatch(fetchAvailable())
  },
  fetLocations(){
    dispatch(fetchLocations())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Screen);