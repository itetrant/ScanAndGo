

// import React, { Component } from 'react';
// import {StyleSheet} from 'react-native';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import Demo from './store/demo';
// import CartItems from './reducers/cartItems';
// import Reducer from './reducers/reducer';

// const store = createStore(CartItems);

// export default function App() {

//     return (
//       <Provider store={store}>
//         <Demo />
//       </Provider>
//     );
// }

// END TEST

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Ionicons} from 'react-native-vector-icons';
import { StatusBar } from 'expo-status-bar';
import Cart from './screens/cart';
import Scan from './screens/scan';
import Location from './screens/location';
import HomeScreen from './screens/home';

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
            <Ionicons name="home" color={color} size={26} />
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
              <Ionicons name="qr-code-outline" color={color} size={26} />
            ),
          }}/>
        <Tab.Screen name="Cart" component={Cart} 
        options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-cart-outline" color={color} size={26} />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

