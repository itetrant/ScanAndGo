import React, 
{ 
   //Component, useState, 
    useRef 
} from 'react';

import { WebView } from 'react-native-webview';
import {View, Text, ActivityIndicator} from 'react-native';
import Styles from '../styles/Styles';
// ...
// class WebScreen extends Component {
//     constructor(props){
//         super(props);
//     }  

const WebScreen = ({ navigation,route }) => {    

    // const [canGoBack, setCanGoBack] = useState(false)
    // const [canGoForward, setCanGoForward] = useState(false)
    // const [currentUrl, setCurrentUrl] = useState('')
    const webviewRef = useRef(null);

    const backButtonHandler = () => {
        if (webviewRef.current) webviewRef.current.goBack()
      }
      
    // const  frontButtonHandler = () => {
    //     if (webviewRef.current) webviewRef.current.goForward()
    //   }

    return ( 
        <View style = {{flex:1, paddingTop:30}}>
            <View style={Styles.itemLineHead}>
                <Text onPress={()=>backButtonHandler()} style={{marginBottom:5,marginTop:5,fontSize:16}}> 
                    {'< Back'}
                </Text> 
                <Text style={{marginTop:5}}> 
                    {route.params?.url?route.params.url.substring(0,35):'https://mmvietnam.com/'}
                </Text>
                <Text  onPress={()=> navigation.goBack()} style={{marginBottom:5,marginTop:5,fontSize:16}}>
                    {'Close'}
                </Text>
            </View>

            <View style={Styles.itemSeparatorStyle}></View>
            
            <WebView
            originWhitelist={['*']}
            source={{ uri: route.params?.url?route.params.url:'https://mmvietnam.com/'}} 
            renderError={(errorName) => <Error name={errorName} />}
            renderLoading={() => (<ActivityIndicator color='black' size='large' style={{flex:1}}/>)}
            ref={webviewRef}
            // onNavigationStateChange={navState => {
            // setCanGoBack(navState.canGoBack)
            // setCanGoForward(navState.canGoForward)
            // setCurrentUrl(navState.url)
            // }}                            
            />

        </View>    
        )

}
export default WebScreen;