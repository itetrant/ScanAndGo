import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import { useDispatch } from 'react-redux';
const Scanner = ({ navigation }) => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text,setText] = useState('Move the camera to barcode');
  const dispatch = useDispatch();
  function handleChange (_act,_ean){
        dispatch({ type: _act, ean:_ean})
      }  

  const askForCameraPermission = () => {
	  (async () => {
		  const {status} = await BarCodeScanner.requestPermissionsAsync();
		  setHasPermission(status === 'granted');
	  })()
  }
  
  //request for permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {

    setText(data);
    // console.log('Type: ' + type + '\nData: ' + data);

    handleChange('SCANNED', data);
    navigation.navigate('Search', { BarCode:data});
    setScanned(false);
  };
  
//check permission

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
      <Text>Request for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{margin: 10}}>No access to camera</Text>
        <Button onPress={() => askForCameraPermission()}
        title={'Allow camera'}
        />
      </View>
    );
  }


  return (
    <View style={{flex: 1}}>
      {/* <View style = {styles.headerContainer}>
        <Text onPress={()=>navigation.goBack()}> {'< Back'} </Text>
      </View> */}
      <View style={{height: '100%', width: '100%'}}>
      {/* <View style={styles.barcodebox}> */}
        <BarCodeScanner //style={{height: '100%', width: '100%'}} 
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.container]}
          >
          <BarcodeMask edgeColor="#ff0000" showAnimatedLine/>
          {/* {scanned && <FontAwesome name="qrcode" size={34} color ="#fff" onPress={()=>navigation.navigate('PriceChecker', { BarCode: text})} color='tomato'/>} */}
          </BarCodeScanner>
      </View>  

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop:0,
  },

  headerContainer: {
    alignSelf: 'stretch',
    height: 48,
    flexDirection: 'row', // row
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 28,
  },

});

export default Scanner;