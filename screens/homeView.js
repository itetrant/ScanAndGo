import * as React from 'react';
import { Text, StyleSheet, SafeAreaView, View} from 'react-native';
import { SliderBox  } from 'react-native-image-slider-box';
import TopSales from './topSales';
import TopBar from './topBar';
import styles from '../styles/styles.js';

export default function HomeScreen({navigation}) {

    const images = [
  
      require('../assets/song-khoe.jpg'),
      require('../assets/mcard.jpg'),
      require('../assets/Momo.jpg'),
      // require('./assets/tap-hoa.jpg'),
  
    ];
  const handleImgOnPress = (idx) => {
    switch (idx) {
      case 0:
        //Linking.openURL('https://mmpro.vn');
        navigation.navigate("MyWebComponent", { url:'https://mmpro.vn'});
        break;
      case 1:
        //Linking.openURL('https://mmvietnam.app');
        navigation.navigate("MyWebComponent", { url:'http://mmvietnam.app'});
        break;
      case 2:
        //Linking.openURL('https://mmvietnam.com');
        navigation.navigate("MyWebComponent", { url:'https://mmvietnam.com'});
        break;
    }

  }
    return (
  <SafeAreaView style={{flex: 1}}>

      {/* <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" style={styles.image}> */}
      <TopBar/>  
      <View style={{paddingTop:1}}>
          {/* <Text style={styles.title_text}></Text> */}
          <SliderBox images={images} 
          autoplay = {true}
          circleLoop = {true}
          sliderBoxHeight={268}
          dotColor="#FF0000"
          inactiveDotColor="#90A4AE"
          onCurrentImagePressed={index => handleImgOnPress(index)}
          />    

       <Text style={styles.title_text}>Top sales</Text>
       </View>

       <TopSales />

      {/* </ImageBackground> */}

      </SafeAreaView>
    );
  }
  

