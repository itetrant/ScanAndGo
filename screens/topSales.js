import {MaterialIcons} from 'react-native-vector-icons';
import React, {useState, useEffect, useRef} from 'react';
import { useDispatch,connect } from 'react-redux';
import styles from '../styles/styles.js';

import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  RefreshControl,
  Alert,
  Dimensions
} from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const TopSales = (state) => {

  const [dataSource, setDataSource] = useState([]);
  // const [newDataSource, setNewDataSource] = useState([]);
  const [page, setPage] = useState(1);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const size = 10;
  // const scrollViewRef = useRef();
  const { width, height } = Dimensions.get("window");
  const dispatch = useDispatch();
  function handleButton (_id,_name,_price,_unit, _qty, act){

        dispatch({id: _id, name:_name, price:_price, unit:_unit, qty:_qty, type: act});
        //alert('Item: ' + _name + ' added to cart');

      }  

  const [refreshing, setRefreshing] = React.useState(true);

  const onRefresh = () => {
    //React.useCallback(()
    setRefreshing(true);
    getData((dataSource.length/size) + 1,state.myValue);
    // if (dataSource.length === 0) {
    //   getData(1,state.myValue);
    // } else {
    //   if (dataSource.length)
    //   getData(page+1,state.myValue);
    //   setPage(page+1);
    // }
   
    //  wait(3000).then(() => setRefreshing(false));

  } //, [refreshing]);

  useEffect(() => {

    setDataSource([]);
    // setPage(1);
    getData((dataSource.length/size) + 1,state.myValue);
    
  }, [state.myValue]);

  const getData = (p,site) => {
    //Service to get the data from the server to render
    console.log('Load page:', p, ', site=', site);
    const url = 'http://172.26.24.150:8082/TopSales?page=' + p + '&site=' + site + '&size=' + size;
    fetch(url,{
      mode: 'uat', 
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidHJhLm5ndXllbi10aGFuaEBtbXZpZXRuYW0uY29tIiwiaWF0IjoxNjMxMDI4MTk3fQ.VBVww3alKhg6YDBDxb1rZvsmAHoQs6y6XAcHoUm5E5Q',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        
          let mergedObj = [...dataSource,...responseJson];
          setDataSource(mergedObj);
        //console.log(mergedObj);
      })
      .catch((error) => {
        console.error(error);
      });

      setRefreshing(false);
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
           Top {item.V_ROW}:    {item.V_ARTNO} - {item.V_ALIBL}
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
              name= "add-shopping-cart" /*"keyboard-arrow-right" color = "#2592E5"*/ color = "#2592E5" size={26}  onPress={() => createTwoButtonAlert(item.V_ARTNO,item.V_ALIBL,item.V_PRICE_PERM,item.V_MMUN_UNIT)}/>
        </View>   

      </View>
    );
  };


  const createTwoButtonAlert = (id,name,price,unit) => {

    let msg = '-Id:' + id + '\n-Name: ' + name + '\n-Price:' + price + '/' + unit;
    Alert.alert(
      "Product details",
      msg,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Add to cart", onPress: () => {console.log("Add-to-cart Pressed") ; handleButton(id,name,price,unit,1,'UP');}}
      ]
    );
  }

  const getItem = (item) => {
    // Function for click on an item
    //alert('Id : ' + item.id + ' Name : ' + item.title);
    createTwoButtonAlert(item.V_ARTNO,item.V_ALIBL,item.V_PRICE_PERM,item.V_MMUN_UNIT);
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

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 5;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  return (
    <SafeAreaView style={{flex: 1}}>

      <View>
    
        {/* List Item as a function */}
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}/>}
            // ref={scrollViewRef}
            // onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                
                if (!refreshing) {
                  getData((dataSource.length/size) + 1,state.myValue);
                  wait(3000);
                }
              }
            }}
          >
            {dataSource.length>0?dataSource.map(ItemView):
              <View style={{height:height/2,width:width}} onPress={()=> getData((dataSource.length/size)+1,state.myValue)}>
                <Text style={{alignSelf:'center', fontSize:16, height:height/2,textAlignVertical:'center'}} onPress={()=> getData((dataSource.length/size)+1,state.myValue)}>
                  LOADING...
                </Text>
              </View>
            }
            {/* {dataSource.map(ItemView)} */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return { 
      myValue: state.site,
      // myHighlight: state.highlight 
  };
}
export default connect(mapStateToProps)(TopSales);
