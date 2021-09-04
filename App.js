
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Ionicons} from 'react-native-vector-icons';
import Cart from './screens/cart';
import Scan from './screens/scan';
import Location from './screens/location';
import Home from './screens/home';


// test
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CartItems from './reducers/cartItems';
const store = createStore(CartItems);

// End test

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
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

