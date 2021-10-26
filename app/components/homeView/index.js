//homeView
import React, { useState,useEffect } from 'react';
import { Text, SafeAreaView, View} from 'react-native';
import { SliderBox  } from 'react-native-image-slider-box';
import TopSales from '../topSales';
import TopBar from '../topBar';
import * as APIs from '../../constants/Config';
// const wait = (timeout) => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// }

export default function HomeScreen({navigation}) {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const _debug = APIs.DEBUG;  
  useEffect(() => {
    //wait(1000).then(() => getBannerlist());
    getBannerlist(); 
  }, []);

  const getBannerlist=()=>{

    var imglink=[];
    var urllink=[];
    var j = 0;
    fetch(APIs.API_Banner_Url,{
      mode: 'uat', 
      headers: {
        'X-Master-Key':APIs.API_MasterKey,
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
    APIs.API_Banner_placeholder,
    //require('../assets/mcard.jpg'),
  ];
  const handleImgOnPress = (idx) => {
    
    navigation.navigate("WebScreen", { url:urls.length>0?urls[idx]:APIs.Banner_Error});

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
  

