import {AntDesign} from 'react-native-vector-icons';
import React from 'react';
import styles from '../styles/styles.js';
import { useDispatch, useStore, connect } from 'react-redux';
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  Alert
} from 'react-native';
import TopBar from './topBar';
const Cart = () => {
  //const [dataSource, setDataSource] = useState([]);
  //const [dataSourceCords, setDataSourceCords] = useState([]);
  //const [ref, setRef] = useState(null);
  const store = useStore();
  const dataSource = store.getState().items;
  const cartQty = store.getState().TotQty;
  const cartAmt = store.getState().TotAmount;
  const dispatch = useDispatch();
  function handleRemove (item, act){
        dispatch({ id: item, type: act})
      }  

  function handleOrder (_id,_name,_price,_unit, _qty, act){
      if (_id !== 'undefined' && _id !=='') {
        dispatch({id: _id, name:_name, price:_price, unit:_unit, qty:_qty ,type: act});
        //alert('Item: ' + _name + ' added to cart');
      }
  }  
  const ItemView = (item, key) => {
    return (
      // Flat List Item
      <View style={styles.itemContainer}
        key={key}
        // onLayout={(event) => {
        //   const layout = event.nativeEvent.layout;
        //   dataSourceCords[key] = layout.y;
        //   setDataSourceCords(dataSourceCords);
        //   //Debug
        //   // console.log(dataSourceCords);
        // }}
        >
        {/* <View style={styles.itemSeparatorStyle}/> */}

        <View style={styles.itemLineHead}>
        <Text style = {{color:'#2592E5'}}
          
          onPress={() => getItem(item)}>
           Item: {item.V_ARTNO} - {item.V_ALIBL}
        </Text>
 
        <AntDesign //MaterialIcons  
              name= "delete" color = "#000000" size={22}  onPress={() => handleRemove(item.V_ARTNO,'REMOVE')}
              />
        </View>
        
        <View style={styles.itemSeparatorStyle}/>

        <View style={styles.itemLineDetail}>
          <Text>
            Quantity:  
          </Text>  
  
           <Button title="  -  " onPress={() => (item.Qty>1?handleOrder(item.V_ARTNO,item.V_ALIBL,item.V_PRICE_PERM,item.V_MMUN_UNIT,1,'DOWN'):null)}/>          
           <Text>
            {item.Qty} 
          </Text>  
           <Button title="  +  " onPress={() => handleOrder(item.V_ARTNO,item.V_ALIBL,item.V_PRICE_PERM,item.V_MMUN_UNIT,1,'UP')}/>
           
           <Text
            //style={styles.itemLine}
            onPress={() => getItem(item)}>
           {item.V_MMUN_UNIT}   
          </Text> 
{/* Spaces */}
         <Text style={{paddingRight:'30%'}}></Text>   
        </View>
        <View style={styles.itemSeparatorStyle}/>
        <View style={styles.itemLineDetail} >
        
            <Text
              onPress={() => getItem(item)}>
              Price: {item.V_PRICE_PERM} 
            </Text>

            <Text
              //style={styles.itemLine}
              onPress={() => getItem(item)}>
                 Amt: {item.Amt}
            </Text>

            
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
          text: "OK",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Remove item", onPress: () => {console.log("Remove Pressed") ; handleRemove(id,'REMOVE');}}
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

        <ScrollView >

            {dataSource.map(ItemView)}
       
         </ScrollView>
      </View>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return { 
      myValue: state.value,
      dataSource: state.items
  };
}
export default connect(mapStateToProps)(Cart);

//export default Cart;