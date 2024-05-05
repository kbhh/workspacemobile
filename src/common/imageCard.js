import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { CustomIcon } from '../common';

const cover = require ('../../assets/1.jpg');

export default class ImageCard extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <TouchableOpacity
                style={{ marginRight:20, marginLeft: 20, marginTop: 20, marginBottom: 0}}
                onPress={() => this.props.action()}
        >
          
          <Image
                      style={{height:200,width:"100%",}}
                      source= {cover}
          />
          <View style={{padding:20, backgroundColor: '#fff'}}>
            <Text style={{color: '#707070', fontFamily: 'Lato-Heavy', fontSize: 16, width:'100%'}}>{this.props.titleLabel}</Text>
            <Text style={{color: '#707070', fontSize: 16}}>{this.props.timeLabel}</Text>
            <View style={{flexDirection:'row'}}>
              <CustomIcon name="location" style={{fontSize: 20, color: '#707070'}}/>
              <Text style={{color: '#707070', fontSize: 18,alignSelf:"center"}}>{this.props.locationLabel}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }
  