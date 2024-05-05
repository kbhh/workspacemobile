import React, {Component} from 'react';
import { Text, View, TextInput} from 'react-native';
import { Container, Content, Item, Label, Textarea } from 'native-base';
import { Button, Input, Loading, Body } from '../common';
import styles from '../styles';
import { connect } from 'react-redux'
import { addSupport } from './actions';
import HeaderTitle from '../common/HeaderTitle';

class TicketForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            body: '',
            feedbackShown: false,
            feedback: '',
        }

        type = props.type

        this.showFeedback = this.showFeedback.bind(this)
        this.formInputChange = this.formInputChange.bind(this)
    }
  static navigationOptions = {
    // title: "Ticket"
    headerTitle: <HeaderTitle title='Ticket' />,
  };

  showFeedback() {
    this.setState({
      feedbackShown: true
    })
  }

  formInputChange(data, name) {
    let state = {...this.state}
    state[name] = data
    // console.log(data)
    this.setState({...state})
  }

  sendSupportRequest(){
    this.props.addSupport({
      title: this.state.title,
      body: this.state.body
    })
  }

  render() {
    if (this.props.loading)
      return <Loading />
      
    return (
      <Container>
        <Content padder style={[styles.content]}>
        <Body>
            <View style={{ padding:10, flexDirection:'column', width:"100%", }}>
              <View style={{flexDirection:'row',  margin: 5, justifyContent:"space-between"}}>
                  <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',}}>{this.props.type !== 'add' ? 'Add New ' : 'Edit '}Ticket</Text>
              </View>
              <View style={{flexDirection:'row', marginTop:20, marginBottom:40}}>
              </View>
              <View>
                  <Input label="Title" onChange={text => this.formInputChange(text, 'title')}/>
                  <Item stackedLabel>
                    <Label>Description</Label>
                    <Textarea rowSpan={5} bordered placeholder="" 
                      value={this.state.eventDescription}
                      onChangeText={text => this.formInputChange(text, 'body')}
                      style={{width: '100%', fontFamily: 'Lato-Light'}}
                      />
                </Item>
              </View>
              {
                this.state.feedbackShown ? 
                  <View>
                    <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',}}>Feedback</Text>
                    <TextArea onChange={text => this.formInputChange(text, 'feedback')}/>
                    <Button label="SEND" action={() => this.sendSupportRequest()}/>
                </View>
                :
                <Button label="SEND" action={() => this.sendSupportRequest()}/>
              }
            </View>
          </Body>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.supportReducer.loading
})

const mapDispatchToProps = (dipatch) => ({
  addSupport: data => dipatch(addSupport(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketForm)