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
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fontsLoaded: false
        };
      }
    
      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
      }


    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (
              providerData[i].providerId ===
              firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.getBasicProfile().getId()
            ) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      };
      onSignIn = googleUser => {
        
        var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
          unsubscribe();
         
          if (!this.isUserEqual(googleUser, firebaseUser)) {
          
            var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
            );
    
            firebase
              .auth()
              .signInWithCredential(credential)
              .then(function (result) {
                if (result.additionalUserInfo.isNewUser) {
                  firebase
                    .database()
                    .ref("/users/" + result.user.uid)
                    .set({
                      gmail: result.user.email,
                      profile_picture: result.additionalUserInfo.profile.picture,
                      locale: result.additionalUserInfo.profile.locale,
                      first_name: result.additionalUserInfo.profile.given_name,
                      last_name: result.additionalUserInfo.profile.family_name,
                      current_theme: "dark"
                    })
                    .then(function (snapshot) { });
                }
              })
              .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });
          } else {
            console.log("User already signed-in Firebase.");
          }
        });
      };
      signInWithGoogleAsync = async () => {
        try {
          const result = await Google.logInAsync({
            behaviour: "web",
            androidClientId:
              "989879859384-5ajpt01kldhfruhn78qo8d4ng34qddu3.apps.googleusercontent.com",
            scopes: ["profile", "email"]
          });
    
         if (result.type === "success") {
            this.onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          console.log(e.message);
          return { error: true };
        }
      };
    
    render(){
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
          } else {
    return(
    <View style={Styles.container}>
        <SafeAreaView style={styles.droidSafeArea}/>
        <View style={styles.appTitle}>
    <Image
        souce={require("../assets/logo.png")}
        style={styles.appIcon}></Image>
    <Text style={styles.appTitleText}>{'Story Telling\nApp'}</Text>        
    </View>   
    <View style={styles.buttonContainer}>
    <TouchableOpacity
        style={styles.button}
        onPress={()=> this.signInWithGoogleAsync()}>      
    <Image  
        souce={require("../assets/google_icon.png")}
        style={styles.googleIcon}></Image>
    <Text style={styles.googleText}>
        Sign In with Google</Text>                
    </TouchableOpacity>
    </View>
    <View style={styles.cloudContainer}>
    <Image
    source={require("../assets/cloud.png")}
    style={styles.cloudImage}>
    </Image>        
    </View>
    </View>
        )
    }   
}}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.4,
      justifyContent: "center",
      alignItems: "center"
    },
    appIcon: {
      width: RFValue(130),
      height: RFValue(130),
      resizeMode: "contain"
    },
    appTitleText: {
      color: "white",
      textAlign: "center",
      fontSize: RFValue(40),
      fontFamily: "Bubblegum-Sans"
    },
    buttonContainer: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      width: RFValue(250),
      height: RFValue(50),
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderRadius: RFValue(30),
      backgroundColor: "white"
    },
    googleIcon: {
      width: RFValue(30),
      height: RFValue(30),
      resizeMode: "contain"
    },
    googleText: {
      color: "black",
      fontSize: RFValue(20),
      fontFamily: "Bubblegum-Sans"
    },
    cloudContainer: {
      flex: 0.3
    },
    cloudImage: {
      position: "absolute",
      width: "100%",
      resizeMode: "contain",
      bottom: RFValue(-5)
    }
  });
