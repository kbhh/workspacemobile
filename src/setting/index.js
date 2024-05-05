import React, {Component} from 'react';
import { Container, Button, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import styles from '../styles';
import HeaderTitle from '../common/HeaderTitle';

export default class Setting extends Component {
    static navigationOptions = {
      // title: 'Setting'
      headerTitle: <HeaderTitle title='Settings' />,
    };
  render() {
    return (
      <Container style={[styles.content]}>
      <Content style={{flex:1}}>
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "#FF9501" }}>
              <Icon active name="airplane" />
            </Button>
          </Left>
          <Body>
            <Text>Make my account public</Text>
          </Body>
          <Right>
            <Switch value={false} />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "#007AFF" }}>
              <Icon active name="wifi" />
            </Button>
          </Left>
          <Body>
            <Text>Recieve Notification</Text>
          </Body>
          <Right>
          <Switch value={true} />
          </Right>
        </ListItem>
      </Content>
    </Container>
    );
  }
}