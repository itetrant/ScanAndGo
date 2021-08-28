// Scroll to a Specific Item in ScrollView List View
// https://aboutreact.com/scroll_to_a_specific_item_in_scrollview_list_view/
import {Ionicons} from 'react-native-vector-icons';
import React, {useState, useEffect} from 'react';
import TopBar from './topBar';
// import all the components we are going to use
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';

const Cart = () => {
  return (
  <View style={styles.container}> 
      <TopBar/> 
      
      <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" style={styles.image}>

              <Text style={{fontWeight:'bold',fontSize:16, textAlign:'center',lineHeight:50}}>
                UNDER DEVELOPMENT
              </Text>  

       </ImageBackground>

    </View> );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  
});


