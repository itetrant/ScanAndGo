// Scroll to a Specific Item in ScrollView List View
// https://aboutreact.com/scroll_to_a_specific_item_in_scrollview_list_view/
// import all the components we are going to use
import {MaterialIcons, AntDesign} from 'react-native-vector-icons';
import React from 'react';
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
      <View style={styles.container}>
    
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

const styles = StyleSheet.create({
  container: {
     flex:1,
     backgroundColor:'#e9e7e2'// 'rgba(240, 240, 240, 0.9)', //'white',// 
  },
  TotalLine: {
    //marginBottom: 5,
    padding:10,
    backgroundColor: '#f2f0eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLineHead: {
    //margin: 5,
    padding:5,
    //lineHeight:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: '#f8f7f5',
  },
  itemLineDetail: {
    flexDirection: 'row',
    justifyContent:'space-between',
    margin: 2,
    padding:2,
    alignItems:'center',
    //backgroundColor: '#fbfbfa',
  },
  itemContainer: {
    marginTop: 10,
    margin: 5,
    padding:2,
    backgroundColor: 'white', //#fbfbfa',
    borderRadius:10,
    //height:100,
    //marginTop:10,
  },
  itemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#c5c6c6',
  },
});
