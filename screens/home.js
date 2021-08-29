import * as React from 'react';
import { Text, ImageBackground,StyleSheet,ScrollView, SafeAreaView, View} from 'react-native';
import { SliderBox  } from 'react-native-image-slider-box';
import TopSales from './topSales';
export default function HomeScreen() {

    const images = [
  
      require('../assets/song-khoe.jpg'),
      require('../assets/uu-dai.jpg'),
      require('../assets/Momo.jpg'),
      // require('./assets/tap-hoa.jpg'),
  
    ];
  
    return (
  <SafeAreaView style={{flex: 1}}>

      <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" style={styles.image}>
        
      <View style={{paddingTop:1}}>
          {/* <Text style={styles.title_text}></Text> */}
          <SliderBox images={images} 
          autoplay = {true}
          circleLoop = {true}
          sliderBoxHeight={268}
          dotColor="#FF0000"
          inactiveDotColor="#90A4AE"
          />    
       <Text style={styles.title_text}>Top sales</Text>
       </View>

       <TopSales />

      </ImageBackground>

      </SafeAreaView>
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
    title_text: {
        color: "black",
        fontFamily:"",
        fontSize: 18,
        lineHeight: 36,
        fontWeight: "bold",
        textAlign: "left",
        marginLeft:10,
        backgroundColor: 'rgba(240, 240, 240, 0.9)',
      } ,
      
      itemSeparatorStyle: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#c5c6c6',
      },

  });

