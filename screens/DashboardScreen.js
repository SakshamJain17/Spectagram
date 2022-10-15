import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import firebase from 'firebase';

export default class DashboardScreen extends Component {
    render(){
    return(
        <View
        style={{
            flex:1,
            justifyContent: "center",
            alignItems: "center"}}> 
    <Text>Dashboard</Text>         
        </View>
        )
    }}
