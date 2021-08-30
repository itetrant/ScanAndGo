import * as React from 'react';
import PriceChecker from './priceChecker';
import Scanner from './scanner';
import { createStackNavigator } from '@react-navigation/stack';

function Scan() {
    const Stack = createStackNavigator();
    return (
      
      <Stack.Navigator //screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Scan a product" options={{headerShown: false}} component={PriceChecker}        
        />
        <Stack.Screen name="Scanner" component={Scanner} 
        />
      </Stack.Navigator>
    );
  }

  export default Scan;