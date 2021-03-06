
import * as React from 'react';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Ionicons} from 'react-native-vector-icons';

import Cart     from '../screens/Cart';
import Scan     from '../screens/Scan';
import Location from '../screens/Location';
import Home     from '../screens/Home';

const Tab = createMaterialBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0272ba',
    //primary: '#ffff00',
  },
};

export default function Navigation() {
  return (
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
  );
}

