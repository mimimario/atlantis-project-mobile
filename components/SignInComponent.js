import React from 'react';
import {View, StyleSheet, Alert} from 'react-native'
import { Input, Button } from 'react-native-elements'

export default class SignInComponent extends React.Component{

    static navigationOptions = {
        title: 'Sign in',
      };

    constructor (props){
        super(props);
        this.navigate = this.props.navigation;
        this.state = {
            userName: '',
            userPassword: ''
        }
    }

    signIn(){
        var userName = this.state.userName;
        var userPassword = this.state.userPassword;
        fetch('http://192.168.227.137:15080/atlantis/api-mobile/mobile/connection', {
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
                'User connected',
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
                        title="Sign In"
                        onPress={() => this.props.navigation.navigate('Home')}
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

    Form:{
        borderColor: 'gray',
        borderWidth: 1
    },

  });