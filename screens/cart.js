import * as React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import TopBar from './topBar';
function Cart() {

    return (
        <View style={styles.container}>
            <TopBar/>
            <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" style={styles.image}>
                    <Text style={{fontSize:20, textAlign:'center'}}> Under development</Text>
             </ImageBackground>
       </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    }
  });
  export default Cart;