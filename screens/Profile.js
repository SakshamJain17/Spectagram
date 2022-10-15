import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from "firebase";

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
        fontsLoaded: false,
        isEnabled: false,
        light_theme: true,
        profile_image: "",
        name: ""
    };
  }
  toggleSwitch(){
    const previous_state= this.state.isEnabled;
    const theme= !this.state.isEnabled ? "dark" : "light"
    var updates ={}
    updates["/users/" + firebase.auth().currentUser.uid + "/current_theme"]
    = theme;
    firebase
      .database()
      .ref()
      .update(updates);
  this.setState({isEnabled: !previous_state, light_theme: previous_state });
};


  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Profile</Text>
      </View>
    );
  }
}
