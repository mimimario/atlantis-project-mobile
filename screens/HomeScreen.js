import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'

export default class HomeScreen extends React.Component{

    static navigationsOptions = {
        title: "Home Page"
    };
    
    render(){
        return (
            <View style={styles.MainContainer}>
                {/* <TouchableOpacity 
                style={styles.button}
                onPress={() => this.props.navigation.navigate('Metrics')} >
                    <Text style={styles.text}>Go to raw metrics</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => this.props.navigation.navigate('Command')} >
                    <Text style={styles.text}>Go to command</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => this.props.navigation.navigate('User')} >
                    <Text style={styles.text}>Go to user</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => this.props.navigation.navigate('BackOffice')} >
                    <Text style={styles.text}>Go to BackOffice</Text>
                </TouchableOpacity> */}
                <Image
              source={ require('../assets/atlantis.jpg') }
              style={{ width: 250, height: 250 }} />
              <View style={styles.textView}>
                <Text style={styles.text}>Welcome to Atlantis mobile application</Text>
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
 
    MainContainer: {
   
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5fcff',
      padding: 11
   
    },
   
    button: {
      alignItems: 'center',
      backgroundColor: '#43A047',
      padding: 12,
      width: 280,
      marginTop: 12,
    },
   
    text: {
        fontSize: 25,
        textAlign: "center"
    },
    textView: {
        marginTop: 20
    }
   
  });