// Scroll to a Specific Item in ScrollView List View
// https://aboutreact.com/scroll_to_a_specific_item_in_scrollview_list_view/
// import all the components we are going to use
import {AntDesign} from 'react-native-vector-icons';
import React, {useState, useEffect, Component} from 'react';
import { useDispatch, useStore } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';

function Cart() {
  const [cartDataSource, setCartDataSource] = useState([]);
  const [dataSourceCords, setDataSourceCords] = useState([]);

  const store = useStore();
  const cart = store.getState().items;
  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = () => {
  //   //Service to get the data from the server to render
  //   setDataSource[{
  //     V_ARCCODE: "376268",
  //     V_ARTNO: "376268",
  //     V_ALIBL: "QUAN D.PHUC JEAN DAI NAM",
  //     V_VRATE: 10,
  //     V_PRICE_PERM: 341000,
  //     V_MMUN_WEIGHT: 1,
  //     V_MMUN_UNIT: "CAI",
  //     V_ROW:1,
  //     Qty: 1
  //     }];

  // };
const dataSource = [{
  V_ARCCODE: "376270",
  V_ARTNO: "376270",
  V_ALIBL: "QUAN D.PHUC JEAN DAI NAM-S30",
  V_VRATE: 10,
  V_PRICE_PERM: 341000,
  V_MMUN_WEIGHT: 1,
  V_MMUN_UNIT: "CAI",
  V_ROW:1,
  Qty: 1
  },
  {V_ARCCODE: "376271",
  V_ARTNO: "376271",
  V_ALIBL: "QUAN D.PHUC JEAN DAI NAM-S30",
  V_VRATE: 10,
  V_PRICE_PERM: 341000,
  V_MMUN_WEIGHT: 1,
  V_MMUN_UNIT: "CAI",
  V_ROW:1,
  Qty: 1
  }
];

  const dispatch = useDispatch();
  function handleButton (item, act){

        dispatch({ id: item, type: act})

      }  

  const ItemView = (item, key) => {
    return (
      // Flat List Item
      <View style={styles.itemContainer}
        key={key}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[key] = layout.y;
          setDataSourceCords(dataSourceCords);
          //Debug
          // console.log(dataSourceCords);

        }}>

        <Text
          style={styles.itemLine}>
           Item {item.V_ROW} - {item.V_ALIBL}
        </Text>

        <View style={styles.itemLineIcon} >
        
            <Text style={styles.itemLine}>
              Price: {item.V_PRICE_PERM}
            </Text>

            <Text style={styles.itemLine}>
             Qty: {item.Qty}  {item.V_MMUN_UNIT}
            </Text>

            <Text style={styles.itemLine}>
             Total: {item.V_PRICE_PERM}
            </Text>

        </View>   

        <View style={styles.itemLineIcon} >  
            <AntDesign //MaterialIcons  
              name= "minus" /*"keyboard-arrow-right" color = "#2592E5"*/ color = "#ff0000" size={20} onPress={() => handleButton(item,'DOWN')}/>
              <AntDesign //MaterialIcons  
              name= "plus" /*"keyboard-arrow-right" color = "#2592E5"*/ color = "#2592E5" size={20} onPress={() => handleButton(item,'UP')}/>
              <AntDesign //MaterialIcons  
              name= "delete" /*"keyboard-arrow-right" color = "#2592E5"*/ color = "#000000" size={20} onPress={() => handleButton(item,'REMOVE')}/>
        </View>

      </View>
    );
  };

  return (
   <View style={styles.container}> 
  
      {/* <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" style={styles.image}> */}

       {/* {dataSource.map(ItemView)} */}
       {cart.map(ItemView)}

       {/* </ImageBackground> */}

     </View> 
    );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
     flex:1,
     backgroundColor: 'rgba(240, 240, 240, 0.9)', //'white',// 
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  itemLine: {
    margin: 5,
    lineHeight:20,
    color:'#2592E5',
    //textAlign:'center'
  },
  itemLineIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,
    lineHeight:40,
  },
  itemContainer: {
    //padding: 10,
    backgroundColor: '#ffffff',
    borderRadius:10,
    height:100,
    margin:10,
  },
  itemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#c5c6c6',
  },
});


