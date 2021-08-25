import * as React from 'react';
import { Text, View, ImageBackground , StyleSheet,ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {MaterialCommunityIcons, Ionicons} from 'react-native-vector-icons';
import { StatusBar } from 'expo-status-bar';
import Cart from './screens/cart';
import TopBar from './screens/topBar';
import Scan from './screens/scan';
//slider box NEW
import { SliderBox  } from 'react-native-image-slider-box';
function HomeScreen({ navigation , route}) {
  
  const images = [

    require('./assets/song-khoe.jpg'),
    require('./assets/uu-dai.jpg'),
    require('./assets/Momo.jpg'),
    require('./assets/tap-hoa.jpg'),

  ];

  return (
    <ScrollView> 
      <TopBar/> 

        <SliderBox images={images} 
        autoplay = {true}
        circleLoop = {true}
        sliderBoxHeight={268}
        dotColor="#FF0000"
        inactiveDotColor="#90A4AE"
        />    
     
    </ScrollView>
  );
}

function Location({ navigation, route }) {
  return (
    <View style={styles.container}> 
      <TopBar/> 
      <ImageBackground source={require('./assets/bg.png')} resizeMode="cover" style={styles.image}>
            <View >
              <Text style={{fontWeight:'bold',fontSize:16, textAlign:'center'}}>
                {route?.params?.site ? `Store Id:${route.params.site}`: 'Store Id: 10010'}
              </Text>
              <Text style={{fontWeight:'bold',fontSize:20, textAlign:'center'}}>
              {route?.params?.site ? `Name:${route.params.site}`: 'Name: MM Mega An Phu'}
            </Text>
          </View>
       </ImageBackground>
      
      
    </View>   
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar/>
      {/* <TopBar/> */}
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}/>
        <Tab.Screen name="Location" component={Location} 
        options={{
            tabBarLabel: 'Location',
            tabBarIcon: ({ color }) => (
              <Ionicons name="location-outline" color={color} size={26} />
            ),
          }}/>
        <Tab.Screen name="Scan" component={Scan} 
        options={{
            tabBarLabel: 'Scan',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="qrcode" color={color} size={26} />
            ),
          }}/>
        <Tab.Screen name="Cart" component={Cart} 
        options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cart-outline" color={color} size={26} />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
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
    //backgroundColor: "#0000000"
  }
});