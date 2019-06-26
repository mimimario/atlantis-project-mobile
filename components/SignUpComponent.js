import React from 'react';
import {View, StyleSheet} from 'react-native'
import { Input, Button } from 'react-native-elements'

export default class SignUpComponent extends React.Component{

    constructor (props){
        super(props)
        this.state = {
            userEmail: '',
            userPassword: ''
        }
    }

    signUp(){
        var userEmail = this.state.userEmail;
        var userPassword = this.state.userPassword;
        //fetch('http://localhost:59784/api/Actor', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //       },
        //     body: JSON.stringify({
        //        userEmail: userEmail,
        //        userPassword: userPassword, 
        //     }),
        // }).then((response) => response.json())
        // .then((responseJson) => {
        //     console.log("ResponseJson :");
        //     console.log(responseJson);
        // })
        // .catch((error) => {
        //     console.log("Y a erreur");
        //     console.error(error);
        // });
    }

    render(){
        return (
            <View style={styles.MainContainer}>
                <View style={styles.Form}>
                    <Input
                        placeholder='user email'
                        onChangeText={(text) => this.setState({userEmail: text})}
                    />
                    <Input
                        placeholder='user password'
                        onChangeText={(text) => this.setState({userPassword: text})}
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