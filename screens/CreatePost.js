import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Font from "expo-font";
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Caption } from 'react-native-paper';


export default class CreatePost extends Component {

    constructor(props) {
        super(props);
        this.state = {
          //fontsLoaded: false,
          previewImage: "image_1",
          //dropdownHeight: 40
        };
      }

    render() {

        if (!this.state.fontsLoaded) {
            return <AppLoading />;
          } else {
            let preview_images = {
              image_1: require("../assets/image_1.jpg"),
              image_2: require("../assets/image_2.jpg"),
              image_3: require("../assets/image_3.jpg"),
              image_4: require("../assets/image_4.jpg"),
              image_5: require("../assets/image_5.jpg"),
              image_6: require("../assets/image_6.jpg"),
              image_7: require("../assets/image_7.jpg")

            };

    return (
        <View style={StyleSheet.container}>
            <SafeAreaView style={Styles.droidSafeArea}/>
            
            <View style= {Styles.appTitle}>       
            <View style= {styles.appIcon}>
        <Image
            source={require("../assets/logo.png")}
            style= {styles.iconImage}
            />    
            </View>
        
        <View style= {styles.appTitleTextContainer}>
        <Text style= {styles.appTitleText}>
            New Post        
        </Text>
    </View>
    </View>
        <View style= {styles.fieldsContainer}>
            <ScrollView>
    <Image
        Source={preview_images[this.state.previewImage]}
        style= {styles.previewImage}
        />            
    
    <View style={{ height:
            RFValue(this.state,DropDownHeight)}}>

    <DropDownPicker
        items={[
            {label: "Image 1", value: "image_1"},
            {label: "Image 2", value: "image_2"},            
            {label: "Image 3", value: "image_3"},            
            {label: "Image 4", value: "image_4"},            
            {label: "Image 5", value: "image_5"},            
            {label: "Image 6", value: "image_6"},            
            {label: "Image 7", value: "image_7"}            
        ]}                  
    defaultValue={this.state.previewImage}
    containerStyle={{
        height: 40,
        borderRadius: 20,
        MarginBottom: 10
    }}    
        onOpen= {() => {
            this.setState({DropDownHeight: 170});
        }}
        
        onClose= {() => {
            this.setState({ DropDownHeight: 40 });
        }}

        style={{backgroundColor: "transparent" }}

        itemStyle={{
            justifyContent: "flex-start"
        }}
        dropDownStyle={{backgroundColor: "#2a2a2a"}}

        labelStyle={{
            color: "white"
        }}

        arrowStyle={{
            color: "white"
        }}
        onChangeItem={item => 
            this.setState({
                previewImage: item.value
            }) 
        }/>
    </View>
        <TextInput>
            style={styles.inputFont}
            onChangeText= {Caption => this.setState({caption})}
            placeholder={"caption"}
            numberOfLines={4}
            placeholderTextColor="white"
            </TextInput>
            
            
            </ScrollView>
    
            </View>
            <View style={{ flex: 0.08 }}/>
            </View>

        );
    }
}
}