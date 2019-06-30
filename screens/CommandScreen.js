import React from 'react';
import {View, Text, StyleSheet, Button, Picker} from 'react-native'

export default class CommandScreen extends React.Component{

    constructor (props){
        super(props)
        const {navigation} = this.props;
        this.state = {
            linkedDevices: [],
            deviceSelected: '',
            userName: global.UserName
        };
    }

    componentWillMount(){
        fetch('http://192.168.227.137:15080/atlantis/api-mobile/mobile/getAllDevicesFromUser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
              },
            body: this.state.userName,
        }).then((response) => response.json())
        .then((responseJson) => {
            var devices = responseJson.DevicesFromOneUser;
            this.setState({selectedDevice: devices[0]})
            this.setState({linkedDevices: responseJson.DevicesFromOneUser})
        })
        .catch((error) => {
            console.error(error);
        });
    }

    turnOn(){
        console.log("Turn on LED");
        fetch('http://192.168.227.137:15080/atlantis/api-mobile/mobile/command', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
               macAddress: "b8:27:eb:9d:62:ad",
               actorName: "led",
               action: "on", 
            }),
        })
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            console.log(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    turnOff(){
        console.log("Turn off LED");
        fetch('http://192.168.227.137:15080/atlantis/api-mobile/mobile/command', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
               macAddress: "b8:27:eb:9d:62:ad",
               actorName: "led",
               action: "off", 
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        })
        .catch((error) => {
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