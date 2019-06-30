import React from 'react';
import {View, Text, TextInput, StyleSheet, Image, Alert} from 'react-native'

import { Input, Button } from 'react-native-elements'
import SignUpComponent from '../components/SignUpComponent'
import SignInComponent from '../components/SignInComponent'

export default class UserScreen extends React.Component{

    static navigationsOptions = {
        title: "User"
    };
    
    constructor (props){
        super(props)
        this.state = {
            // isSignIn: true,
            // isSignUp: false
        }
    }

    componentWillMount(){
        // console.log(this.state.isSignIn);
        // console.log(this.state.isSignUp);
    }

    // changeStateSignIn = () =>{
    //     if(this.state.isSignIn == true){
    //         this.setState({isSignIn: false, isSignUp: false});
    //     } else{
    //         this.setState({isSignIn: true, isSignUp:false});
    //     }
    // }

    // signInForm(){
    //     return(
    //         <View style={styles.Form}>
    //             <Input
    //                 placeholder='user name'
    //                 onChangeText={(text) => this.setState({userName: text})}
    //             />
    //             <Input
    //                 placeholder='user password'
    //                 onChangeText={(text) => this.setState({userPassword: text})}
    //                 secureTextEntry={true}
    //             />
    //             <Button
    //                 title="Sign In"
    //                 onPress={() => this.signIn()}
    //             />
    //         </View>
    //     )
    // }

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
            this.props.navigation.setParams({name: userName})
            Alert.alert(
                'User connected',
                responseJson,
                [
                    {text: 'Ok', onPress: () => this.props.navigation.navigate({ routeName: 'Metrics',  params: { name: userName } })}
                ]
            )
            global.UserName = userName;
        })
        .done();
    }

    signUp(){
        console.log("Pourquoi ça passe ici !!")
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
                    {text: 'Ok', onPress: () => this.props.navigation.navigate({ routeName: 'Metrics',  params: { name: userName } })}
                ]
            )
            global.UserName = userName;
        })
        .done();
    }

    // signUpForm(){
    //     return(
    //         <View style={styles.Form}>
    //             <Input
    //                 placeholder='user name'
    //                 onChangeText={(text) => this.setState({userName: text})}
    //             />
    //             <Input
    //                 placeholder='user password'
    //                 onChangeText={(text) => this.setState({userPassword: text})}
    //                 secureTextEntry={true}
    //             />
    //             <Button
    //                 title="Sign Up"
    //                 onPress={this.signUp()}
    //             />
    //         </View>
    //     )
    // }

    render(){
        return (
            <View style={styles.MainContainer}>
                <View style={styles.ImageContainer}>
                    <Image 
                        source={require('../assets/login.png')}
                        style={styles.Image}
                    />
                </View>
                <View style={styles.FormContainer}>
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
                    </View>
                    <View style={styles.ButtonsContainer}>
                        <View style={styles.ButtonSignUp}>
                            <Button
                                    
                                    title="Sign Up"
                                    onPress={() =>this.signUp()}
                                />
                        </View>
                        <View style={styles.ButtonSignIn}>
                            <Button
                                    
                                    title="Sign In"
                                    onPress={() => this.signIn()}
                                />
                        </View> 
                    </View>
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
 
    MainContainer: {
      flex: 1,
    },

    ImageContainer:{
        flex: 1,
        alignItems: 'center',
    },

    FormContainer: {
        flex: 1
    },

    Form:{
        borderColor: 'gray',
        borderWidth: 1,
        //flex: 1
    },

    ButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },

    ButtonSignUp:{
        flex: 1,
    },

    ButtonSignIn:{
        flex: 1
    },
    
    Image:{
        height: 250,
        width: 250,
        marginTop: 15
    },

    

  });