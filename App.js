
import * as React from 'react';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Ionicons} from 'react-native-vector-icons';
import { Provider } from 'react-redux';

//import { createStore } from 'redux';
//import CartItems from './src/reducers/cartItems';
//const store = createStore(CartItems);
import ScanAndGoStore from './src/stores/scanAndGoStore';
import Stores from './src/stores/stores';

import Cart from './src/screens/cart';
import Scan from './src/screens/scan';
import Location from './src/screens/location';
import Home from './src/screens/home';

const Tab = createMaterialBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0272ba',
    //primary: '#ffff00',
  },
};

export default function App() {
  return (
          <Provider store={ScanAndGoStore}>
                <NavigationContainer theme={MyTheme}>
                  <Tab.Navigator>
                    <Tab.Screen name="Home" component={Home} 
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
         </Provider>
  );
}

