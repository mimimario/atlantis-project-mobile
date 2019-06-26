import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native'
import ThreeAxisSensor from 'expo-sensors/build/ThreeAxisSensor';

export default class UserScreen extends React.Component{
    
    constructor (props){
        super(props)
        this.state = {
            userEmail: '',
            userPassword: ''
        };
    }

    render(){
        return (
            <View style={styles.MainContainer}>
                <View style={styles.Form}>
                    <TextInput 
                        onChangeText={(text) => this.setState({userEmail: text})}
                        value={this.state.userEmail} 
                    />
                    <TextInput
                        onChangeText={(text) => this.setState({userPassword: text})}
                        value={this.state.userPassword}    
                    />
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
 
    MainContainer: {
      flex: 1,
    },

  });