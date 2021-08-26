import * as React from 'react';
import { Text, ImageBackground,StyleSheet,ScrollView} from 'react-native';
import { SliderBox  } from 'react-native-image-slider-box';
import TopBar from './topBar';
export default function HomeScreen() {

    const images = [
  
      require('../assets/song-khoe.jpg'),
      require('../assets/uu-dai.jpg'),
      require('../assets/Momo.jpg'),
      // require('./assets/tap-hoa.jpg'),
  
    ];
  
    return (
      <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" style={styles.image}>
        <ScrollView>
        <TopBar/> 
          <Text style={styles.title_text}>HOT PROMOTION</Text>
          <SliderBox images={images} 
          autoplay = {true}
          circleLoop = {true}
          sliderBoxHeight={268}
          dotColor="#FF0000"
          inactiveDotColor="#90A4AE"
          />    
       <Text style={styles.title_text}>TOP SALES</Text>
  
      </ScrollView>
      </ImageBackground>
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
        color: "red",
        fontFamily:"",
        fontSize: 18,
        lineHeight: 36,
        fontWeight: "normal",
        textAlign: "left",
        backgroundColor: "#F2F4F4"
      }    
  });