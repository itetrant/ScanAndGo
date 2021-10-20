import * as React from 'react';
import HomeScreen from '../components/homeView';
import WebScreen from '../components/webView';
import { createStackNavigator } from '@react-navigation/stack';

function Home() {
    const Stack = createStackNavigator();
    return (
      
      <Stack.Navigator screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen}        
        />
        <Stack.Screen name="WebScreen" component={WebScreen} 
        />
      </Stack.Navigator>
    );
  }

  export default Home;