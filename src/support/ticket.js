import React, {Component} from 'react';
import { Text, View, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { Button, Body, Loading, TextArea } from '../common'
import { Container, Content, Textarea } from 'native-base';
import styles from '../styles';
import { addSupportFeedback } from './actions';
import HeaderTitle from '../common/HeaderTitle';
import dayjs from 'dayjs'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      feedback: '',
      feedbackShown: false,
      ticket: {}
    }

    this.toggleFeedback = this.toggleFeedback.bind(this)
    this.resetFeedback = this.resetFeedback.bind(this)
    this.onFeedbackChange = this.onFeedbackChange.bind(this)
    this.sendFeedback = this.sendFeedback.bind(this)
  }

  componentDidMount() {
    this.setState({ticket: this.props.navigation.getParam('ticket', {})})
  }

  static navigationOptions = {
    // title: 'Ticket Detail'
    headerTitle: <HeaderTitle title='Ticket Detail' />,
  };

  resetFeedback(){
    this.setState({
      feedback: ''
    })
  }

  toggleFeedback() {
    this.setState({
      feedbackShown: !this.state.feedbackShown
    })
  }

  sendFeedback(){
    let data = {body: this.state.feedback}
    this.props.addFeedback(data, this.state.ticket, feedback => {
      console.log('> feedback', feedback)
      this.setState({ticket: {...this.state.ticket, messages: [...this.state.ticket.messages, feedback]}})
    })
  }

  onFeedbackChange(feedback) {
    this.setState({
      feedback: feedback
    })
  }

  render() {
    const { navigation } = this.props;
    const ticket = this.state.ticket
    if(this.props.loading)
      return <Loading />

    return (
      <Container>
        <Content padder style={[styles.content]}>
          <Body>
            <View style={{ padding:10, flexDirection:'column', width:"100%", }}>
              <View style={{flexDirection:'row',  margin: 5, justifyContent:"space-between"}}>
                <Text style={{fontSize: 18,fontFamily: 'Lato-Heavy', color: '#6D6D6D',}}>{ticket.title}</Text>
                <Text style={{fontSize: 18, color: '#FF7C00',}}>{ticket.resolved ? 'Resolved' : 'Pending'}</Text>
              </View>
              <View style={{flexDirection:'row', marginTop:20, marginBottom:40}}>
                <Text style={{fontSize: 14, color:'#6D6D6D' }}>{ticket.body}</Text>
              </View>
              {/* <FlatList
                data={ticket.messages}
                renderItem={(item)=> <Text style={{fontSize: 14, color:'#6D6D6D', marginBottom:40}}>{item.body}</Text>}
                keyExtractor={(item)=> item._id}
                /> */}
                {
                  ticket.messages && ticket.messages.length ?
                    <Text style={{fontSize: 18, fontFamily: 'Lato-Heavy'}}>Feedbacks</Text>
                    : null
                }
                {
                  ticket.messages ? ticket.messages.map(message => (
                    <View>
                      <View style={{flexDirection: 'row'}}>
                      <Text style={{flex: 3, fontSize: 10, color: '#222222', fontWeight: 'light', fontFamily: 'Lato-Regular'}}>{`${message.fromId == ticket.userId ? 'customer' : admin} replied`}</Text>
                      <Text style={{fontSize: 10, color: '#999', fontFamily: 'Lato-LightItalic'}}>{dayjs(message.createdAt).format('MMM DD, YYYY HH:mm')}</Text>
                      </View>
                      <Text style={{marginBottom:10, fontFamily: 'Lato-LightItalic', fontSize: 12}}>{message.body}</Text>
                    </View>
                  ))
                  :null
                }
                {
                  this.state.feedbackShown ? 
                    <View>
                      <Textarea rowSpan={5} bordered placeholder='Enter your feedback' onChangeText={text => this.onFeedbackChange(text)}/>
                      <Button label="SEND" action={() => this.sendFeedback()}/>                                        
                    </View>
                  :
              <Button label="GIVE FEEDBACK" action={() => this.toggleFeedback()}/>                  
                }
            </View>
          </Body>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.supportReducer.loading,
  ticket: state.supportReducer.currentTicket
})

const mapDispatchToProps = (dispatch) => ({
  addFeedback: (data, ticket, cb) => dispatch(addSupportFeedback(data, ticket, cb))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)