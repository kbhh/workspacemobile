import React, {Component} from 'react';
import { Text, View, TextInput } from 'react-native';
import { Input as NativeInput, Label, Item } from 'native-base'

export default class Input extends Component {
  state = {
    isFocused: false,
    isError: false,
  };

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  render() {
    const { label, error, ...props } = this.props;
    const labelStyle = {
      // position: 'absolute',
      // right: 20,
    };
    return (
        <View>
                  <Item stackedLabel>
                  <Label style={labelStyle}>
                    {label}
                  </Label>

                  <NativeInput
                    style={{
                        // height: 26, fontSize: 20, color: '#7F7F7F',
                        // flex: 1, padding: 0, 
                    }}
                    value={this.props.value}
                    onChangeText={this.props.onChange}
                    onFocus={this.handleFocus}
                    onBlur={this.props.onBlur}
                    secureTextEntry={this.props.secureTextEntry === true ? true : false}
                    maxLength={this.props.maxLength}
                    keyboardType={this.props.keyboardType !== undefined ? this.props.keyboardType : 'default'}
                  />
                  </Item>
            <Text style={{alignSelf: 'flex-end', paddingRight: '10%', color: '#ff0000'}}>{error}</Text>
      </View>
    );
  }
}
