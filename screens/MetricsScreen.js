import React from 'react';
import {View, Text, Picker, StyleSheet, ScrollView} from 'react-native'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

export default class MetricsScreen extends React.Component{
    
    constructor (props){
        super(props)
        this.state = {
            linkedDevices: ['ledBlue', 'ledGreen', 'ledRed'],
            rawMetrics: {
                metric1: {
                    deviceName: 'ledBlue',
                    nameMetric: 'blabla',
                    metricValue: 38,
                    metricType: 'temperature'
                },
                metric2: {
                    deviceName: 'ledBlue',
                    nameMetric: 'blibli',
                    metricValue: 42,
                    metricType: 'temperature'
                },
            },
            calculatedMetrics: {
                calculatedMetrics1: {
                    deviceName: 'ledBlue',
                    metricValue: 1200,
                    calculType: 'average'
                },
                calculatedMetrics2: {
                    deviceName: 'ledBlue',
                    metricValue: 900,
                    calculType: 'average'
                }
            }
        };
    }

    renderObjectRawMetrics(){
        return Object.entries(this.state.rawMetrics).map(([key, value], i) => {
			return (
				<View key={key} style={styles.RawMetricWrapper}>
					<Text>Device name is: {value.deviceName}</Text>
					<Text>Metric name is : {value.nameMetric}</Text>
                    <Text>Metric value is : {value.metricValue}</Text>
                    <Text>Metric type is : {value.metricType}</Text>
				</View>
			)
		})
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

    render(){
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        return (
            <ScrollView>
                <View style={styles.MainContainer}>
                    <View style={styles.DeviceContainer}>
                        <Text style={styles.Title}>Choose a device</Text>
                        <View style={styles.PickerContainer}>
                            <Picker >
                                {this.state.linkedDevices.map(function(name, index){
                                    return <Picker.Item label={name} key={index} value={name} /> 
                                })}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.RawMetricsContainer}>
                        <Text style={styles.Title}>Raw data metrics</Text>
                        <View style={styles.MetricsContainer}>
                            {this.renderObjectRawMetrics()}
                            
                        </View>
                    </View>
                    <View style={styles.CalculatedMetricsContainer}>
                        <Text style={styles.Title}>Calculated data metrics</Text>
                        <Text style={styles.Subtitle}>Calcul type</Text>
                        <Picker >
                            <Picker.Item label="Test1" value="test1" />
                        </Picker>
                        <View style={styles.MetricsContainer}>
                            {this.renderObjectCalculatedMetrics()}
                        </View>
                    </View>
                    <View style={styles.GraphContainer}>
                        <Text style={styles.Title}>Calculated metric graph</Text>
                        <AreaChart
                            style={{ height: 200 }}
                            data={ data }
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
        borderWidth: 1
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
        borderWidth: 1
    },

    CalculatedMetricWrapper:{
        borderColor: 'gray',
        borderWidth: 1
    }
   
  });