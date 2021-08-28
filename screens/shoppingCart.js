import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {Ionicons} from 'react-native-vector-icons';
import HomeScreen from './homeScreen';
import BooksScreen from './booksScreen';
import ElectronicsScreen from './electronicsScreen';
import { Title } from 'react-native-paper';
import { View,Text,Button } from 'react-native';
class ShoppingCart extends React.Component{
    
    render(){
        const Stack = createStackNavigator();
        return(
        <NavigationContainer>
        <Stack.Navigator 
        screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } , headerRight:() => <Button title=""/>}}
        >
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Books" component={BooksScreen} />
            <Stack.Screen name="Electronics" component={ElectronicsScreen} />

        </Stack.Navigator>
        </NavigationContainer>
        )
    }
}

export default ShoppingCart;