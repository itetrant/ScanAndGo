// Scroll to a Specific Item in ScrollView List View
// https://aboutreact.com/scroll_to_a_specific_item_in_scrollview_list_view/

import React, {useState, useEffect} from 'react';
import { RefreshControl } from 'react-native';
import TopBar from './topBar';
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

const Cart = () => {
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
    //const url = 'https://jsonplaceholder.typicode.com/posts?_page=' + p;
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
      <View
        key={key}
        style={styles.item}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[key] = layout.y;
          setDataSourceCords(dataSourceCords);
          // console.log(dataSourceCords);
          // console.log('height:', layout.height);
          // console.log('width:', layout.width);
          // console.log('x:', layout.x);
          // console.log('y:', layout.y);
        }}>

          {/* <Text
          style={styles.itemStyle}
          onPress={() => getItem(item)}>
           {item.id}
        </Text>

        <Text
          style={styles.itemStyle}
          onPress={() => getItem(item)}>
           {item.title}
        </Text> */}
        <Text
          style={styles.itemStyle}
          onPress={() => getItem(item)}>
           {item.V_ROW}
        </Text>

        <Text
          style={styles.itemStyle}
          onPress={() => getItem(item)}>
           {item.V_ALIBL}
        </Text>

        {/* <Ionicons name="ios-arrow-forward" size={18} color = "#2592E5" /> */}
        <ItemSeparatorView />
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={styles.itemSeparatorStyle} />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    //alert('Id : ' + item.id + ' Name : ' + item.title);
    alert('Id : ' + item.V_ROW + ' Name : ' + item.V_ALIBL);
    // "ARCCODE": "376268",
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
      
        <View style={styles.mainContainer}>
          
        </View>
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

export default Cart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
    width:"100%",
    height:100,
    borderRadius:10,
  },
  itemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  mainContainer: {
    flexDirection: 'row',
    //backgroundColor: '#1e73be',
    padding: 5,
  },
});


