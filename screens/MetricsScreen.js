import React from 'react';
import {View, Text, Picker, StyleSheet, ScrollView, Button} from 'react-native'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import DatePicker from 'react-native-datepicker' 
import TimePicker from 'react-native-simple-time-picker';

export default class MetricsScreen extends React.Component{

    

    static navigationsOptions = {
        title: "Metrics"
    };
    
    
    constructor (props){
        super(props);
        const {navigation} = this.props;
        //global.UserName = this.props.navigation.state.params.name ? this.props.navigation.state.params.name : null;

        this.state = {
            linkedDevices: [],
            rawMetrics: [],
            calculatedMetrics: [],
            metricsCalculType: [
                {
                    "name": "Average minute",
                    "id": "1"
                },
                {
                    "name": "Average hour",
                    "id": "2"
                },
                {
                    "name": "Average day",
                    "id": "3"
                },
                {
                    "name": "Average minute",
                    "id": "4"
                }
            ],
            selectedDevice: '',
            selectedCalculType: '',
            userName: global.UserName ? global.UserName : this.props.navigation.navigate({ routeName: 'User'}),
            date: "2019-07-01",
            dateStart: "",
            dateEnd: "",
            idCalculType: 0,
            macAddress: "",
            selectedHours: 0,
            selectedMinutes: 0,
            startHour : 0,
            startMinutes: 0,
            endHour: 0,
            endMinutes: 0,
            valueCalculatedMetrics: []
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

    renderObjectCalculatedMetrics(){
        return Object.entries(this.state.calculatedMetrics).map(([key, value], i) =>{
            return(
                <View key={key} style={styles.CalculatedMetricWrapper}>
                    <Text>Device name is : {value.deviceName}</Text>
                    <Text>Metric value is : {value.metricValue}</Text>
                    <Text>Calcul type is : {value.calculType}</Text>
                </View>
            )
        })
    }

    getMetricDevice(deviceValue, deviceIndex){
        console.log(this.state.selectedDevice)
        fetch('http://192.168.227.137:15080/atlantis/api-mobile/mobile/metricsFromDevice', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
              },
            body: deviceValue,
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log("RAW DATA :");
            console.log(responseJson);
            this.setState({rawMetrics: responseJson})
            //this.setState({linkedDevices: responseJson.DevicesFromOneUser})
        })
        .catch((error) => {
            console.log("Y a erreur");
            console.error(error);
        });
    }


    getCalculatedMetrics(){
        
        var dateStart = this.state.dateStart + " " + this.state.startHour + ":" + this.state.startMinutes;
        var dateEnd = this.state.dateEnd + " " + this.state.endHour + ":" + this.state.endMinutes;
        var idCalculType = this.state.idCalculType;
        var macAddress = 'b8:27:eb:c8:37:f8';
        console.log(dateStart);
        console.log(dateEnd);
        console.log(idCalculType);
        console.log(macAddress);
        var Url = 'http://192.168.227.137:15080/atlantis/api-mobile/mobile/getCalcMetric/' + macAddress + '/' + dateStart + '/' + dateEnd + '/' + idCalculType;
        fetch(Url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
              },
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log("ResponseJson :");
            console.log(responseJson);
            this.setState({calculatedMetrics: responseJson})
            this.setState({valueCalculatedMetrics: responseJson.value})
        })
        .catch((error) => {
            console.log("Y a erreur");
            console.error(error);
        });
    }

    render(){
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const { navigate } = this.props.navigation;
        return (
            <ScrollView>
                <View style={styles.MainContainer}>
                    <View style={styles.DeviceContainer}>
                        <Text style={styles.Title}>Choose a device</Text>
                        <View style={styles.PickerContainer}>
                            <Picker 
                                selectedValue={this.state.selectedDevice}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.getMetricDevice(itemValue, itemIndex);
                                    this.setState({selectedDevice: itemValue});
                                }}
                            >
                                {this.state.linkedDevices.map(function(name, index){
                                    return <Picker.Item label={name} key={index} value={name} /> 
                                })}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.RawMetricsContainer}>
                        <Text style={styles.Title}>Raw data metrics</Text>
                        <View style={styles.MetricsContainer}>
                        {this.state.rawMetrics.map(function(name, index){
                            return (
                            <View key={index} style={styles.RawMetricWrapper}>
                                <Text>Metric date is : {name.metricDate}</Text>
                                <Text>Metric value is : {name.metricValue}</Text>
                            </View>
                            )
                            })}
                        </View>
                    </View>
                    <View style={styles.CalculatedMetricsContainer}>
                        <Text style={styles.Title}>Calculated data metrics</Text>
                        <DatePicker
                            date={this.state.date}
                            mode="date"
                            placeholder="Select Start Date"
                            format="YYYY-MM-DD"
                            minDate="2019-07-01"
                            maxDate="2019-07-02"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => this.setState({dateStart: date})}
                        />
                        <TimePicker
                            selectedHours={selectedHours}
                            selectedMinutes={selectedMinutes}
                            onChange={(hours, minutes) => this.setState({ 
                            startHour: hours, startMinutes: minutes 
                            })}
                        />
                        <DatePicker
                            date={this.state.date}
                            mode="date"
                            placeholder="Select End Date"
                            format="YYYY-MM-DD"
                            minDate="2019-07-01"
                            maxDate="2019-07-02"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => this.setState({dateEnd: date})}
                        />
                        <TimePicker
                            selectedHours={selectedHours}
                            selectedMinutes={selectedMinutes}
                            onChange={(hours, minutes) => this.setState({ 
                            endHour: hours, endMinutes: minutes 
                            })}
                        />
                        <Text style={styles.Subtitle}>Calcul type</Text>
                        <View style={styles.PickerContainer}>
                            <Picker
                                selectedValue={this.state.selectedCalculType}
                                onValueChange={(itemValue, itemIndex) => {
                                    console.log(itemIndex)
                                    this.setState({selectedCalculType: itemValue})
                                    if(itemValue == "Average minute"){
                                        this.setState({idCalculType: "1"})
                                    }
                                    if(itemValue == "Average hour"){
                                        this.setState({idCalculType: "2"})
                                    }
                                    if(itemValue == "Average day"){
                                        this.setState({idCalculType: "3"})
                                    }
                                    if(itemValue == "Average minute"){
                                        this.setState({idCalculType: "4"})
                                    }
                                    this.getCalculatedMetrics();
                                }}    
                            >
                                {this.state.metricsCalculType.map(function(name, index){
                                    return <Picker.Item label={name.name} key={index} value={name.name} index={name.id} /> 
                                })}
                            </Picker>
                        </View>
                        <View style={styles.MetricsContainer}>
                            {this.renderObjectCalculatedMetrics()}
                        </View>
                    </View>
                    <View style={styles.GraphContainer}>
                        <Text style={styles.Title}>Calculated metric graph</Text>
                        <AreaChart
                            style={{ height: 200 }}
                            data={ valueCalculatedMetrics }
                            contentInset={{ top: 30, bottom: 30 }}
                            curve={ shape.curveNatural }
                            svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                        >
                            <Grid/>
                        </AreaChart>
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
   
    MetricsContainer:{
        // flexDirection: 'row'
    },

    Title:{
        fontSize: 25
    },

    Subtitle: {
        fontSize: 20
    },

    DeviceContainer:{
        marginTop: 10
    },

    PickerContainer:{
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10
    },

    RawMetricsContainer:{
        marginTop: 10
    },

    CalculatedMetricsContainer:{
        marginTop: 10
    },

    GraphContainer:{
        marginTop: 10
    },

    RawMetricText:{
        flex: 1,
        alignItems: 'center'
    },

    RawMetricWrapper:{
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10
    },

    CalculatedMetricWrapper:{
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10
    }
   
  });