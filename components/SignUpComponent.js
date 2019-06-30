import React from 'react';
import {View, StyleSheet, Alert} from 'react-native'
import { Input, Button } from 'react-native-elements'

export default class SignUpComponent extends React.Component{

    constructor (props){
        super(props)
        this.state = {
            userName: '',
            userPassword: ''
        }
    }

    signUp(){
        var userName = this.state.userName;
        var userPassword = this.state.userPassword;
        fetch('http://192.168.227.137:15080/atlantis/api-mobile/mobile/createUser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
               name: userName,
               password: userPassword, 
            }),
        })
        .then((response) => response.text())
        .then((responseJson) => {
            console.log(responseJson);
            Alert.alert(
                'Create user',
                responseJson,
                [
                    {text: 'Ok', onPress: () => this.props.navigation.navigate('Home')}
                ]
            )
            // if(responseJson.sucess === true){
            //     console.log("coucou")
            // } else{
            //     console.log(responseJson.message);
            // }
        })
        .done();
    }

    render(){
        return (
            <View style={styles.MainContainer}>
                <View style={styles.Form}>
                    <Input
                        placeholder='user name'
                        onChangeText={(text) => this.setState({userName: text})}
                    />
                    <Input
                        placeholder='user password'
                        onChangeText={(text) => this.setState({userPassword: text})}
                        secureTextEntry={true}
                    />
                    <Button
                        title="Sign Up"
                        onPress={this.signUp.bind(this)}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    Form:{
        borderColor: 'gray',
        borderWidth: 1
    },

  });