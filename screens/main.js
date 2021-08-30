import * as React from 'react';
import HomeScreen from './home';
import MyWebComponent from './webView';
import { createStackNavigator } from '@react-navigation/stack';

function Main() {
    const Stack = createStackNavigator();
    return (
      
      <Stack.Navigator screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen}        
        />
        <Stack.Screen name="MyWebComponent" component={MyWebComponent} 
        />
      </Stack.Navigator>
    );
  }

  export default Main;