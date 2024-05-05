import React, {Component} from 'react';
import { Text, View, TextInput } from 'react-native';

export default class TextArea extends Component {
  state = {
    isFocused: false,
    isError: false,
  };

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  render() {
    const { label, error, ...props } = this.props;
    const labelStyle = {
      position: 'absolute',
      right: 20,
    };
    return (
        <View style={[{flexDirection: 'column', width: '100%', marginBottom: 20}, this.props.style]}>
            <View style={{
                borderColor: '#BCE0FD', borderRadius: 5,
                borderWidth: 1, flexDirection: 'row', width: '90%',
                justifyContent: 'space-between', alignItems: 'center', padding: 16,
                marginLeft: 20, marginRight: 20, backgroundColor: '#FFFFFF',
              }}>
                  <Text style={labelStyle}>
                    {label}
                  </Text>

                  <TextInput
                    style={{
                        color: '#7F7F7F',
                        flex: 1, padding: 0, 
                    }}
                    value={this.props.value}
                    onChangeText={this.props.onChange}
                    onFocus={this.handleFocus}
                    onBlur={this.props.onBlur}
                    secureTextEntry={this.props.secureTextEntry === true ? true : false}
                    maxLength={this.props.maxLength}
                    multiline={true}
                    numberOfLines={4}
                    keyboardType={this.props.keyboardType !== undefined ? this.props.keyboardType : 'default'}
                  />
                 
            </View>
            <Text style={{alignSelf: 'flex-end', paddingRight: '10%', color: '#ff0000'}}>{error}</Text>
      </View>
    );
  }
}
