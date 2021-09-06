import React, { useState,useEffect } from 'react';
import { Text, SafeAreaView, View} from 'react-native';
import { SliderBox  } from 'react-native-image-slider-box';
import TopSales from './topSales';
import TopBar from './topBar';
import styles from '../styles/styles.js';

export default function HomeScreen({navigation}) {
  const [imgs, setImgs] = useState([]);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    getBannerlist();
  }, []);

  const getBannerlist=()=>{
    const url = 'http://172.26.24.150:8082/getBannerlist';
    var imglink=[];
    var urllink=[];
    var j = 0;
    fetch(url,{
      mode: 'uat', 
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncmFudGVkIjoic3R1ZmYiLCJpYXQiOjE2MjkxODMxMzR9.otxK5YQhaB4p--Fal85qdGFwo2n0vtIQBS20P0l1-dA',
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
          //setImgSource(responseData);
          responseData.forEach(i => {

              imglink[j] = i.IMAGE;
              urllink[j] = i.URL;
              j +=1;

          });

          setImgs(imglink);
          setUrls(urllink);

          console.log('----------------');
          console.log(imgs);
          console.log('----------------');
          console.log(urls);
      })
       .catch(error => {
        console.log("Result=" + error);
     });
  }

  const images = [

    "https://mmvietnam.com/wp-content/uploads/2021/08/mini-web-1024x764.jpg.webp",
    "https://mmpro.vn/media/mageplaza/bannerslider/banner/image/b/a/banner_banh_trung_thu-01_1.jpg",
    "https://storage.googleapis.com/mm-online-bucket/ecommerce-website/uploads/media/Banner-Combo-UF.jpg",
    //require('../assets/mcard.jpg'),

  ];
  const handleImgOnPress = (idx) => {
    
    navigation.navigate("MyWebComponent", { url:urls[idx]});
    // switch (idx) {
    //   case 0:
    //     navigation.navigate("MyWebComponent", { url:'https://mmvietnam.com/an-pham-khuyen-mai/'});
    //     break;
    //   case 1:
    //     navigation.navigate("MyWebComponent", { url:'https://mmpro.vn/event-banh-trung-thu.html'});
    //     break;
    //   case 2:
    //     //Linking.openURL('https://online.mmvietnam.com');
    //     navigation.navigate("MyWebComponent", { url:'https://online.mmvietnam.com/'});
    //     break;   
    //   // case 3:
    //   //   //Linking.openURL('https://mmvietnam.app');
    //   //   navigation.navigate("MyWebComponent", { url:'http://mmvietnam.app'});
    //   //   break;             
    // }

  }
  return (
  <SafeAreaView style={{flex: 1}}>

      {/* <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" style={styles.image}> */}
      <TopBar/>  
      <View style={{paddingTop:1}}>
          {/* <Text style={styles.title_text}></Text> */}
          <SliderBox images={imgs} 
          autoplay = {true}
          circleLoop = {true}
          sliderBoxHeight={160}
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
  

