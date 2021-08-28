// Scroll to a Specific Item in ScrollView List View
// https://aboutreact.com/scroll_to_a_specific_item_in_scrollview_list_view/
import {AntDesign,MaterialIcons} from 'react-native-vector-icons';
import React, {useState, useEffect} from 'react';
import { RefreshControl, Alert } from 'react-native';

// import all the components we are going to use
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

// const wait = (timeout) => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// }

const TopSales = () => {
  const [dataSource, setDataSource] = useState([]);
  //const [newDataSource, setNewDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  // const [ref, setRef] = useState(null);

  const [refreshing, setRefreshing] = React.useState(true);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setPage(page + 1);
    setDataSource([]); //clear old data
    getData(page); 
    // wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    getData(page);
  }, []);

  const getData = (p) => {
    //Service to get the data from the server to render
    console.log('Load page:', p);
    const url = 'http://172.26.24.150:8082/Articles?size=10&page=' + p;
    fetch(url,{
      mode: 'uat', 
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncmFudGVkIjoic3R1ZmYiLCJpYXQiOjE2MjkxODMxMzR9.otxK5YQhaB4p--Fal85qdGFwo2n0vtIQBS20P0l1-dA',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setDataSource(responseJson);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
          style={styles.itemLine}
          onPress={() => getItem(item)}>
           Top {item.V_ROW} - {item.V_ALIBL}
        </Text>

        <View style={styles.itemLineIcon} >
        
            <Text
              onPress={() => getItem(item)}>
              Price: {item.V_PRICE_PERM}
            </Text>

            <Text
              //style={styles.itemLine}
              onPress={() => getItem(item)}>
              Sold: {item.V_MMUN_WEIGHT}  {item.V_MMUN_UNIT}
            </Text>
            <MaterialIcons //MaterialIcons  
              name= "add-shopping-cart" /*"keyboard-arrow-right" color = "#2592E5"*/ color = "#2592E5" size={26} onPress={() => getItem(item)}/>
        </View>   

      </View>
    );
  };


  const createTwoButtonAlert = (id,name,price) => {

    let msg = '-Id:' + id + '\n-Name: ' + name + '\n-Price:' + price;
    Alert.alert(
      "Product details",
      msg,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Add to cart", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  const getItem = (item) => {
    // Function for click on an item
    //alert('Id : ' + item.id + ' Name : ' + item.title);
    createTwoButtonAlert(item.ARCCODE,item.V_ALIBL,item.V_PRICE_PERM);
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

      <View style={styles.container}>
    
        {/* List Item as a function */}
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}/>}
            // ref={(ref) => {
            // setRef(ref);
            // }}
          >
            {dataSource.map(ItemView)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TopSales;

const styles = StyleSheet.create({
  container: {
     flex:1,
     backgroundColor: 'rgba(240, 240, 240, 0.9)', //'white',// 
  },
  itemLine: {
    margin: 5,
    lineHeight:40,
    color:'#2592E5',
    //textAlign:'center'
  },
  itemLineIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
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
