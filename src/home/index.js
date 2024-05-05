import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Title, Button, Toast } from 'native-base';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native'
import { CustomIcon, Popup } from '../common';
import QRCode from 'react-native-qrcode';
import AxiosInstance from '../interceptor';
import { withBadge, Icon } from 'react-native-elements';

const cover = require('../../assets/blueSpace-real.jpg');
const icon = require('../../assets/launch_screen.png')

const MenuCard = (props) => {
    let overrideStyle = {}
    if (props.icon === 'workspace' || props.icon === 'location')
        overrideStyle = {
            view: {
                backgroundColor: '#2691cf',
            },
            text: {
                color: '#fff',
                fontFamily: 'Lato-Heavy'
            }
        }
    return (
        <TouchableOpacity
            onPress={() => props.onPress()}>
            <View style={{ ...styles.menuCard, ...overrideStyle.view }}>
                <View style={{ padding: 5 }}>
                    <CustomIcon name={props.icon} style={{ fontSize: 20, color: '#008FD2', ...overrideStyle.text }} />
                </View>
                <View style={{ alignSelf: 'center' }}>
                    <Text style={{ ...overrideStyle.text }}>{props.caption}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class Home extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    componentDidMount() {
        this.props.navigation.setParams({
            setModalVisible: this.setModalVisible.bind(this)
        });
        this.getLoggedInUser()
    }

    getLoggedInUser = () => {
        AsyncStorage.getItem('userId')
            .then(result => {
                console.log('> found userId', JSON.parse(result))
                this.setState({ loggedInUserId: JSON.parse(result) })
            })
            .catch(error => {
                console.log('> error getting user')
            })
    }

    state = {
        modalVisible: false,
        loggedInUserId: '',
        unreadMessages: 0
    };

    setModalVisible = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    renderQRcode() {
        return (
            <Popup
                visible={this.state.modalVisible}
                back={() => this.setModalVisible()}>
                <View style={{
                    width: deviceWidth * 0.8, height: deviceWidth * 0.8,
                    alignSelf: 'center', backgroundColor: '#F1F9FF',
                    justifyContent: 'center', alignItems: 'center',
                    shadowOpacity: 0.2, borderRadius: 20
                }}>
                    <QRCode
                        value={this.state.loggedInUserId}
                        size={deviceWidth * 0.7}
                        bgColor='#6D6D6D'
                        fgColor='white' />
                </View>
            </Popup>
        )
    }

    componentDidMount() {
        this.getUnreadMessages()
    }

    getUnreadMessages = () => {
        AxiosInstance.get(`Accounts/me/inbox/count?where={"status":"unread"}`)
            .then(response => {
                this.setState({ unreadMessages: response.count })
            })
            .catch(error => {

            })
    }

    showToast = () => {
        Toast.show({
            text: 'This feature is available on the newer version',
            buttonText: '',
            textStyle: {
                fontFamily: 'Lato-Light'
            }
        })
    }


    render() {
        const navigation = this.props.navigation;
        const BadgeIcon = withBadge(this.state.unreadMessages > 99 ? '99+' : this.state.unreadMessages, {
            badgeStyle: {
                width: this.state.unreadMessages > 99 ? 35 : 25
            }
        })(Icon)
        return (
            <Container style={styles.content}>
                <Header style={{ padding: 0 }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <CustomIcon name="menu" style={{ fontSize: 18, color: '#6D6D6D' }} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 3, alignItems: 'center' }}>
                        <Image source={icon} style={{ resizeMode: 'center', width: '40%', paddingTop: 20 }} />
                    </Body>
                    <Right>
                        <Button transparent style={{ margin: 0, padding: 0 }} onPress={() => this.props.navigation.navigate('Notification', { 'getUnreadMessages': this.getUnreadMessages })}>
                            {
                                this.state.unreadMessages ?
                                    <BadgeIcon type="ionicon" name="ios-notifications" color="#6d6d6d" />
                                    : <Icon type="ionicon" name="ios-notifications" color="#6d6d6d" />
                            }
                        </Button>

                        <Button transparent style={{ margin: 0, padding: 0 }} onPress={() => this.setModalVisible()}>
                            <CustomIcon name="qr-code" style={{ margin: 0, padding: 0, fontSize: 18, color: '#6D6D6D' }} />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Image
                        style={{ width: '100%', height: deviceHeight * 0.3, alignSelf: 'stretch' }}
                        source={cover}
                    />
                    <View style={{ position: "absolute", top: 0, width: '100%', backgroundColor: 'transparent', height: deviceHeight * 0.4, marginTop: deviceHeight * 0.25 }}>
                        <Text style={{ fontFamily: 'Lato-Regular', alignSelf: "center", zIndex: 10, color: '#fff', fontSize: 24 }}>Where work meets life</Text>
                    </View>
                    <View style={{ ...styles.container }}>
                        <View style={styles.row}>
                            <MenuCard icon="workspace" caption="Book Workspace" onPress={() => this.props.navigation.navigate('WorkSpace')} />
                            <MenuCard icon="location" caption="View Locations" onPress={() => this.props.navigation.navigate('LocationIntro')} />
                        </View>
                        <View style={styles.row}>
                            <MenuCard icon="event" caption="Events & Meetings" onPress={() => this.props.navigation.navigate('EventIntro')} />
                            <MenuCard icon="service" caption="More for U..." onPress={() => this.props.navigation.navigate('Service')} />
                        </View>
                        <View style={styles.row}>
                            <MenuCard icon="bluespace" caption="blueFace" onPress={() => this.props.navigation.navigate('Community')} />
                            <MenuCard icon="community" caption="Community Board" onPress={() => this.props.navigation.navigate('BlueFace')} />
                        </View>
                        {/* <View style={styles.row}>
                    <MenuCard icon="event" caption="Host Events" onPress={this.showToast} />
                    <MenuCard icon="service" caption="More for U..." onPress={this.showToast}/>                    
                </View>
                <View style={styles.row}>
                    <MenuCard icon="bluespace" caption="blueFace" onPress={this.showToast}/>
                    <MenuCard icon="community" caption="Community Board" onPress={this.showToast}/>
                </View> */}
                        <View style={styles.row}>
                            <MenuCard icon="support" caption="Support" onPress={() => this.props.navigation.navigate('Support')} />
                            {/* <MenuCard icon="support" caption="Support" onPress={this.showToast}/> */}
                            <MenuCard icon="profile" caption="My Account" onPress={() => this.props.navigation.navigate('Account')} />
                        </View>
                    </View>
                </Content>

                {this.renderQRcode()}

            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.loginReducer.token,
    }
};

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#eee',
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingTop: deviceHeight * 0.025,
    },
    content: {
        backgroundColor: '#eee',
    },
    row: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        flex: 1,
    },
    icon: {
        alignSelf: 'center'
    },
    circle: {
        width: deviceWidth * 0.2,
        height: deviceWidth * 0.2,
        borderRadius: deviceWidth * 0.2 / 2,
        backgroundColor: '#008FD2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    menuCard: {
        flexDirection: 'column',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        margin: deviceHeight * 0.02,
        backgroundColor: '#fff',
        zIndex: 2,
        width: deviceWidth * 0.45,
        height: deviceHeight * 0.10,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
    }
});
