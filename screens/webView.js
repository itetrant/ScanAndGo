import React, { Component, useState, useRef } from 'react';
import { WebView } from 'react-native-webview';
import {View, Text, ActivityIndicator} from 'react-native';
import TopBar from './topBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';
// ...
// class MyWebComponent extends Component {
//     constructor(props){
//         super(props);
//     }  

const MyWebComponent = ({ navigation,route }) => {    

    const [canGoBack, setCanGoBack] = useState(false)
    const [canGoForward, setCanGoForward] = useState(false)
    const [currentUrl, setCurrentUrl] = useState('')
    const webviewRef = useRef(null);

    const backButtonHandler = () => {
        if (webviewRef.current) webviewRef.current.goBack()
      }
      
    const  frontButtonHandler = () => {
        if (webviewRef.current) webviewRef.current.goForward()
      }

    return ( 
        <View style = {{flex:1, paddingTop:30}}>
            <View style={styles.itemLineHead}>
                <Text onPress={()=>backButtonHandler()} style={{marginBottom:5,marginTop:5,fontSize:16}}> 
                    {'< Back '} 
                </Text> 
                <Text style={{marginBottom:5,marginTop:5}}> 
                    {route.params.url}
                </Text>
                <Text  onPress={()=> navigation.goBack()} style={{marginBottom:5,marginTop:5,fontSize:18}}>
                    {' X '}
                </Text>
            </View>

            <View style={styles.itemSeparatorStyle}></View>
            
            <WebView
            originWhitelist={['*']}
            source={{ uri: route.params?.url?route.params.url:'https://mmpro.vn/'}} 
            renderError={(errorName) => <Error name={errorName} />}
            renderLoading={() => (<ActivityIndicator color='black' size='large' style={{flex:1}}/>)}
            ref={webviewRef}
            onNavigationStateChange={navState => {
            setCanGoBack(navState.canGoBack)
            setCanGoForward(navState.canGoForward)
            setCurrentUrl(navState.url)
            }}                            
            />

        </View>    
        )

}
export default MyWebComponent;