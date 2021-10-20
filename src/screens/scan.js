import * as React from 'react';
import PriceChecker from '../components/priceChecker';
import Scanner from '../components/scanner';
import { createStackNavigator } from '@react-navigation/stack';

function Scan() {
    const Stack = createStackNavigator();
    return (
      
      <Stack.Navigator //screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Search" options={{headerShown: false}} component={PriceChecker}        
        />
        <Stack.Screen name="Scanner" component={Scanner} 
        />
      </Stack.Navigator>
    );
  }

  export default Scan;