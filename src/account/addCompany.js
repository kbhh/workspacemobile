import React, {Component} from 'react';
import {Text, View } from 'react-native';
import { Button, Body, Input, Loading, Popup, CustomIcon, TextArea } from '../common';
import styles from '../styles';
import { connect } from 'react-redux';
import HeaderTitle from '../common/HeaderTitle';

import { Container, Content } from 'native-base';
import { addCompany } from './actions';

class Screen extends Component {
  static navigationOptions = {
    // title: 'Subscribe WorkSpace',
    headerTitle: <HeaderTitle title='Book Workspace' />
    
  };

  constructor(){
    super();
    this.state={
        form: {
            "name": "",
            "website": "",
            "phone": "",
            "description": "",
            "isPublic": false,
            "currentProfileImage": null,
            "category": "",
            "moto": "",
            "team": [],
            "approved": false
          }
    }
    this._add = this._add.bind(this);
  }
  
  _add() {
    this.props.addCompany(this.state.form);
  }

  onFormDataChange (name, value) {
    let form = Object.assign({}, this.state.form)
    form[name] = value
    this.setState({
      form: form
    })
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
          back={()=>this.props.navigation.navigate('Company')}>
          <View style={{
                  width: '80%', paddingTop: 16,
                  alignSelf: 'center', backgroundColor: '#F1F9FF',
                  justifyContent: 'center', alignItems: 'center',
                    borderRadius: 20 }}>
              <Text style={{
                  color:'#6D6F72', 
                  fontSize:18, textAlign: "center",
              }}>Company successful created</Text>
              <CustomIcon name='checked-circle' style={{fontSize: 50, color: '#01BAE6', padding: 10}}/>
          </View>
      </Popup>
    )
  }

  render() {
    return (
      <Container>
        <Content style={[styles.content]}>
          <Body>
                <View style={{flexDirection:"column", width:"100%"}}>

                    <Input label="Name"  onChange={text => this.onFormDataChange('name', text)} value={this.state.form.name}/>
                    <Input label="Moto" onChange={text => this.onFormDataChange('moto', text)} value={this.state.form.moto} />
                    <Input label="Website" onChange={text => this.onFormDataChange('website', text)} value={this.state.form.website} />
                    <Input label="Phone" onChange={text => this.onFormDataChange('phone', text)} value={this.state.form.phone} keyboardType='phone-pad'/>
                    <Input label="Category" onChange={text => this.onFormDataChange('category', text)} value={this.state.form.category} />
                    <TextArea label="Description" onChange={text => this.onFormDataChange('description', text)} value={this.state.form.description}/>
        
                    <Button style={{marginTop:60}} label="Create Company" action={() => this._add()} />
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
    ...state.companyReducer
  }
}

const mapDispatchToProps = dispatch => ({
    addCompany(data) {
        dispatch(addCompany(data))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Screen);