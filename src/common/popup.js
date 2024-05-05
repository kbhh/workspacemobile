import React, {Component} from 'react';
import { View, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import Modal from "react-native-modal";
import styles from '../styles';

export default class Popup extends React.PureComponent {

    render() {
        return (
            
                <Modal 
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                    onBackdropPress={()=>this.props.back()}
                    onSwipe={()=>this.props.back()}
                    onBackButtonPress={()=>this.props.back()}
                    onClose={()=>this.props.back()}
                    onRequestClose={()=>this.props.back()}
                    swipeDirection="up">
                    <TouchableOpacity 
                        style={styles.popup} 
                        activeOpacity={1} 
                        onPressOut={()=>this.props.back()} >
                        <View style={styles.popup}>
                        <TouchableWithoutFeedback onPress={()=>this.props.back()}>
                            {this.props.children}
                        </TouchableWithoutFeedback>
                        </View>
                    </TouchableOpacity>
                </Modal>
            
        )
    }}