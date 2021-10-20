import {MaterialCommunityIcons} from 'react-native-vector-icons';
import React , {useState} from 'react';
import styles from '../styles/styles.js';
import { useDispatch, useStore, connect } from 'react-redux';
import QRCode from 'react-native-qrcode-generator';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Button,
  Alert,
  Dimensions,
  Image
} from 'react-native';
import TopBar from '../components/topBar';
const Cart = () => {
  const _debug = true;
  const [dataSourceCords, setDataSourceCords] = useState([]);
  //const [ref, setRef] = useState(null);
  const store = useStore();
  const dataSource = store.getState().items;
  const cartQty = store.getState().TotQty;
  const cartAmt = store.getState().TotAmount;
  const dispatch = useDispatch();
  function handleRemove (item, act){
        dispatch({ id: item, type: act})
      }  
  const { width, height } = Dimensions.get("window");
  function handleOrder (_id,_name,_price,_unit, _url, _qty, act){
      if (_id !== 'undefined' && _id !=='') {
        dispatch({id: _id, name:_name, price:_price, unit:_unit,imgurl: _url, qty:_qty,type: act});
        //alert('Item: ' + _name + ' added to cart');
      }
  }  
  
  const ItemView = (item, key) => {
    return (
      // Flat List Item
      <View style={styles.cartitemContainer}
        key={key}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[key] = layout.y;
          setDataSourceCords(dataSourceCords);
          //Debug
          // console.log(dataSourceCords);

        }}>

            <View style={styles.TopItemImage}>
              <Image source={{uri:item.IMGURL??'https://mmpro.vn/media/catalog/product/placeholder/default/LOGO_MM_200x300-01_1.png'}}
                                          style={{width:'100%',height:'100%',alignSelf:'center', 
                                          //resizeMode: 'stretch'
                                          resizeMode: 'contain'
                                          }}
              />
            </View>
            
            <View style={styles.itemDetailContainer}>

                <View style={styles.cartItemName} >                                          
                    <Text
                      style={styles.itemName}
                      onPress={() => getItem(item)}>
                      {item.V_ALIBL}
                    </Text>
                </View>    
                {/* line */}
                <View style={styles.itemSeparatorStyle}/> 

                <View style={styles.cartItemLineIcon} >
                
                    <Text
                      onPress={() => getItem(item)}>
                      Price: {item.V_PRICE_PERM}
                    </Text>
                    <Text>
                      Qty:
                    </Text>  
                    <MaterialCommunityIcons //MaterialIcons  
                      name= "minus"  color = "#c5c6c6" size={26}  onPress={() => handleOrder(item.V_ARTNO,item.V_ALIBL,item.V_PRICE_PERM,item.V_MMUN_UNIT,item.IMGURL, 1,'DOWN')}/>       
                    <Text>
                      {item.Qty} 
                    </Text>  
                    
                    {/* <Button title=" + " onPress={() => handleOrder(item.V_ARTNO,item.V_ALIBL,item.V_PRICE_PERM,item.V_MMUN_UNIT,item.IMGURL, 1,'UP')}/> */}
                    <MaterialCommunityIcons //MaterialIcons  
                      name= "plus"  color = "#2592E5" size={26}  onPress={() => handleOrder(item.V_ARTNO,item.V_ALIBL,item.V_PRICE_PERM,item.V_MMUN_UNIT,item.IMGURL, 1,'UP')}/>
                    <Text>
                          {item.V_MMUN_UNIT}   
                    </Text> 

                    <MaterialCommunityIcons //MaterialIcons  
                      name= "cart-remove"  color = "#c5c6c6" size={26}  onPress={() => cartAlert(item.V_ARTNO,item.V_ALIBL,item.V_PRICE_PERM)}/>
                
                </View> 

                <View style={styles.itemSeparatorStyle}/> 

                <View style={styles.cartItemLineIcon} > 
                    <Text >Amount:  </Text>
                    <Text >{item.Amt}</Text>
                    <Text/>
                </View>

            </View>    
      </View>
    );
  };

  const cartAlert = (id,name,price) => {

    let msg = '-Id:' + id + '\n-Name: ' + name + '\n-Price:' + price;
    Alert.alert(
      "Product details",
      msg,
      [
        {
          text: "Cancel",
          onPress: () => _debug?console.log("Cancel Pressed"):null,
          style: "cancel"
        },
        { text: "Remove item", onPress: () => {_debug?console.log("Remove Pressed"):null ; handleRemove(id,'REMOVE');}}
      ]
    );
  }

  const getItem = (item) => {
    // Function for click on an item
    //alert('Id : ' + item.id + ' Name : ' + item.title);
    cartAlert(item.V_ARTNO,item.V_ALIBL,item.V_PRICE_PERM);
   // alert('Barcode : ' + item.ARCCODE + '\nName:' + item.V_ALIBL + '\nPrice:' + item.V_PRICE_PERM + '\nMMUN:' + item.V_MMUN_WEIGHT + '\nUNIT:' + item.V_MMUN_UNIT);
    //     "ARCCODE": "376268",
    //     "V_ARTNO": "376268",
    //     "V_ALIBL": "QUAN D.PHUC JEAN DAI NAM-S30",
    //     "V_VRATE": 10,
    //     "V_CNUF": "26698",
    //     "V_FIBL": "CONG TY TNHH MTV BLUE EXCHANGE - OB",
    //     "V_PRICE_PERM": 341000,
    //     "V_COST_PERM": 300000,
    //     "V_MMUN_WEIGHT": 1,
    //     "V_MMUN_UNIT": "CAI",
    //     "V_ROW": 1
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopBar/>
      <View style={styles.cartcontainer}>
    
      <View style={styles.TotalLine}>
            <Text style={{fontWeight:'bold', fontSize:16}}>Total Qty: {cartQty}</Text>
            <Text style={{fontWeight:'bold', fontSize:16}}>Total Amt: {cartAmt} vnd</Text>
        </View>
        <View style={styles.itemSeparatorStyle}/>

        <ScrollView 
          maximumZoomScale={3}
          minimumZoomScale={0.5}
          zoomScale={1}
          bouncesZoom={true}
        >

            {dataSource.map(ItemView)}

          {/* generate QR for VPOS payment  */}
            <View style={{alignSelf:'center', paddingTop:20}}>
                <QRCode
                  value={cartStr(dataSource,_debug)}
                  size={width*3/5}
                  bgColor='black'
                  fgColor='white'/>
                  <Text style={{alignSelf:'center'}}>Show QR to cashier for payment</Text>
                  <Text style={{alignSelf:'center'}}>Or</Text>
            </View>
          
          <View style={{marginBottom:20, width:width*3/5, alignSelf:'center'}}>
            <Button title="Order & Go"></Button>
            <Text style={{alignSelf:'center'}}>We will deliver to your home</Text>
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

function cartStr (obj,_debug){
  //let str = '[';
  let str = '';
  obj.forEach(i => {
    //str += '{"art":'+i.V_ARTNO + ',"qty":' + i.Qty + "},";
    str += i.V_ARTNO + ':' + i.Qty + "|";
  });
  //str += ']';
  _debug?console.log(str):null;
  return (str);
}

function mapStateToProps(state) {
  return { 
      myValue: state.value,
      dataSource: state.items
  };
}
export default connect(mapStateToProps)(Cart);

//export default Cart;