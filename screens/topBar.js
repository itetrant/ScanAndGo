import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {Ionicons} from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
//class TopBar extends React.Component {
const TopBar = () => {
    const navigation = useNavigation(); 
  //render() {
    return (
      <View style={styles.container}>
          <Image
            source={require('../assets/mm-icon-only-1.png')}
            />
        <Text style={{fontSize:26, color:'red', fontWeight:'bold'}}>Scan & Go</Text>
        <Ionicons name="ios-cart-outline" size={32} color={'red'} onPress={()=>navigation.navigate('Cart')}/>
      </View>
    );
 // }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 66,
    flexDirection: 'row', // row
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 28,
  }
});
export default TopBar;