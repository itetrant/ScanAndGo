import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {Ionicons} from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

//class TopBar extends React.Component {
const TopBar = (state) => {
    const navigation = useNavigation(); 
  //render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
            <Image
              source={require('../assets/mm-icon-only-1.png')}
              />
          <Text style={{fontSize:26, color:'red', fontWeight:'bold'}}>Scan & Go</Text>
          <Ionicons name="ios-cart-outline" size={32} color={'red'} 
           onPress={()=>navigation.navigate('Cart')}
          />       

            <View style = {{position:'absolute', flexDirection:'row', justifyContent: 'flex-end', 
                             paddingBottom:28,width:'104%'}}>
                  <View style = {{ flexDirection:'row',borderRadius:10, justifyContent: 'center',zIndex:2000,
                              alignItems:'center',height:20, width:20,backgroundColor:'rgba(52, 52, 52, 0.2)'}}>
                    <Text style={{color:'red', fontWeight:'bold',fontSize:12}}>
                      {state.myValue}
                      {/* 0 */}
                      </Text>
                  </View>

          </View>

        </View>

        <ItemSeparatorView/>
      </SafeAreaView>
    );
  //}
}
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={styles.itemSeparatorStyle} />
    );
  };

  function mapStateToProps(state) {
    return { 
        myValue: state.TotItem,
        // myHighlight: state.highlight 
    };
}
export default connect(mapStateToProps)(TopBar);
//export default TopBar;
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
    marginTop: 20,
  },
  itemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#c5c6c6',
  },
});
