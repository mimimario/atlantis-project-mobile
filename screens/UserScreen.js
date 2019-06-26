import React from 'react';
import {View, Text, TextInput, StyleSheet, Image} from 'react-native'
import {Button} from 'react-native-elements'
import SignUpComponent from '../components/SignUpComponent'
import SignInComponent from '../components/SignInComponent'

export default class UserScreen extends React.Component{
    
    constructor (props){
        super(props)
        this.state = {
            isSignIn: true,
            isSignUp: false
        }
    }

    componentWillMount(){
        console.log(this.state.isSignIn);
        console.log(this.state.isSignUp);
    }

    changeStateSignIn = () =>{
        if(this.state.isSignIn == true){
            this.setState({isSignIn: false, isSignUp: false});
        } else{
            this.setState({isSignIn: true, isSignUp:false});
        }
    }

    render(){
        return (
            <View style={styles.MainContainer}>
                <View style={styles.ImageContainer}>
                    <Image 
                        source={require('../assets/login.png')}
                        style={styles.Image}
                    />
                </View>
                <View style={styles.ButtonsContainer}>
                    <View style={styles.Buttons}>
                        <Button
                            title="SignIn"
                            onPress={this.changeStateSignIn.bind(this)}
                        />
                    </View>
                    <View style={styles.Buttons}>
                        <Button 
                            title="SignUp"
                            onPress={this.changeStateSignIn.bind(this)}
                        />
                    </View>
                </View>
                {this.state.isSignIn ? <SignInComponent /> : <SignUpComponent />}
            </View>
        )
    }


}

const styles = StyleSheet.create({
 
    MainContainer: {
      flex: 1,
    },

    ImageContainer:{
        flex: 2,
        alignItems: 'center'
    },

    ButtonsContainer: {
        flexDirection: 'row',
        flex: 1
    },

    Buttons: {
        flex: 1
    },
    
    Image:{
        height: 250,
        width: 250,
        marginTop: 15
    },

  });