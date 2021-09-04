import {Ionicons} from 'react-native-vector-icons';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import Product from './product';
import { useFocusEffect } from '@react-navigation/native';
import TopBar from './topBar';
import styles from '../styles/styles.js';

const PriceChecker = ({ navigation, route }) => {

 const [text,setText] = useState('');
 const [id,setId] = useState('');
 const [name,setName] = useState('');
 const [price,setPrice] = useState('');
 const [vat,setVat] = useState('');
 const [suppCode,setSuppCode] = useState('');
 const [suppName,setSuppName] = useState('');
 const [mmun,setMmun] = useState('');
 const [unit,setUnit] = useState('');
 const [Scanned,setScanned] = useState('');
 const [clear,setClear] = useState(true);

 useFocusEffect(

  React.useCallback(() => {

    // Do something when the screen is focused

      if (route.params && route.params.BarCode !== Scanned && clear) {
        setScanned(route.params?.BarCode??''); 
        setText(route.params?.BarCode??'');
        searchArticlebyEan(route.params?.BarCode??Scanned);
        //alert(route.params?.BarCode??'');
      }
     return () => {
       // Do something when the screen is unfocused
       //SetClear(false);
     };
  }, [{navigation, route}])
);


// useEffect(()=>{

//   if (clear && Scanned) {  
//   searchArticlebyEan(Scanned);
//   }
//   return () => {
//     // Do something to prevent memory leak;
//     setClear(false)
//      };
// }, [{navigation, route}]
// );
const inputText = (text) => {
  if (text == '') {clearText();}
  setText(text);
}

const clearText = () => {
  setText('');
  setScanned('');
  setClear(false);
}

const gotoSanner = (_stats) => {
  setClear(_stats);
 // navigation.navigate('Go');
  navigation.navigate('Scanner');

}
const searchArticlebyEan = (text) =>{

    console.log("Searching :" + text);
     
    if (!isNaN(text) && text !== '') {

    setScanned(text);

    //const url = 'http://192.168.1.11:8082/Article?id=' + text;
    const url = 'http://172.26.24.150:8082/Article?id=' + text;
    fetch(url,{
      mode: 'uat', 
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncmFudGVkIjoic3R1ZmYiLCJpYXQiOjE2MjkxODMxMzR9.otxK5YQhaB4p--Fal85qdGFwo2n0vtIQBS20P0l1-dA',
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        try{
            setId(responseData[0].V_ARTNO);
            setName(responseData[0].V_ALIBL);
            setPrice(responseData[0].V_PRICE_PERM);
            setVat(responseData[0].V_VRATE);
            setSuppCode(responseData[0].V_CNUF);
            setSuppName(responseData[0].V_FIBL);
            setMmun(responseData[0].V_MMUN_WEIGHT);
            setUnit(responseData[0].V_MMUN_UNIT);
            console.log("Result=" + responseData[0].V_ARTNO);

        } catch(err) {
            setId('');
            setText('API error');
            console.log("Result=" + "API error");
        }  
      })
       .catch(error => {
        setId('');
        setText('Connection error');
        console.log("Result=" + error);

     });
    } //else if (text === '') {setScanned(''); setClear(true);}
  }

return (
// MAIN EVENTS HERE!!
    <ScrollView> 
      <TopBar/>
        <View style={styles.headerContainer}>
                <View style={styles.inputContainer}>
                <Ionicons name="search-outline" size={32} color = {(text?"#2592E5":"#e8e8e8")}
                onPress={() => searchArticlebyEan(text)}/>

                <TextInput
                    multiline={false}
                    onChangeText={(text) => inputText(text)}
                    value={text}
                    underlineColorAndroid="transparent"
                    placeholder="Type a barcode or tab to scan"
                    style={{fontSize: 18, marginLeft:16}}
                    onSubmitEditing={() => searchArticlebyEan(text)}
                    blurOnSubmit={true}
                />

                </View> 
    
                <View style={styles.cancelContainer}>
                  <Ionicons name= {(text?"ios-remove-outline":"qr-code-outline")} size={26} color ="#ffffff" onPress={() => (text?clearText():gotoSanner(true))}/>
                </View>
                
        </View>

        {/* <Image
            source={{ uri: 'https://storage.googleapis.com/mm-online-bucket/ecommerce-website/uploads/media/mail2117.jpg' }}
            style={{ width: '100%', height: 222 }}
        /> */}
        {/* <Text> {Scanned} </Text> */}
    {/* Product information */}
        <Product text={text} 
                id={id} 
                name={name} 
                price={price}
                vat={vat} 
                suppCode={suppCode} 
                suppName={suppName}      
                mmun={mmun}   
                unit={unit}                                                   
        />
        {/* End product information */}
        {/* <View style={{paddingTop:20}}>
        <Button title ="SCAN NEXT ITEM" 
               // color = "red"
                onPress={() => gotoSanner(true)}/>
        </View> */}
    </ScrollView>
    );
}

export default PriceChecker;