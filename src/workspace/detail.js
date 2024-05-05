import React, {Component} from 'react';
import { View, TouchableOpacity  } from 'react-native';
import { Button, WorkspaceItem, Body} from '../common';
import { Container, Content } from 'native-base';
import styles from '../styles';
import HeaderTitle from '../common/HeaderTitle';

export default class WorkSpace extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'WorkSpace Detail',
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('AddWorkSpace')}>
            <CustomIcon name="edit" style={{marginRight:20, padding: 10, fontSize: 28, color: '#6D6D6D'}}/>
        </TouchableOpacity>
      )
    }
  };
    static navigationOptions = {
      // title: 'WorkSpace Detail'
      headerTitle: <HeaderTitle title='workSpace Detail' />,
    };
  render() {
    const { navigation } = this.props;
    const workspace = navigation.getParam('workspace', {});
    const keys = navigation.getParam('keys', []);
    return (
      <Container>
        <Content padder style={[styles.content]}>
          <Body>
            <View style={{ flexDirection:'row', backgroundColor: '#fff', flexWrap:'wrap' }}>
                  <WorkspaceItem {...workspace} keys={keys} />
              </View>
              <Button style={{marginTop:60}} label="RENEW" action={()=>{}} />
          </Body>
        </Content>
      </Container>
    );
  }
}