import React from 'react';
import {View, Text, StyleSheet, Button, Picker} from 'react-native'

export default class CommandScreen extends React.Component{

    constructor (props){
        super(props)
        this.state = {
            linkedDevices: ['ledBlue', 'ledGreen', 'ledRed'],
            deviceSelected: ''
        };
    }

    turnOn(){
        console.log("Turn on LED");
        fetch('http://192.168.227.137:8080/atlantis/api-mobile/mobile/command', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
               macAddress: "b8:27:eb:c8:37:f8",
               actorName: "led",
               action: "on", 
            }),
        })
        .then((response) => {
            console.log(JSON.stringify(response, null, 4))
            return response.json();
        })
        .then((responseJson) => {
            console.log("ResponseJson :");
            console.log(responseJson);
        })
        .catch((error) => {
            console.log("Y a erreur");
            console.error(error);
        });
    }

    turnOff(){
        console.log("Turn off LED");
        fetch('http://192.168.227.137:8080/atlantis/api-mobile/mobile/command', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
               macAddress: "b8:27:eb:c8:37:f8",
               actorName: "led",
               action: "off", 
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("ResponseJson :");
            console.log(responseJson);
        })
        .catch((error) => {
            console.log("Y a erreur");
            console.error(error);
        });
    }
    
    render(){
        return (
            <View style={styles.MainContainer}>
                <Text style={styles.Title}>Choose a device</Text>
                <View style={styles.PickerContainer}>
                    <Picker selectedValue={this.state.deviceSelected} onValueChange={(deviceValue, deviceIndex) => {
                        this.setState({deviceSelected: deviceValue})
                    }}>
                        {this.state.linkedDevices.map(function(name, index){
                            return <Picker.Item label={name} key={index} value={name} /> 
                        })}
                    </Picker>
                </View>
                <View style={styles.CommandContainer}>
                    <View style={styles.ButtonContainer}>
                        <Button title="Turn on" onPress={this.turnOn}/>
                    </View>
                    <View style={styles.ButtonContainer}>
                        <Button title="Turn off" onPress={this.turnOff} />
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
   
    CommandContainer:{
        flexDirection: 'row',
        marginTop: 10
    },

    Title:{
        fontSize: 25,
        marginBottom: 5
    },

    Subtitle: {
        fontSize: 20
    },

    ButtonContainer:{
        alignItems: 'center',
        flex: 1
    },

    PickerContainer:{
        borderColor: 'gray',
        borderWidth: 1
    }
   
  });