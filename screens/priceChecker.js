import {Ionicons} from 'react-native-vector-icons';
import React, { useState,useEffect } from 'react';
import { View, TextInput,  ScrollView } from 'react-native';
import Product from './product';
// import { useFocusEffect } from '@react-navigation/native';
import { connect,useStore,useDispatch } from 'react-redux';
import TopBar from './topBar';
import styles from '../styles/styles.js';

const PriceChecker = ({ navigation}) => {

 const [text,setText] = useState('');
 const [id,setId] = useState('');
 const [name,setName] = useState('');
 const [price,setPrice] = useState(0);
 const [vat,setVat] = useState(0);
 const [suppCode,setSuppCode] = useState(0);
 const [suppName,setSuppName] = useState('');
 const [mmun,setMmun] = useState(1);
 const [unit,setUnit] = useState('CAI');
 const [imgurl,setImgurl] = useState(null);

 const store = useStore();
 const site = store.getState().site;
 const bar = store.getState().barcode;
 const dispatch = useDispatch();
 function handleChange (_act,_ean){
       dispatch({ type: _act, ean:_ean})
     }  

useEffect(() => {
  setText(bar);
  searchArticlebyEan(bar,site);
}, [bar]);


const inputText = (text) => {
  if (text == '') {clearText();}
  setText(text); 
}

const clearText = () => {
  setText('');
  setId('');
  setName('');
  setPrice(0);
  setVat(0);
  setSuppCode(0);
  setSuppName('');
  setMmun(1);
  setUnit('CAI');
  setImgurl(null);
}

const gotoSanner = (_stats) => {
  //setClear(_stats);
 // navigation.navigate('Go');
  navigation.navigate('Scanner');

}
const searchArticlebyEan = (ean,site) =>{

    console.log("Searching EAN:" + ean + " at store:" + site );
     
    if (!isNaN(ean) && ean !== '') {
    //setScanned(ean);
      //const url = 'http://192.168.1.11:8082/Article?id=' + ean;
    const url = 'http://172.26.24.150:8082/Article?id=' + ean + '&site=' + site;
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
            setImgurl(responseData[0].IMGURL??'https://mmpro.vn/media/catalog/product/placeholder/default/LOGO_MM_200x300-01_1.png');
            console.log("response=" + responseData[0].V_ARTNO);

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
                onPress={() => handleChange('SCANNED',text)}/>

                <TextInput
                    multiline={false}
                    onChangeText={(text) => inputText(text)}
                    value={text}
                    underlineColorAndroid="transparent"
                    placeholder="Type a barcode or tab QR to scan ->"
                    style={{fontSize: 18, marginLeft:16}}
                    onSubmitEditing={() => handleChange('SCANNED',text)}
                    blurOnSubmit={true}
                />

                </View> 
    
                <View style={styles.cancelContainer}>
                  <Ionicons name= {(text?"ios-remove-outline":"qr-code-outline")} size={26} color ="#ffffff" onPress={() => (text?clearText():gotoSanner(true))}/>
                </View>
                
        </View>

        {/* <Text> {Scanned} </Text> */}
    {/* Product information */}
        <Product text={text} 
                id={id} 
                name={name??'NOT FOUND'} 
                price={price}
                vat={vat} 
                suppCode={suppCode} 
                suppName={suppName}      
                mmun={mmun}   
                unit={unit} 
                imgurl={name?imgurl??null:null}
        />
        {/* End product information */}
        {/* <View style={{paddingTop:30, width:'50%',height:'100%',alignSelf:'center' }}>
            <Button title ="SCAN NEXT"  // color = "red"
                onPress={() => gotoSanner(true)}/>
        </View> */}
        {/* <View style={{paddingTop:30, alignSelf:'center' }}>
            <Ionicons name= "qr-code-outline" size={(text?68:0)} color = {(text?"#ff0000":"#e8e8e8")} onPress={() => gotoSanner(true)}/>
        </View> */}
    </ScrollView>
    );
}

function mapStateToProps(state) {
  return { 
      site: state.site,
      bar: state.barcode, 
  };
}
export default connect(mapStateToProps)(PriceChecker);

// export default PriceChecker;