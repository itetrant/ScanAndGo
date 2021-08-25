import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
const Scanner = ({ navigation }) => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text,setText] = useState('Move the camera to barcode');

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
    //setScanned(false);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	  setText(data);
    console.log('Type: ' + type + '\nData: ' + data);
    //navigation.navigate('Scan', { BarCode:data}); //Tab
    //Stack
     navigation.navigate('Scan a product', { BarCode:data});
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

      {/* <View style={styles.barcodebox}> */}
        <BarCodeScanner style={{height: 600, width: '100%',marginTop:0}} 
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.container]}
          >
          <BarcodeMask edgeColor="#ff0000" showAnimatedLine/>
          {/* {scanned && <FontAwesome name="qrcode" size={34} color ="#fff" onPress={()=>navigation.navigate('PriceChecker', { BarCode: text})} color='tomato'/>} */}
          </BarCodeScanner>
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
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 222,
    width: '100%',
    borderRadius: 0,
    backgroundColor: 'tomato',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 6,
    backgroundColor: '#C70039',
  },

  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    flex: 1,
    marginTop:2,
    alignItems: 'center',
    marginBottom: 2,
  },

  cartContainer: {
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

});

export default Scanner;