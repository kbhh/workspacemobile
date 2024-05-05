import React, {Component} from 'react';
import { 
    View, FlatList, TextInput, TouchableOpacity, Text 
} from 'react-native';
import { CustomIcon, Loading, Popup} from '../common';
import MessageCard from './message-card';
import Comment from './comment-card'
import { Container, Content, Footer, FooterTab } from 'native-base';
import styles from '../styles';
import { fetchComments, postComment } from './actions';
import { connect } from 'react-redux';
import HeaderTitle from '../common/HeaderTitle';
import AxiosInstance from '../interceptor';

class Screen extends Component {
    static navigationOptions = {
        // title: 'BlueFace'
        headerTitle: <HeaderTitle title='blueFace' />
    };

    constructor(props) {
        super(props);
        this.state = {
            comment:'',
            comments: []
        }
        this._comment= this._comment.bind(this);
    }

    componentDidMount() {
        const post = this.props.navigation.getParam('post', {});
        this.props.fetchComments(post.id);
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
              back={()=>this.props.navigation.navigate('BlueFaceComment')}>
              <View style={{
                      width: '80%', paddingTop: 16,
                      alignSelf: 'center', backgroundColor: '#F1F9FF',
                      justifyContent: 'center', alignItems: 'center',
                        borderRadius: 20 }}>
                  <Text style={{
                      color:'#6D6F72', 
                      fontSize:18, textAlign: "center",
                  }}> Comment added </Text>
                  <CustomIcon name='checked-circle' style={{fontSize: 50, color: '#01BAE6', padding: 10}}/>
              </View>
          </Popup>
        )
      }

    _comment() {
        const post = this.props.navigation.getParam('post', {});
        this.props.postComment({messageBody:this.state.comment, postId:post.id});
        this.setState({comment:''});
    }

    render() {
        const { navigation } = this.props;
        const post = navigation.getParam('post', {});
        return (
            <Container>
                <Content style={[styles.content]}>
                    <MessageCard detail={true} item={post} image={post.user.currentProfileImage} detail={true} comment={()=>{}}/>
                    <FlatList
                        data={this.props.comments}
                        renderItem={({item}) => <Comment item={item} detail={true}/>} />
                </Content>
                <Footer style={[styles.footerContainer]}>
                    <FooterTab>
                        <View style={{flexDirection: 'row', flex:1, width:'90%', justifyContent:'space-between', backgroundColor:'#fff'}}>
                            <TextInput
                                style={{ flex: 1, padding: 10 }}
                                onChangeText={(text) => this.setState({comment:text})}
                                placeholder="Comment here"
                                placeholderTextColor="#6D6D6D" 
                                value={this.state.comment}
                                />
                            <TouchableOpacity style={{alignSelf:'center', padding: 10}}onPress={() => this._comment()}>
                                <CustomIcon name="send" style={{fontSize: 20, color: '#6D6D6D', alignSelf:'center'}}/>
                            </TouchableOpacity>
                        </View>
                    </FooterTab>
                </Footer>
                {this.renderLoading()}
                {/* {this.renderSuccess()} */}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
      ...state.bluefaceReducer
    }
  };
  
  const mapDispatchToProps = dispatch => ({
    fetchComments(postId) {
      dispatch(fetchComments(postId))
    }, 
    postComment(comment) {
        dispatch(postComment(comment))
    }
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(Screen);