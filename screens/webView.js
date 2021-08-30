import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

// ...
// class MyWebComponent extends Component {
//     constructor(props){
//         super(props);
//     }  

const MyWebComponent = ({ route }) => {    

    return ( 
        // <View style={styles.container}>
        <WebView  source={{ uri: route.params?.url?route.params.url:'https://mmpro.vn/'}} />
        // </View>
        )

}
export default MyWebComponent;