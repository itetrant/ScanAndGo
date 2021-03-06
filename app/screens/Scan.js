import * as React from 'react';
import Search from '../components/searchBar';
import Scanner from '../components/scanner';
import { createStackNavigator } from '@react-navigation/stack';

function Scan() {
    const Stack = createStackNavigator();
    return (
      
      <Stack.Navigator //screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Search" options={{headerShown: false}} component={Search}        
        />
        <Stack.Screen name="Scanner" component={Scanner} 
        />
      </Stack.Navigator>
    );
  }

  export default Scan;