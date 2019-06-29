import React from 'react';
import {View, Text, StyleSheet, Picker, Button, ScrollView} from 'react-native'

export default class BackOfficeScreen extends React.Component{
    
    constructor (props){
        super(props)
        this.state = {
            registeredDevices: ['ledBlue', 'ledGreen', 'ledRed'],
            registeredUsers: ['Sylvain', 'Théophane', 'Alexandre', 'Claire'],
            deviceSelected: '',
            userSelected: '',
            deviceType: ['presenceSensor', 'temperatureSensor', 'brightnessSensor', 'atmosphericPressureSensor', 'humiditySensor', 'soundLevelSensor', 'gpsSensor', 'co2Sensor', 'ledDevice', 'beeperDevice'],
            typeSelected: ''
        };
    }

    associateUserDevice(){
        console.log("Coucou lol");
    }


    render(){
        return (
            <ScrollView>
                <View style={styles.MainContainer}>
                    <View style={styles.DevicesContainer}>
                        <Text style={styles.Title}>Registered devices</Text>
                        <View style={styles.RegisteredDevicesWrapper}>
                            {this.state.registeredDevices.map(function(name, index){
                                return <Text key={index}>{name}</Text> 
                            })}
                        </View>
                    </View>
                    <View style={styles.UserContainer}>
                        <Text style={styles.Title}>Registered users</Text>
                        <View style={styles.RegisteredUsersWrapper}>
                            {this.state.registeredUsers.map(function(name, index){
                                return <Text key={index}>{name}</Text> 
                            })}
                        </View>
                    </View>
                    <View style={styles.UserContainer}>
                        <Text style={styles.Title}>Associate user / device</Text>
                        <View>
                            <View style={styles.PickerContainer}>
                                <Picker selectedValue={this.state.deviceType} onValueChange={(type, deviceIndex) => {
                                    this.setState({typeSelected: type})
                                }}>
                                    {this.state.deviceType.map(function(name, index){
                                        return <Picker.Item label={name} key={index} value={name} /> 
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.PickerContainer}>
                                <Picker selectedValue={this.state.deviceSelected} onValueChange={(deviceValue, deviceIndex) => {
                                    this.setState({deviceSelected: deviceValue})
                                }}>
                                    {this.state.registeredDevices.map(function(name, index){
                                        return <Picker.Item label={name} key={index} value={name} /> 
                                    })}
                                </Picker>
                            </View>
                            <View style={styles.PickerContainer}>
                                <Picker selectedValue={this.state.userSelected} onValueChange={(userValue, deviceIndex) => {
                                    this.setState({userSelected: userValue})
                                }}>
                                    {this.state.registeredUsers.map(function(name, index){
                                        return <Picker.Item label={name} key={index} value={name} /> 
                                    })}
                                </Picker>
                            </View>
                            <Button 
                                onPress={this.associateUserDevice}
                                title="Associate"
                            ></Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }


}

const styles = StyleSheet.create({
 
    MainContainer: {
      flex: 1,
    },
   
    DevicesContainer:{
        marginTop: 10
    },

    UserContainer:{
      marginTop: 10  
    },

    Title:{
        fontSize: 25
    },

    RegisteredDevicesWrapper:{
        borderColor: 'gray',
        borderWidth: 1
    },

    RegisteredUsersWrapper: {
        borderColor: 'gray',
        borderWidth: 1
    },

    PickerContainer:{
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5
    },

  });