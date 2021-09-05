import * as React from 'react';
import { Text, StyleSheet, SafeAreaView, View} from 'react-native';
import { SliderBox  } from 'react-native-image-slider-box';
import TopSales from './topSales';
import TopBar from './topBar';
import styles from '../styles/styles.js';

export default function HomeScreen({navigation}) {

    const images = [
  
      //require('../assets/song-khoe.jpg'),
      "https://storage.googleapis.com/mm-online-bucket/ecommerce-website/uploads/2020/06/banner-tuoi-sach-an-toan-tu-nong-trai-den-ban-an.jpg",
      require('../assets/mcard.jpg'),
      //require('../assets/Momo.jpg'),
      "https://storage.googleapis.com/mm-online-bucket/ecommerce-website/uploads/2020/06/banner-nang-luong-moi-he-phoi-phoi.jpg",
      "https://storage.googleapis.com/mm-online-bucket/ecommerce-website/uploads/2020/05/banner-flashsale-blue.jpg",
  
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
      case 3:
        //Linking.openURL('https://online.mmvietnam.com');
        navigation.navigate("MyWebComponent", { url:'https://online.mmvietnam.com'});
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
          sliderBoxHeight={125}
          dotColor="#FF0000"
          inactiveDotColor="#90A4AE"
          onCurrentImagePressed={index => handleImgOnPress(index)}
          resizeMethod={'resize'}
          //resizeMode={'contain'}
          />    

       <Text style={styles.title_text}>Top sales</Text>
       </View>

       <TopSales />

      {/* </ImageBackground> */}

      </SafeAreaView>
    );
  }
  

