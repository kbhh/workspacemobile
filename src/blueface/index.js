import React, {Component, Fragment} from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import MessageCard from './message-card';
import { Loading, NoContent, CustomIcon, Input, Popup, Button, TextArea } from '../common'
import styles from '../styles';
import { fetchPosts } from './actions';
import { connect } from 'react-redux';
import { Container, Content, Form, Toast, Label } from 'native-base';
import HeaderTitle from '../common/HeaderTitle';
import AxiosInstance from '../interceptor';

class Screen extends Component {
    static navigationOptions =({navigation}) => {
        // title: 'BlueFace',
        let showModal = navigation.getParam('showModal', () => console.log('> show modal'))
        return {
            headerTitle: <HeaderTitle title='Community Board' />,
            headerRight: (
            <TouchableOpacity onPress={showModal}>
              <CustomIcon name="add" style={{marginRight:20, padding: 10, fontSize: 18, color: '#6D6D6D'}}/>
            </TouchableOpacity>
          )}
    };

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            post: "",
        }
        this._renderContent = this._renderContent.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({
            showModal: () => this.setState({modalVisible: true})
        })
        this.props.fetchPosts();
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
            <MessageCard
                item={item}
                commentBadge={item.comments ? item.comments.length : 0}
                image={item.user.currentProfileImage}
                comment={(post)=>this.props.navigation.navigate('BlueFaceComment', {post:post})}
                detail={false}/>
        )
    };

    _renderContent() {
        if(this.props.posts !== undefined && this.props.posts !== null && this.props.posts.length > 0) {
            return (<FlatList
                data={this.props.posts}
                extraData={this.props}
                refreshing={this.props.loading}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />) 
        } else {
            return <NoContent text="No post available " />
        }
    }

    addPost = () => {
        this.setState({loading: false, modalVisible: false})
        let data = {
            title: this.state.post
        }
        AxiosInstance.post('CommunityBoards', data)
            .then(response => {
                Toast.show({
                    text: 'Post created successfully',
                    buttonText: '',
                    position: 'top',
                    textStyle: {
                        fontFamily: 'Lato-Light'
                    }
                })
                this.props.fetchPosts()
            })
            .catch(error => {
                Toast.show({
                    text: 'Eror adding post',
                    buttonText: '',
                    position: 'top',
                    textStyle: {
                        fontFamily: 'Lato-Light'
                    }
                })
            })
    }

    render() {
        return (
            <Container>
                <Content style={[styles.content]}>
                    {this._renderContent()}
                </Content>
                <Popup visible={this.state.modalVisible} back={() => this.setState({modalVisible: false})}>
                    {/* <Form style={{width: '90%', backgroundColor: '#fff', borderRadius: 5, padding: 5}}> */}
                    <View style={{width: "90%", backgroundColor: "#fff", borderRadius: 5, padding: 15}}>
                        {/* <Input 
                            error="" 
                            value={this.state.title} 
                            label="Subject"
                            keyboardType="text"
                            onBlur={() => console.log()}
                            onChange={text => this.setState({title: text})}/>
                         */}

                        <Label style={{margin: 5}}>Post</Label>
                        <TextArea rowSpan={5} bordered placeholder="type your post here"
                        value={this.state.post}
                            onChange={text => this.setState({post: text})}
                            style={{width: "100%", fontFamily: "Lato-Light"}}
                            />
                        <Button label="Post" action={this.addPost}/>
                    </View>
                    {/* </Form> */}
                </Popup>
                {/* {this.renderLoading()} */}
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
    fetchPosts() {
      dispatch(fetchPosts())
    }
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Screen);