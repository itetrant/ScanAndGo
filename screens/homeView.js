import React, { useState,useEffect } from 'react';
import { Text, SafeAreaView, View} from 'react-native';
import { SliderBox  } from 'react-native-image-slider-box';
import TopSales from './topSales';
import TopBar from './topBar';
import styles from '../styles/styles.js';

// const wait = (timeout) => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// }

export default function HomeScreen({navigation}) {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const _debug = true;
  const url = 'https://api.jsonbin.io/v3/b/613de054aa02be1d4446c285';
  const masterKey = '$2b$10$eOvjB2WIN.Bcmr63RlaoLeXCNr1IpSbP/xraLEIrVVzUjPW3jnwQS';
  useEffect(() => {
    //wait(1000).then(() => getBannerlist());
    getBannerlist(); 
  }, []);

  const getBannerlist=()=>{
    //const url = 'https://api.jsonbin.io/v3/b/613de054aa02be1d4446c285';
    var imglink=[];
    var urllink=[];
    var j = 0;
    fetch(url,{
      mode: 'uat', 
      headers: {
        //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncmFudGVkIjoic3R1ZmYiLCJpYXQiOjE2MjkxODMxMzR9.otxK5YQhaB4p--Fal85qdGFwo2n0vtIQBS20P0l1-dA',
        'X-Master-Key':masterKey,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
            //responseData.forEach(i => { //for local api
            responseData.record.forEach(i => { //for jsonbin api
              imglink[j] = i.IMAGE;
              urllink[j] = i.URL;
              j +=1;
          });
          setImages(imglink);
          setUrls(urllink);
      })
       .catch(error => {
        _debug?console.log("Result=" + error):null;
     });
  }

  const banner_place_holder = [
  //place holder when network issue
    "https://mmpro.vn/media/mageplaza/bannerslider/banner/image/b/a/banner_banh_trung_thu-01_1.jpg",
    //require('../assets/mcard.jpg'),
  ];
  const handleImgOnPress = (idx) => {
    
    navigation.navigate("MyWebComponent", { url:urls.length>0?urls[idx]:'https://mmvietnam.com'});

    //for testing
    // switch (idx) {
    //   case 0:
    //     navigation.navigate("MyWebComponent", { url:'https://mmvietnam.com/an-pham-khuyen-mai/'});
    //     break;       
    // }

  }
  return (
  <SafeAreaView style={{flex: 1}}>

      {/* <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" style={styles.image}> */}
      <TopBar/>  

      <View style={{paddingTop:1}}>
          {/* <Text style={styles.title_text}></Text> */}
          <SliderBox images={images.length>0?images:banner_place_holder} 
          autoplay = {true}
          circleLoop = {true}
          sliderBoxHeight={168} //168
          dotColor="#FF0000"
          inactiveDotColor="#90A4AE"
          onCurrentImagePressed={index => handleImgOnPress(index)}
          //resizeMode={'stretch'} 
          //resizeMode={'contain'}
          />    
       </View>
      <View style={{height:'100%', with:'100%'}}>
       <TopSales />
      </View>
      {/* </ImageBackground> */}

      </SafeAreaView>
    );
  }
  

